const User = require('./user.model');
const { baseURL } = require('../../config');
const fs = require('fs');
const Setting = require('../setting/setting.model');
const Device = require('../device/device.model');

//Display list of all Users
exports.userList = async (req, res, next) => {
  try {
    const start = req.query.start ? parseInt(req.query.start) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 25;
    let matchQuery = {};

    if (req.query.search != 'ALL') {
      matchQuery = {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { username: { $regex: req.query.search, $options: 'i' } },
          { guest: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
          { coin: { $regex: req.query.search, $options: 'i' } },
        ],
      };
    }

    let startDate, endDate;
    let dateFilterQuery = {};
    if (req.query.sDate !== 'ALL' && req.query.eDate !== 'ALL') {
      startDate = new Date(req.query.sDate + 'T00:00:00.000Z');
      endDate = new Date(req.query.eDate + 'T00:00:00.000Z');

      dateFilterQuery = {
        date: { $gte: startDate, $lte: endDate },
      };
    }

    const user = await User.aggregate([
      {
        $addFields: {
          date: {
            $toDate: { $arrayElemAt: [{ $split: ['$analyticDate', ', '] }, 0] },
          },
        },
      },
      {
        $match: dateFilterQuery,
      },
      {
        $match: matchQuery,
      },
      {
        $facet: {
          user: [{ $skip: (start - 1) * limit }, { $limit: limit }],
          pageInfo: [{ $group: { _id: null, totalRecord: { $sum: 1 } } }],
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      message: 'success',

      user: user[0].user,
      total: user[0].pageInfo.length > 0 ? user[0].pageInfo[0].totalRecord : 0,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//user signup or login
exports.userSignup = async (req, res, next) => {
  try {
    if (!req.body)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Invalid details.' });
    if (!req.body.name)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Name is required.' });
    if (!req.body.image)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Image is required.' });
    if (!req.body.username)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Username is required.' });

    if (!req.body.identity)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Identity is required.' });
    if (!req.body.email)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! email is required.' });

    const device = await Device.find({ deviceId: req.body.identity });
    if (device.length === 0) {
      const device = new Device();
      device.deviceId = req.body.identity;
      device.save();
    }

    const user = await User.findOne({
      identity: req.body.identity,
    });

    console.log('user', user);

    if (user) {
      user.email = req.body.email;
      user.fcmToken = req.body.fcmToken;
      user.isLogout = false;
      await user.save();
      return res.status(200).json({ status: true, message: 'success', user });
    } else {
      const user = await createNewUser(
        req.body.name,
        req.body.image,
        req.body.username,
        req.body.identity,
        req.body.email,
        req.body.age,
        req.body.password,
        req.body.fcmToken
      );

      console.log('user Created', user);

      return res.status(200).json({ status: true, message: 'success', user });
    }
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//for form login check user is exist or not
exports.existUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.identity) {
      return res.status(500).json({ status: false, message: 'Invalid Detail' });
    }

    const user = await User.findOne({
      email: req.body.email,
      identity: req.body.identity,
      password: req.body.password,
    });

    if (user) {
      return res.status(200).json({ status: true, message: 'success', user });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//create user
const createNewUser = async (
  name,
  image,
  username,
  identity,
  email,
  age,
  password,
  fcmToken,
  req,
  res
) => {
  try {
    const user = new User();
    const setting = await Setting.find().sort({ createdAt: -1 });

    user.name = name;
    user.image = image;
    user.username = username;
    user.coin = setting[0].loginBonus;
    user.identity = identity;
    user.email = email;
    user.age = age;
    user.password = password;
    user.fcmToken = fcmToken;
    user.guest =
      name === 'Feel U User'
        ? 'Guest_' + user._id.toString().slice(16, 25)
        : name;

    user.analyticDate = new Date().toLocaleString();

    user.save();
    return user;
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//when user switch account from one device to another device change user identity
exports.changeIdentity = async (req, res, next) => {
  try {
    if (!req.body.user_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! User Id is required.' });

    if (!req.body.identity)
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! Identity is required.' });

    const user = await User.findById(req.body.user_id);
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! User not found.' });
    }

    user.identity = req.body.identity;
    user.save();

    return res.status(200).json({ status: true, message: 'success', user });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//user profile
exports.userProfileDetail = async (req, res, next) => {
  try {
    if (req.query.user_id) {
      await User.findOne({ _id: req.query.user_id }).exec((error, user) => {
        if (error)
          return res
            .status(200)
            .send({ status: false, error: 'Internal server error' });
        else {
          if (user === null)
            return res
              .status(200)
              .json({ status: false, message: 'success', user });
          else
            return res
              .status(200)
              .json({ status: true, message: 'success', user });
        }
      });
    } else
      return res
        .status(200)
        .send({ status: false, error: 'Authentication failed' });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//check username exist or not
exports.checkUsername = async (req, res, next) => {
  try {
    if (!req.body.username)
      return res
        .status(200)
        .send({ status: false, message: 'Oops ! user name is required.' });
    if (!req.body.user_id)
      return res
        .status(200)
        .json({ status: false, message: 'Oops! user id is required.' });

    await User.findOne({ username: req.body.username }).exec((err, user) => {
      if (err)
        return res
          .status(200)
          .send({ status: false, message: 'Internal server error' });
      else {
        if (user && user._id.toString() !== req.body.user_id)
          return res
            .status(200)
            .send({ status: false, message: 'Oops ! Username already exist' });
        else
          return res.status(200).send({
            status: true,
            message: 'Username generated successfully',
          });
      }
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//update user profile
exports.userUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id);

    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! user not found' });
    }

    // const setting = await Setting.find().sort({ createdAt: -1 });

    const userData = {};

    if (req.file) {
      if (fs.existsSync(user.image)) {
        fs.unlinkSync(user.image);
      }
      userData.image = baseURL + req.file.path;
    }

    if (req.body.name) {
      userData.name = req.body.name;
    }
    if (req.body.username) {
      userData.username = req.body.username;
    }

    if (req.body.age) {
      userData.age = req.body.age;
    }

    await User.updateOne({ _id: req.body.user_id }, { $set: userData }).exec(
      async (errorUpdate, userUpdate) => {
        if (errorUpdate)
          return res.status(200).json({ status: false, errorUpdate });
        const user = await User.findOne({ _id: req.body.user_id });
        return res.status(200).send({
          status: true,
          message: 'User details update successfully',
          user,
        });
      }
    );
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//update coin through admin
exports.userCoinUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: 'Oops ! user not found' });
    }

    user.coin = req.body.coin;

    await user.save();
    return res.status(200).send({
      status: true,
      message: 'User details update successfully',
      user,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//user logout
exports.userLogout = async (req, res) => {
  try {
    const user = await User.findById(req.query.user_id);

    if (!user) {
      return res.status(200).json({ status: false, message: 'user not found' });
    }

    user.isLogout = true;

    await user.save((error, user) => {
      if (error)
        return res
          .status(200)
          .json({ status: false, error: error.message || 'server error' });
      else return res.status(200).json({ status: true, message: 'success' });
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//user block-unblock
exports.userBlockUnblock = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(200).json({ status: false, message: 'user not found' });
    }

    user.isBlock = !user.isBlock;
    await user.save((error, user) => {
      if (error)
        return res
          .status(200)
          .json({ status: false, error: error.message || 'server error' });
      else
        return res.status(200).json({ status: true, message: 'success', user });
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || 'server error' });
  }
};

//check freeCall or Not
exports.isFreeCall = async (req, res, next) => {
  if (req.query.device_id) {
    const device = await Device.findOne({ deviceId: req.query.device_id });
    if (!device)
      return res
        .status(200)
        .send({ status: false, error: 'Internal server error' });

    const setting = await Setting.find().sort({ createdAt: -1 });

    if (device.callCount >= setting[0].howManyFreeCall) {
      return res.status(200).send({ status: false, message: 'success' });
    } else return res.status(200).send({ status: true, message: 'success' });
  } else
    return res
      .status(200)
      .send({ status: false, error: 'Authentication failed' });
};

//search user for admin panel
exports.searchUser = async (req, res, next) => {
  try {
    if (req.query.value) {
      const start = req.query.start ? parseInt(req.query.start) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 25;

      const user = await User.find({
        guest: { $regex: req.query.value, $options: 'i' },
      })

        .sort({ createdAt: -1 })
        .skip((start - 1) * limit)
        .limit(limit);

      if (!user) {
        return res
          .status(200)
          .send({ status: false, error: 'Internal server error' });
      }

      return res.status(200).json({ status: true, user, total: user.length });
    } else {
      return res
        .status(200)
        .json({ status: false, message: 'Invalid Detail!' });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

//delete user before september
exports.destroyUser = async (req, res, next) => {
  try {
    const user = await User.aggregate([
      {
        $addFields: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        },
      },
      {
        $match: {
          date: { $lt: '2021-09-01' },
        },
      },
    ]);

    await user.map(async (data) => {
      const user_ = await User.findById(data._id);
      await user_.deleteOne();
    });

    return res.send('success');
  } catch (error) {
    console.log(error);
  }
};

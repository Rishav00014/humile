const Report = require("./report.model");
const User = require("../user/user.model");
const Host = require("../host/host.model");

//reported user [to user]
exports.reportedUser = async (req, res) => {
  try {
    await Report.aggregate([
      {
        $sort: { date: -1 }
      },
      {
        $lookup: {
          from: "users",
          let: { userIds: "$user" },
          as: "user",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$userIds", "$_id"] }
              }
            },
            {
              $project: {
                name: 1,
                username: 1,
                image: 1,
                coin: 1
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$user"
        }
      },
      { $group: { _id: "$host", count: { $sum: 1 }, report: { $push: "$$ROOT" } } },
    ]).exec(async (error, data) => {
      if (error) return res.status(200).json({ status: false, message: error.message || "Server Error" });
      else {
        const data_ = await Report.populate(data, [
          {
            path: "_id",
            model: "Host",
            select: ["_id", "image", "name", "coin"],
          },
        ]);
        return res.status(200).json({ status: true, message: "Success", report: data_ });
      }
    });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

exports.store = async (req, res) => {
  try {
    debugger;
    if (!req.body.host || !req.body.user || !req.body.description)
      return res
        .status(200)
        .json({ status: false, message: "Invalid Details!!" });

    //from means live user id
    const host = await Host.findById(req.body.host);
    if (!host)
      return res
        .status(200)
        .json({ status: false, message: "Host does not Exist!!" });

    const user = await User.findById(req.body.user);
    if (!user)
      return res
        .status(200)
        .json({ status: false, message: "User Does not Exist!" });

    const report = new Report();

    report.host = host._id;
    report.user = user._id;
    report.description = req.body.description;

    await report.save();

    return res.status(200).json({ status: true, message: "Success!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

const Message = require("./message.model");


exports.index = async (req, res) => {
  try {

    const message = await Message.find().sort({ createdAt: -1 });
    if (!message) {
      return res.status(200).json({ status: false, message: "not found" })
    }

    return res.status(200).json({ status: true, message: "Success", message });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" })
  }
}

exports.store = async (req, res) => {
  try {

    if (!req.body.question || !req.body.question) {
      return res.status(200).json({ status: false, message: "Invalid Detail" })
    }

    const message = new Message();
    message.question = req.body.question.toLowerCase()
    message.answer = req.body.answer

    await message.save();

    return res.status(200).json({ status: true, message: "Success", message });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" })
  }
}

exports.update = async (req, res) => {
  try {

    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(200).json({ status: false, message: "Message not found" })
    }

    message.question = req.body.question.toLowerCase()
    message.answer = req.body.answer

    await message.save();

    return res.status(200).json({ status: true, message: "Success", message });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" })
  }
}

exports.destroy = async (req, res) => {
  try {

    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(200).json({ status: false, message: "Message not found" })
    }

    await message.deleteOne();

    return res.status(200).json({ status: true, message: "Success", result: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" })
  }
}
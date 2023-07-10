const Comment = require('../models/commentModel');
const User = require('../models/userModel');

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const comment = await Comment.findById(id);

    comment.isDeleted = true;
    comment.save();

    res.status(200).json({
      success: `comment is deleted successfully`,
    });
  } catch (error) {
    console.error('error in delete the comment', error);
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { user, blog, text } = req.body;
    const comment = await Comment.create({ user, blog, text });
    res
      .status(201)
      .json({ message: 'comment added success', success: true, user });
  } catch (error) {
    console.error(error, 'err adding new comment');
  }
};

const getComments =async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comment.find({blog:id, isDeleted: false}).populate("user").lean()
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "error in get blog comments " });
    console.error(error);
  }
};

module.exports = { deleteComment, addComment,getComments };

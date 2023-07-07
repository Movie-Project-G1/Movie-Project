const Comment = require("../models/commentModel");

const deleteComment = async (req, res) => {
  try {
    const { userId, idComment } = req.params;
    console.log(idComment);
    const comment = await Comment.findById(idComment);

    if (comment.user !== userId) {
      return res
        .status(500)
        .json({ error: "this is not your comment to delete" });
    }

    comment.isDeleted = true;
    comment.save();

    res.status(200).json({
      success: `comment is deleted successfully`,
    });
  } catch (error) {
    console.error("error in delete the comment", error);
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { text, blogId, userId } = req.body;
    const comment = await Comment.create({ userId, text, blogId });
    res
      .status(201)
      .json({ message: "comment added success", success: true, user });
  } catch (error) {
    console.error(error, "err adding new comment");
  }
};

module.exports = { deleteComment, addComment };

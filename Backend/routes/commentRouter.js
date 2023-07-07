const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/addComment", commentController.addComment);

router.put("/deleteComment", commentController.deleteComment);

module.exports = router;

const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/addComment", commentController.addComment);

router.put("/deleteComment/:id", commentController.deleteComment);
router.get("/getComments/:id",commentController.getComments)
module.exports = router;

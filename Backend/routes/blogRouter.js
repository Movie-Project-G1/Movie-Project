const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.get("/getAllBlogs", blogController.getAllBlogs);
router.put("/deleteBlog/:id", blogController.deleteBlog);
router.put("/updateblog/:id", blogController.updateBlog);
router.post("/addblog", blogController.addBlog);

module.exports = router;
// addBlog, updateBlog

const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.get("/getAllBlogs", blogController.getAllBlogs);
router.put("/deleteBlog", blogController.deleteBlog);
router.put("/updateblog", blogController.updateBlog);
router.post("/addblog", blogController.addBlog);

module.exports = router;
// addBlog, updateBlog

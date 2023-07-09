const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.get("/getAllBlogs", blogController.getAllBlogs);
router.put("/deleteBlog", blogController.deleteBlog);

router.put("/updateblog", blogController.updateBlog);
router.post("/addblog/:id", blogController.addBlog);

router.get("/getBlog/:id", blogController.getBlog);

module.exports = router;
// addBlog, updateBlog

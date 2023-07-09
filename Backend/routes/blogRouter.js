const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.get("/getAllBlogs", blogController.getAllBlogs);

router.get("/getAllBlogsRequests", blogController.getAllBlogsRequests);

router.put("/deleteBlog/:id", blogController.deleteBlog);

router.put("/blogRequest/:id", blogController.blogRequest);

router.put("/updateblog", blogController.updateBlog);

router.post("/addblog", blogController.addBlog);

router.get("/getBlog/:id", blogController.getBlog);

module.exports = router;
// addBlog, updateBlog

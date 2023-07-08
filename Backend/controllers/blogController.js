const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const getAllBlogs = async (req, res) => {
  try {
    const allBlog = await Blog.find({ isDeleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(allBlog);
  } catch (error) {
    console.error("err getting the all blog", error);
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author");
    console.log(blog);
    if (!blog) {
      return res.status(500).json({ error: "there is no blog with this id" });
    }

    res.status(201).json(blog);
  } catch (error) {
    console.error("err getting the all blog", error);
  }
};

const addBlog = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const blog = await Blog.create({ author, title, content });
    res
      .status(201)
      .json({ message: "blog added success", success: true, blog });
  } catch (error) {
    console.error(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { userId, idBlog } = req.body;
    const blog = await Blog.findById(idBlog).populate("author");
    // const user = blog.author
    // if (blog.author._id !== userId) {
    //   return res.status(500).json({ error: "this is not your blog to delete" });
    // }

    blog.isDeleted = true;
    blog.save();

    res.status(200).json({
      success: `blog is deleted successfully`,
    });
  } catch (error) {
    console.error("error in delete the blog", error);
    res.status(500).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { userId, blogId, title, content } = req.body;

    const userBlog = await Blog.findById(blogId);
    if (!userBlog) {
      return res.status(500).json({ error: `Blog not found` });
    }
    // console.log(userId);
    // console.log(userBlog.author);

    // if (`new ObjectId("${userId}")` !== userBlog.author) {
    //   return res
    //     .status(500)
    //     .json({ error: `You are not the owner of the blog` });
    // }

    userBlog.content = content || userBlog.content;
    userBlog.title = title || userBlog.title;

    const blogSave = userBlog.save();
    res.status(200).json({
      success: `Updated Successfully`,
      userBlog,
    });
  } catch (error) {
    console.error("error Updating the Blog ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllBlogs, deleteBlog, addBlog, updateBlog, getBlog };

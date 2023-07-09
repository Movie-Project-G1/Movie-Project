const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const getAllBlogs = async (req, res) => {
  try {
    const allBlog = await Blog.find({ isDeleted: false , isApproved : true }).sort({
      createdAt: -1,
    });

    res.status(200).json(allBlog);
  } catch (error) {
    console.error("err getting the all blog", error);
  }
};
const getAllBlogsRequests = async (req, res) => {
  try {
    const allBlog = await Blog.find({ isDeleted: false , isApproved : false }).sort({
      createdAt: -1,
    }).populate("author").lean()

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
    const { title, content } = req.body;
    const {id} = req.params
    console.log(content);
    console.log(title);
    console.log(req.body);
    const blog = await Blog.create({ author:id, title, content });
    res
      .status(201)
      .json({ message: "blog added success", success: true, blog });
  } catch (error) {
    console.error(error);
  }
};

const deleteBlog = async (req, res) => {
  // console.log('delete cont')
  try {
    const blogID = req.params.id;
    console.log(blogID);
    const update = await Blog.findOneAndUpdate(
      { _id: blogID },
      {
        isDeleted: true,
      }
    );

    if (update) {
      const allUsers = await Blog.find({ isDeleted: false , isApproved : false  });
      res.status(201).json(allUsers);
      console.log(allUsers);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update quote" });
    console.log(error.message);
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


const blogRequest =  async (req, res) => {

  try {
    const blogID = req.params.id;
    console.log(blogID);
    const update = await Blog.findOneAndUpdate(
      { _id: blogID },
      {
        isApproved : true,
      }
    );

    if (update) {
      const allUsers = await Blog.find({ isDeleted: false , isApproved : false  });
      res.status(201).json(allUsers);
      console.log(allUsers);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update quote" });
    console.log(error.message);
  }
};

module.exports = { getAllBlogs, getAllBlogsRequests , deleteBlog, addBlog, updateBlog, getBlog  , blogRequest};

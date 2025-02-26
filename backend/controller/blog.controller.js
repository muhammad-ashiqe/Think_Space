import cloudinary from "../config/cloudinary.js";
import { BlogModel } from "../models/blog.model.js";

//create a blog
const createBlog = async (req, res) => {
  try {
    const { title, mainContent, compactContent, author } = req.body;

    //add image to cloudinary if provided
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    //creating a new blog model
    const newBlog = new BlogModel({
      title,
      mainContent,
      compactContent,
      author,
      image: imageUrl,
    });

    await newBlog.save();

    res.json({ success: true, message: "blog created successfully", newBlog });
  } catch (error) {
    res.json({ success: false, message: "server error when creating blog" });
  }
};

//delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      res.json({ success: false, message: "blog not found" });
    }

    //remove image from the cloudinary as well
    if (blog.image) {
      const publicId = blog.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await BlogModel.findByIdAndDelete(id);

    res.json({ success: true, message: "blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
};

//get all the blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("author", "name email");
    res.json({ success: true, message: "fetching all blog success", blogs });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
};

//get a single blog
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);

    if (!blog) {
      res.json({ success: false, message: "blog not found" });
    }

    res.json({ success: true, message: "blog fetched successfully", blog });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
};

//edit an existing blog
const editBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, mainContent, compactContent } = req.body;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      res.json({ success: false, message: "blog not found" });
    }

    const imageUrl = blog.image;

    //checking weather an image uploading or not
    if (req.file) {
      //checking image already exist
      if (blog.image) {
        const publicId = blog.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      //upload new image
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    //updating blog
    blog = await BlogModel.findByIdAndUpdate(
      id,
      { title, compactContent, mainContent, image: imageUrl },
      { new: true }
    );

    res.json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    res.json({ success: false, message: "server error" });
  }
};

export { createBlog, deleteBlog, getAllBlogs, getSingleBlog, editBlog };

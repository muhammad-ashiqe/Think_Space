import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controller/blog.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const blogRouter = express.Router();

// Routes
blogRouter.post("/create", authMiddleware, createBlog);
blogRouter.delete("/delete/:id", authMiddleware, deleteBlog);
blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blog/:id", getSingleBlog);
blogRouter.put("/edit/:id", authMiddleware, editBlog);

export default blogRouter;

import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadyUser = await UserModel.findOne({ email });

    // Checking if user exists
    if (isAlreadyUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    // Creating JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ 
      success: true, 
      token, 
      user: { id: newUser._id, email, name } 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" }); // ✅ Better error handling
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Checking password
    if (!user?.password) { 
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Creating JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ 
      success: true, 
      token, 
      user: { id: user._id, email, name: user.name } 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" }); 
  }
};

export { registerUser, loginUser };

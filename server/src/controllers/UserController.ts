import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

// Get all users (admin only)
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Only allow admin or own user to access
    if (req.user?.role !== "admin" && req.user?.id !== id) {
      res.status(403).json({ message: "Not authorized to access this user" });
      return;
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }],
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists with that email" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || "user",
      isActive: true,
    });

    await user.save();

    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json(userObject);
  } catch (error) {
    next(error);
  }
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, role, isActive, password } = req.body;

    // Only allow admin or own user to update
    if (req.user?.role !== "admin" && req.user?.id !== id) {
      res.status(403).json({ message: "Not authorized to update this user" });
      return;
    }

    // Only admin can change role or active status
    if (
      (role !== undefined || isActive !== undefined) &&
      req.user?.role !== "admin"
    ) {
      res
        .status(403)
        .json({ message: "Not authorized to change role or active status" });
      return;
    }

    // Find user
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update fields
    if (email) user.email = email;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (role !== undefined && req.user?.role === "admin") user.role = role;
    if (isActive !== undefined && req.user?.role === "admin")
      user.isActive = isActive;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    res.json(userObject);
  } catch (error) {
    next(error);
  }
};

// Delete a user (admin only)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete user
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

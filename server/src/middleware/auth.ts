import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

// Authentication middleware - modified to fix TypeScript return type issues
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
      return;
    }

    // Verify token
    const token = authHeader.split(" ")[1];
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    } catch (jwtError) {
      if (jwtError instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid token" });
      } else if (jwtError instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
      } else {
        res.status(401).json({ message: "Token verification failed" });
      }
      return;
    }

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    // Find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401).json({ message: "Invalid token, user not found" });
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({ message: "Account is inactive" });
      return;
    }

    // Attach user to request
    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
};

// Authorization middleware - also fixed to match correct return type
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Not authorized to perform this action" });
      return;
    }

    next();
  };
};

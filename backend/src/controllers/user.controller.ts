import { Response } from 'express';
import User, { UserRole } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Get all users (admin only)
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, role } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Only admin can change roles, or the user themselves can update their own info
    if (req.user?.role !== UserRole.ADMIN && req.user?._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    
    // Only admin can update role
    if (role && req.user?.role === UserRole.ADMIN) {
      user.role = role;
    }
    
    await user.save();
    
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Deactivate user (admin only)
export const deactivateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isActive = false;
    await user.save();
    
    res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reactivate user (admin only)
export const reactivateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isActive = true;
    user.failedLoginAttempts = 0;
    await user.save();
    
    res.status(200).json({ message: 'User reactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
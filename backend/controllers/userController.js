import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// In-memory fallback users database for offline/standalone operation
const inMemoryUsers = [];

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'etherstyle_jwt_secret_key_2026_super_secure');
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please enter both email and password." });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Try MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            const user = await userModel.findOne({ email: normalizedEmail });
            if (!user) {
                return res.json({ success: false, message: "No account found with this email. Please sign up first." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json({ success: false, message: "Incorrect password. Please try again." });
            }

            const token = createToken(user._id);
            return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
        }

        // Check in-memory fallback
        const memoryUser = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
        if (memoryUser) {
            const isMatch = await bcrypt.compare(password, memoryUser.password);
            if (!isMatch) {
                return res.json({ success: false, message: "Incorrect password. Please try again." });
            }
            const token = createToken(memoryUser._id);
            return res.json({ success: true, token, user: { id: memoryUser._id, name: memoryUser.name, email: memoryUser.email } });
        }

        return res.json({ success: false, message: "No account found with this email. Please sign up first." });

    } catch (error) {
        console.log("Login Exception:", error.message);
        return res.json({ success: false, message: "Login failed: " + error.message });
    }
}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill in all required fields." });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address." });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long." });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Try MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            const exists = await userModel.findOne({ email: normalizedEmail });
            if (exists) {
                return res.json({ success: false, message: "An account with this email already exists. Please sign in instead." });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({ name: name.trim(), email: normalizedEmail, password: hashedPassword });
            const user = await newUser.save();
            const token = createToken(user._id);

            return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
        }

        // Fallback in-memory storage
        const existsInMemory = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
        if (existsInMemory) {
            return res.json({ success: false, message: "An account with this email already exists. Please sign in instead." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const memUser = { _id: "mem_" + Date.now(), name: name.trim(), email: normalizedEmail, password: hashedPassword };
        inMemoryUsers.push(memUser);
        const token = createToken(memUser._id);

        return res.json({ success: true, token, user: { id: memUser._id, name: memUser.name, email: memUser.email }, message: "Registered successfully" });

    } catch (error) {
        console.log("Register Exception:", error.message);
        return res.json({ success: false, message: "Registration failed: " + error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL || "admin@etherstyle.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
        const secret = process.env.JWT_SECRET || 'etherstyle_jwt_secret_key_2026_super_secure';

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email + password, secret);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Function to list all registered members for Admin Panel
const listUsers = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const users = await userModel.find({}).select("-password");
            return res.json({ success: true, users });
        }
        res.json({ success: true, users: inMemoryUsers.map(u => ({ _id: u._id, name: u.name, email: u.email })) });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, listUsers };

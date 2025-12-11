const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, resp) => {
  try {
    const { fullName, email, passwordHash } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return resp.status(409).json({ message: "User Already Exists" });

    // Hash the provided password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // Create user
    const savedUser = await User.create({
      fullName,
      email,
      passwordHash: hashedPassword,
    });

    // Remove password before sending response
    const { passwordHash: _, ...userData } = savedUser.toObject();

    resp
      .status(201)
      .json({
        message: "User Created Successfully",
        data: userData,
      });

  } catch (e) {
    resp.status(500).json({ message: "Signup Error", error: e.message });
  }
};

const login = async (req, resp) => {
  try {
    const { email, passwordHash } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return resp.status(404).json({ message: "User Not Found" });

    // Compare input password with stored hash
    const isPasswordValid = await bcrypt.compare(
      passwordHash,
      existingUser.passwordHash
    );

    if (!isPasswordValid)
      return resp.status(401).json({ message: "Invalid Password" });

    // Generate JWT
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "10h" }
    );

    resp.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (e) {
    resp.status(500).json({ message: "Login Error", error: e.message });
  }
};

module.exports = { signup, login };

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  let success = false;
  try {
    const { name, email, password,role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success, error: "User with credentials already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const data = {
      user: {
        id: user._id,
        name:user.name,
        role:user.role,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
export const loginUser = async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success, errors: "Please enter correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({
          success,
          error: "Please try to login with correct credentials",
        });
    }

    const data = {
      user: {
        id: user._id,
        name:user.name,
        role:user.role,
      },
    };
    success = true;
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
 

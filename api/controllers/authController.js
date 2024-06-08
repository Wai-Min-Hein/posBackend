import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const signUp = async (req, res, next) => {
  try {
    const { userName, password, email, role, permissions } = req.body;
    if (!userName || !password || !email || !role)
      return next(errorHandler(400, "Please enter entries from"));

    const isUserExist = await User.findOne({ email });

    if (isUserExist) return next(errorHandler(401, "User already exists"));

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      userName,
      password: hashedPassword,
      email,
      role,
      permissions
    });

    await newUser.save();

    const { password: restPassword, ...rest } = newUser._doc;

    // const token = jwt.sign(rest, process.env.Secret_Token)

    return res
      .status(200)
      .json({ message: "User registered successfully", datas: rest });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    if (!password || !email)
      return next(errorHandler(400, "Please enter entries from"));

    const user = await User.findOne({ email });

    const {password: restPassword,__v: restv, iat: restiat, exp: restexp, ...rest} = user._doc;

    

    if (!user) return next(errorHandler(401, "User does not exist"));

    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword) return next(errorHandler(401, "Password is incorrect"));

    const token = jwt.sign(rest, process.env.Secret_Token, { expiresIn: '1d' })



  return res.status(200).cookie('token', token, {httpOnly: true}).json({ message: "User sign in successfully", user: rest, token });

  


  } catch (error) {
    next(error);
  }
};

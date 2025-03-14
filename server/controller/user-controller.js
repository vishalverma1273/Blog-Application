// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../model/user.js";
// import Token from "../model/token.js";
// import dotenv from "dotenv";

// dotenv.config();

// export const signupUser = async (request, response) => {
//   try {
//     const hashedPassword = await bcrypt.hash(request.body.password, 10);
//     const user = {
//       username: request.body.username,
//       name: request.body.name,
//       password: hashedPassword
//     };
//     const newUser = new User(user);
//     await newUser.save();
//     return response
//       .status(200)
//       .json({ success: true, msg: "Signup Successfully" });
//   } catch (error) {
//     console.log(error);
//     return response
//       .status(500)
//       .json({ success: false, msg: "Error while signup the user" });
//   }
// };

// export const loginUser = async (request, response) => {
//   let user = await User.findOne({ username: request.body.username });
//   if (!user) {
//     return response.status(400).json({ msg: "username is not found" });
//   }

//   try {
//     let match = await bcrypt.compare(request.body.password, user.password);
//     if (match) {
//       const accessToken = jwt.sign(user.JSON(), process.env.ACCESS_SECRET_KEY, {
//         expiresIn: "15m"
//       });
//       const refreshToken = jwt.sign(
//         user.JSON(),
//         process.env.REFRESH_SECRET_KEY
//       );

//       const newtoken = new Token({ token: refreshToken });
//       await newtoken.save();
//       return response.status(200).json({
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//         name: user.name,
//         username: user.username
//       });
//     } else {
//       return response.status(400).json({ msg: "Password does not match" });
//     }
//   } catch (error) {
//     return response.status(500).json({ msg: "Error while login in user" });
//   }
// };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Token from "../model/token.js";
import User from "../model/user.js";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword
    };

    const newUser = new User(user);
    await newUser.save();

    return response
      .status(200)
      .json({ success: true, msg: "Signup successfull" });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, msg: "Error while signing up user" });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response
      .status(400)
      .json({ isSuccess: false, msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.status(200).json({
        isSuccess: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username
      });
    } else {
      response
        .status(400)
        .json({ isSuccess: false, msg: "Password does not match" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ isSuccess: false, msg: "error while login the user" });
  }
};

export const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};

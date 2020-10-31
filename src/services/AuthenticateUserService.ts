import { getRepository } from "typeorm";
import User from "../models/user";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("User not Found!",401);
    }

    const passwordMatched = await compare(password, user.password);
    const { secret, expiresIn } = authConfig.jwt;

    if (!passwordMatched) {
      throw new AppError("incorrect email/password!",401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

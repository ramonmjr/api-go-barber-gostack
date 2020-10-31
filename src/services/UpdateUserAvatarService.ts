import { getRepository } from "typeorm";
import User from "../models/user";
import path from "path";
import fs from "fs";
import uploadConfig from "../config/upload";
import UsersRepository from "../Repositories/UsersRepository";

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new AppError("Only Authenticated user can change avatar.",401);
    }
    if (user.avatar) {
      /* Deletar Avatar anterior */

      const avatarUserPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat;

      if (userAvatarFileExists) {
        await fs.promises.unlink(avatarUserPath);
      }
    }
    user.avatar = avatarFilename;
    delete user.password;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatarService;

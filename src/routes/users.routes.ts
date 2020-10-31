import { response, Router } from "express";
import { getCustomRepository } from "typeorm";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);
/**
 * Repositories
 * Services
 */

// GET - LIST http://localhost:3333/appointments
usersRouter.get("/", async (request, response) => {
  try {
    response.send({ message: "Users" });
  } catch (err) {}
});

// POST - CREATE http://localhost:3333/appointments
usersRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    console.log(request.file);
      const updateUserAvatarService = new UpdateUserAvatarService();
      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      return response.json(user);

  }
);

export default usersRouter;

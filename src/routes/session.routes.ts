import { Router } from "express";
import { getCustomRepository } from "typeorm";

import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionRouter = Router();

/**
 * Repositories
 * Services
 */

// POST - CREATE http://localhost:3333/appointments
sessionRouter.post("/", async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionRouter;

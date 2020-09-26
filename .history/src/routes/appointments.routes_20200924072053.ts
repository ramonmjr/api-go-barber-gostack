import { request, response, Router } from "express";

const appointmentRoutes = Router();

appointmentRoutes.post("/", (request, response) => {
  const { name, email } = request.body;
  const user = {
    name,
    email,
  };
  return response.json(user);
});

export default appointmentRoutes;

import { request, response, Router } from "express";

const appointmentRoutes = Router();

// http://localhost:3333/appointments

appointmentRoutes.post("/", (request, response) => {
  const { name, email } = request.body;
  const user = {
    name,
    email,
  };
  return response.json(user);
});

export default appointmentRoutes;

import { request, response, Router } from "express";

const appointmentRoutes = Router();

// http://localhost:3333/appointments
appointmentRoutes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

export default appointmentRoutes;

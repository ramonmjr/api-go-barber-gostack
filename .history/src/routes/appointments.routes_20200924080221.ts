import { request, response, Router } from "express";

const appointmentsRouter = Router();

// http://localhost:3333/appointments
appointmentsRouter.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

export default appointmentsRouter;

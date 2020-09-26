import { request, response, Router } from "express";

const appointmentsRouter = Router();

// http://localhost:3333/appointments
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    provider,
    date,
  };

  return response.json({ message: "Hello World" });
});

export default appointmentsRouter;

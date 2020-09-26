import { request, response, Router } from "express";
import { uuid } from "uuidv4";

const appointmentsRouter = Router();

// http://localhost:3333/appointments
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  return response.json({ message: "Hello World" });
});

export default appointmentsRouter;

import { Router } from "express";
import { uuid } from "uuidv4";

const appointmentsRouter = Router();

// const appointments = <any>[];
const appointments = Array<any>();

interface teste {
  appointments?: Array<any>;
}

// GET - LIST http://localhost:3333/appointments
appointmentsRouter.get("/", (request, response) => {
  appointments.push("hush");
  return response.json(appointments);
});

// POST - CREATE http://localhost:3333/appointments
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  console.log(request.body);
  const appointment = {
    id: uuid(),
    provider,
    date,
  };
  appointments.push(appointment);

  return response.json(appointment);
  return response.json({ message: "Hello World" });
});

export default appointmentsRouter;

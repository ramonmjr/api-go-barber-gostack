import { Router } from "express";
import { uuid } from "uuidv4";
import { startOfHour, parseISO, isEqual } from "date-fns";

const appointmentsRouter = Router();

// const appointments = <any>[];
// const appointments = Array<any>();
const appointments: Appointment[] = [];

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

// GET - LIST http://localhost:3333/appointments
appointmentsRouter.get("/", (request, response) => {
  return response.json(appointments);
});

// POST - CREATE http://localhost:3333/appointments
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find((appointment) =>
    isEqual(parsedDate, appointment.date)
  );
  if (findAppointmentInSameDate)
    return response
      .status(400)
      .json({ message: "Já existe agendamento para esta data!" });

  const appointment = {
    id: uuid(),
    provider,
    parsedDate,
  };
  appointments.push(appointment);

  return response.json(appointment);
  return response.json({ message: "Hello World" });
});

export default appointmentsRouter;

import { Router } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointment from "../models/appointment";
import appointmentsRepository from "../Repositories/AppointmentsRepository";

const appointmentsRouter = Router();
const appointmentRepository = new appointmentsRepository();

// GET - LIST http://localhost:3333/appointments
appointmentsRouter.get("/", (request, response) => {
  return response.json(appointments);
});

// POST - CREATE http://localhost:3333/appointments
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate
  );
  if (findAppointmentInSameDate)
    return response
      .status(400)
      .json({ message: "Já existe agendamento para esta data!" });

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

import { Router } from "express";
import { parseISO } from "date-fns";
import Appointment from "../models/appointment";
import AppointmentsRepository from "../Repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// GET - LIST http://localhost:3333/appointments
appointmentsRouter.get("/", (request, response) => {
  return response.json(appointmentsRepository.all());
});

// POST - CREATE http://localhost:3333/appointments
appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

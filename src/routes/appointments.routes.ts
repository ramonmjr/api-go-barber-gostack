import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../Repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// GET - LIST http://localhost:3333/appointments
appointmentsRouter.get("/", async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// POST - CREATE http://localhost:3333/appointments
appointmentsRouter.post("/", async (request, response) => {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;

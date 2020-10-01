import Appointment from "../models/appointment";
import AppointmentsRepository from "../Repositories/AppointmentsRepository";
import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

/**
 * SERVICE É RESPONSÁVEL PELA REGRA, AQUI ACONTECE:
 * [x] Recebimento de informções
 * [x] Acesso ao Repository
 * [x] Tratamento de Erros/Exceções
 */
interface Request {
  provider: string;
  date: Date;
}

/**
 * Princípio Dependency Inversion
 */
class CreateAppoinmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate)
      throw Error("This appointment is already booked!");

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppoinmentService;

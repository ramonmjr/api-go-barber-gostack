import Appointment from "../models/appointment";
import AppointmentsRepository from "../Repositories/AppointmentsRepository";
import AppError from '../errors/AppError';
import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

/**
 * SERVICE É RESPONSÁVEL PELA REGRA, AQUI ACONTECE:
 * [x] Recebimento de informções
 * [x] Acesso ao Repository
 * [x] Tratamento de Erros/Exceções
 */
interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Princípio Dependency Inversion
 */
class CreateAppoinmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate)
      throw new AppError("This appointment is already booked!");

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppoinmentService;

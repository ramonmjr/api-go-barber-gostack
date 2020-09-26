import Appointment from "../models/appointment";
import AppointmentsRepository from "../Repositories/AppointmentsRepository";
import { startOfHour } from "date-fns";

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
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }
  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate)
      throw Error("This appointment is already booked!");

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppoinmentService;

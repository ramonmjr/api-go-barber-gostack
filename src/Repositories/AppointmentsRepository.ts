import Appointment from "../models/appointment";
import { isEqual } from "date-fns";

interface createAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  public create({ provider, date }: createAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}
export default AppointmentsRepository;

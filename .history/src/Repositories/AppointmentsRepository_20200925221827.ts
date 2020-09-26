import Appointment from "../models/appointment";
import {isEqual} from 'date-fns';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInsameDate = this.appointments.find((appointment) =>
    isEqual(date, appointment.date)
    
    return findAppointmentInsameDate;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    return appointment;
  }
}

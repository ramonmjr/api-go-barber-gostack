import Appointment from "../models/appointment";

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    return this.appointments.find((appointment) =>
    isEqual(date, appointment.date)
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    return appointment;
  }
}

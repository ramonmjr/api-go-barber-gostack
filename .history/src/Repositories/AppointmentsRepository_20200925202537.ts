import Appointment from "../models/appointment";

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date) {
    const appointment = new Appointment(provider, date);
  }
}

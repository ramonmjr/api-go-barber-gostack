import { isThisQuarter } from "date-fns";

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor(provider: string, date: Date) {
    this.provider = provider;
    this.date = date;
  }
}

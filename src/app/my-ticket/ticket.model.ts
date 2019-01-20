export class Ticket {
  constructor(
    public ticketid: number,
    public attend: boolean,
    public date: string,
    public eventtime: string,
    public eventname: string,
    public booked: boolean,
    public review: number,
    public comment: string,
    public rated: boolean) {}
}

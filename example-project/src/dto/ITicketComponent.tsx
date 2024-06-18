import { ITicketEntity } from "../store/TicketStore";
import { IUserEntity } from "../store/UserStore";

export interface ITicketComponent {
  selectTicket?: ITicketEntity;
  userData?: IUserEntity;
}

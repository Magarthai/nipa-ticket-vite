import { create } from "zustand";
import { ITicketEntity } from "./TicketStore";

interface ISelectedTicketStore {
  selectTicket?: ITicketEntity;

  setSelectValue: (ticket: ITicketEntity | undefined) => void;
}

export const useSelectedTicketStore = create<ISelectedTicketStore>((set) => ({
  selectTicket: undefined,
  setSelectValue(ticket) {
    if (ticket === undefined) {
      set({ selectTicket: undefined });
    } else {
      set({ selectTicket: ticket as ITicketEntity });
    }
  },
}));

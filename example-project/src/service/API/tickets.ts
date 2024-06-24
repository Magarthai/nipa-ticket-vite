import axios from "axios";
import { useTicketStore } from "../../store/TicketStore";

export async function getAllTicket() {
  const fetchData = await axios.get("http://localhost:5000/tickets");

  return fetchData.data;
}

export async function createTicket(data: Record<string, any>) {
  const createData = await axios.post("http://localhost:5000/tickets", data);
  return createData.data;
}

export async function UpdateTicket(info: any) {
  console.log(info);
  const response = await axios.put(
    `http://localhost:5000/tickets/${info.ticketid}`,
    info,

    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function CloseTicket(info: any) {
  console.log(info);
  const response = await axios.put(
    `http://localhost:5000/tickets/close/${info.ticketid}`,
    info,

    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function sendEmailNotification(data: Record<string, any>) {
  const createData = await axios.post(
    "http://localhost:5000/tickets/sendemail",
    data
  );
  return createData.data;
}

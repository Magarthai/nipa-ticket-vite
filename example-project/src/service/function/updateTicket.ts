import { useMutation } from "@tanstack/react-query";
import { IUserEntity } from "../../store/UserStore";
import { UpdateTicket } from "../API/tickets";
import { ITicketEntity } from "../../store/TicketStore";
import Swal from "sweetalert2";
import { queryClient } from "../queryClient";

export async function acceptTicket(
  ticket: ITicketEntity,
  userData: IUserEntity
) {
  const updateAccept = useMutation({
    mutationKey: ["accept ticket"],
    mutationFn: UpdateTicket,
  });

  console.log(ticket);
  console.log(userData);
  const info = {
    name: ticket.name,
    email: ticket.email,
    topic: ticket.selectTopic,
    time: new Date(ticket.created_at).toLocaleString(),
    recipient: userData.fname + " " + userData.lname,
    status: "ได้รับเรื่องแล้ว",
    recipientId: userData.id,
    ticketid: ticket.id,
    solve:
      "ตอนนี้ทางเราได้รับเรื่องแล้วถ้าหากปัญหาถูกแก้ไข้ หรือ ไม่สามารถแก้ไข้ได้จะตอบกลับไป ครับ/ค่ะ",
    updateStatus: "accepted",
  };

  Swal.fire({
    title: "รับเรื่องแล้ว",
    icon: "success",
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#263A50",
    customClass: {
      confirmButton: "custom-confirm-button",
    },
  });
  await updateAccept.mutateAsync(info);
  queryClient.invalidateQueries({
    queryKey: ["tickets"],
  });
}

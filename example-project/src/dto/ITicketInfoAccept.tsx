import { FC, useState } from "react";
import { ITicketComponent } from "./ITicketComponent";

import { CloseTicket, sendEmailNotification } from "../service/API/tickets";
import Swal from "sweetalert2";
import { useSelectedTicketStore } from "../store/SelectedTicketStore";
import { ITicketEntity } from "../store/TicketStore";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../service/queryClient";
import { swalFire } from "../service/function/Swalfire";
import { TicketStatus } from "../enum/TicketStatus";

const ITicketInfoAccept: FC<ITicketComponent> = ({
  selectTicket,
  userData,
}) => {
  const navigate = useNavigate();
  const { setSelectValue } = useSelectedTicketStore();
  const [solve, setSolve] = useState("");
  const closeTicet = async (ticket: ITicketEntity, status: string) => {
    console.log("check");
    let statuText = "";
    if (status === "success") {
      statuText = "แก้ไข้ปัญหาแล้ว";
    } else {
      statuText = "ไม่สามารถแก้ไข้ปัญหาได้";
    }
    const info = {
      name: ticket.name,
      email: ticket.email,
      topic: ticket.selectTopic,
      time: new Date(ticket.created_at).toLocaleString(),
      status_text: statuText,
      recipient: userData?.id,
      updateStatus: status,
      recipient_name: userData?.fname + " " + userData?.lname,
      ticketid: ticket.id,
      solve: solve,
      status: statuText,
    };
    await CloseTicket(info);
    queryClient.invalidateQueries({
      queryKey: ["tickets"],
    });

    swalFire({
      title: "สําเร็จ!",
      icon: "success",
      text: "คุณได้ปิด Ticket นี้แล้ว",
    });

    setSelectValue(undefined);

    sendEmailNotification(info);
    navigate("/ticket");
  };
  return (
    <>
      {selectTicket?.status == TicketStatus.ACCEPTED && (
        <>
          <div className="textarea-wrapper w-[100%] flex justify-center items-center flex-col">
            <div className="text-area-header text-[20px] w-[80%] m-[10px] justify-start">
              <span>กรอกรายละเอียดการแก้ปัญหา</span>
            </div>
            <textarea
              className="w-[80%] m-[10px] shadow-md h-[170px] p-[10px] rounded-md"
              name="solve"
              id="solve"
              placeholder="กรอกรายละเอียดตรงนี้"
              value={solve}
              onChange={(e) => setSolve(e.target.value)}
            ></textarea>
          </div>

          <div className="w-[100%] flex overflow-x-auto break-words justify-center items-center">
            <button
              onClick={() => {
                closeTicet(selectTicket, "success");
              }}
              className="shadow-md bg-[#44d427] w-[38%] h-[50px]  m-[20px] pr-[20px] pl-[20px] p-[5px] text-white rounded-md"
            >
              เสร็จสิ้น
            </button>
            <button
              onClick={() => {
                closeTicet(selectTicket, "reject");
              }}
              className="shadow-md bg-[#df2e22] w-[38%] h-[50px] m-[20px] pr-[20px] pl-[20px] p-[5px] text-white rounded-md"
            >
              ไม่รับเรื่อง
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ITicketInfoAccept;

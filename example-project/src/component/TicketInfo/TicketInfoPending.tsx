import { FC } from "react";
import { ITicketEntity } from "../../store/TicketStore";
import { UpdateTicket } from "../../service/API/tickets";
import { useSelectedTicketStore } from "../../store/SelectedTicketStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ITicketComponent } from "../../dto/ITicketComponent";

const TicketInfoPending: FC<ITicketComponent> = ({
  selectTicket,
  userData,
}) => {
  const navigate = useNavigate();

  const { setSelectValue } = useSelectedTicketStore();

  const acceptTicket = async (ticket: ITicketEntity) => {
    const info = {
      name: ticket.name,
      email: ticket.email,
      topic: ticket.selectTopic,
      time: new Date(ticket.created_at).toLocaleString(),
      recipient: userData?.fname + " " + userData?.lname,
      status: "ได้รับเรื่องแล้ว",
      recipientId: userData?.id,
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
    await UpdateTicket(info);
    setSelectValue(undefined);
    navigate("/ticket");
  };

  return (
    <>
      {selectTicket?.status == "pending" && (
        <div className="w-[100%] flex justify-center items-center">
          <button
            onClick={() => acceptTicket(selectTicket)}
            className="bg-[#133D94] w-[80%] font-semibold mt-[10px] text-[20px] h-[50px] text-white rounded-md shadow-md"
          >
            รับเรื่อง
          </button>
        </div>
      )}
    </>
  );
};

export default TicketInfoPending;

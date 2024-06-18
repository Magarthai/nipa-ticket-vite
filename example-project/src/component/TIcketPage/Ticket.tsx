import { FC } from "react";
import { ITicketEntity } from "../../store/TicketStore";
import Image from "../../assets/img/nullimage.png";
import { TicketStatus } from "../../enum/TicketStatus";
interface ITicket {
  selectTicket?: ITicketEntity;
}

const headerStyle = (ticket?: ITicketEntity) => {
  if (ticket?.status == TicketStatus.PENDING) {
    return "ticket-info-status flex justify-center item-center rounded-md text-[20px] absolute w-[120px] bg-[#808080] p-[5px]";
  } else if (ticket?.status == TicketStatus.SUCCESS) {
    return "ticket-info-status flex justify-center item-center rounded-md  text-[20px] absolute w-[120px] bg-[#44d427] p-[5px]";
  } else if (ticket?.status == TicketStatus.REJECT) {
    return "ticket-info-status flex justify-center item-center rounded-md  text-[20px] absolute w-[120px] bg-[#f13838] p-[5px]";
  } else if (ticket?.status == TicketStatus.ACCEPTED) {
    return "ticket-info-status flex justify-center item-center rounded-md  text-[20px] absolute w-[120px] bg-[#f1c638] p-[5px]";
  }
};

const statusName = (ticket?: ITicketEntity) => {
  if (ticket?.status == TicketStatus.PENDING) {
    return "รอรับเรื่อง";
  } else if (ticket?.status == TicketStatus.SUCCESS) {
    return "เสร็จสิ้น";
  } else if (ticket?.status == TicketStatus.REJECT) {
    return "ไม่รับเรื่อง";
  } else if (ticket?.status == TicketStatus.ACCEPTED) {
    return "รับเรื่องแล้ว";
  }
};

const Ticket: FC<ITicket> = ({ selectTicket }) => {
  return (
    <>
      <div className="ticket-info-header text-white h-[100px] bg-[#133D94] rounded-xl flex justify-center items-center text-[30px]">
        <div className="tikcet-info-selectTopic w-[100%] flex justify-center">
          {selectTicket?.selectTopic}
        </div>

        <div className={headerStyle(selectTicket)}>
          {statusName(selectTicket)}
        </div>
      </div>
      <div className="ticket-image w-[100%] justify-center flex items-center mt-[40px]">
        <div className="image-wrapper w-[80%] flex item-center justify-center">
          <img
            className="rounded-[20px] overflow-x-auto break-words shadow-[4px 4px #000]"
            src={selectTicket?.img ? selectTicket.img : Image}
            alt=""
          />
        </div>
      </div>
      <div className="ticket-info-user-info w-[100%] mt-[20px] overflow-x-auto break-words flex items-center flex-col justify-center h-auto">
        <div className="box shadow-md">ชื่อผู้แจ้ง : {selectTicket?.name}</div>
        <div className="box shadow-md">อีเมล : {selectTicket?.email}</div>
        <div className="box-detail shadow-md h-[100px] overflow-x-auto break-words">
          รายละเอียด : {selectTicket?.detail}
        </div>
      </div>
    </>
  );
};

export default Ticket;

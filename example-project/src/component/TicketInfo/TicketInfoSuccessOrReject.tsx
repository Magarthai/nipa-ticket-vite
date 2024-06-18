import { FC } from "react";
import { ITicketComponent } from "../../dto/ITicketComponent";
import { TicketStatus } from "../../enum/TicketStatus";

const TicketInfoSuccessOrReject: FC<ITicketComponent> = ({ selectTicket }) => {
  return (
    <>
      {(selectTicket?.status == TicketStatus.SUCCESS ||
        selectTicket?.status == TicketStatus.REJECT) && (
        <div className="ticket-info-user-info w-[100%] mt-[0px] overflow-x-auto break-words flex items-center flex-col justify-center h-auto">
          <div className="box shadow-md">
            ชื่อผู้รับเรื่อง : {selectTicket.recipient_name}
          </div>
          <div className="box shadow-md">
            วันที่อัพเดต : {new Date(selectTicket.updated_at).toLocaleString()}
          </div>
          <div className="box-detail shadow-md min-h-[100px] overflow-x-auto break-words">
            รายละเอียดการแก้ปัญหา : {selectTicket?.solve}
          </div>
        </div>
      )}
    </>
  );
};

export default TicketInfoSuccessOrReject;

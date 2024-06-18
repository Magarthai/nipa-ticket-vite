import { FC } from "react";
import { ITicketEntity } from "../../store/TicketStore";

interface ITicketStatus {
  item: ITicketEntity;
}
const TicketStatus: FC<ITicketStatus> = ({ item }) => {
  return (
    <>
      {item.status == "accepted" && (
        <>
          <button className="shadow-md bg-[#f1c638] w-[120px] pr-[20px] pl-[20px] p-[5px] text-white rounded-md">
            รับเรื่องแล้ว
          </button>
        </>
      )}
      {item.status == "pending" && (
        <>
          <button className="shadow-md bg-[#808080] w-[120px] pr-[20px] pl-[20px] p-[5px] text-white rounded-md">
            รอรับเรื่อง
          </button>
        </>
      )}
      {item.status == "success" && (
        <>
          <button className="shadow-md bg-[#44d427] w-[120px] pr-[20px] pl-[20px] p-[5px] text-white rounded-md">
            เสร็จสิ้น
          </button>
        </>
      )}
      {item.status == "reject" && (
        <>
          <button className="shadow-md bg-[#f13838] w-[120px] pr-[20px] pl-[20px] p-[5px] text-white rounded-md">
            ไม่รับเรื่อง
          </button>
        </>
      )}
    </>
  );
};

export default TicketStatus;

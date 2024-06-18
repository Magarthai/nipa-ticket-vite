import { FC } from "react";
import { ITicketEntity } from "../../store/TicketStore";
import { IUserEntity } from "../../store/UserStore";
import { useSelectedTicketStore } from "../../store/SelectedTicketStore";
import { useNavigate } from "react-router-dom";
import TicketTableStatus from "./TicketTableStatus";

interface ITicketTable {
  ticket: ITicketEntity[];
  userData?: IUserEntity;
  status: string;
}

const TicketTable: FC<ITicketTable> = ({ ticket, status }) => {
  const navigate = useNavigate();

  const { setSelectValue } = useSelectedTicketStore();

  const navigateToTicketInfo = async (ticket: ITicketEntity) => {
    setSelectValue(ticket);
    navigate("/ticketInfo");
  };

  const renderTicket =
    status === "all"
      ? ticket
      : ticket.filter((ticket) => ticket.status == status);

  return (
    <table
      className="h-[50px] border-spacing-10 flex flex-col w-[100%] items-center"
      key={"test"}
    >
      <thead className=" flex text-white w-[100%]">
        <tr>
          <th className="w-[170px]">ID</th>
          <th className="w-[100px]">ชื่อผู้แจ้ง</th>
          <th className="w-[250px]">Email</th>
          <th className="w-[430px]">รายละเอียด</th>
          <th className="w-[20px]">อัพเดต</th>
        </tr>
      </thead>

      <tbody>
        {renderTicket.map((item: ITicketEntity) => (
          <tr
            onClick={() => {
              navigateToTicketInfo(item);
            }}
            key={item.id}
            className="flex flex-row ticket bg-white p-[10px] m-[10px] w-[98.5%] rounded-md cursor-pointer justify-center items-center"
          >
            <td className="w-[50px] flex-row text-left m-[20px] flex">
              {item.id}
            </td>
            <td className="w-[150px] flex text-left overflow-x-hidden ">
              {item.name}
            </td>
            <td className="w-[200px] overflow-x-hidden text-left flex">
              {item.email}
            </td>
            <td className=" w-[430px] max-w-[430px] overflow-x-hidden">
              {item.detail}
            </td>
            <td className="w-[200px] flex justify-between items-center h-[44px]">
              <TicketTableStatus item={item} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;

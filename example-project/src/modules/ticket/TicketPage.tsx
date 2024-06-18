import React, { FC, useEffect, useState, startTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTicket } from "../../service/API/tickets";
import Navbar from "../../component/Navbar";
import { useTicketStore } from "../../store/TicketStore";
import { RefreshToken } from "../../service/API/users";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import TicketTable from "../../component/TIcketPage/TicketTable";
import "../../css/TicketPage.css";
import { Hourglass } from "react-loader-spinner";

const options = [
  { value: "all", label: "All" },
  { value: "pending", label: "รอรับเรื่อง" },
  { value: "accepted", label: "รับเรื่องแล้ว" },
  { value: "success", label: "สําเร็จ" },
  { value: "reject", label: "ไม่สําเร็จ" },
];

const TicketPage: FC = () => {
  const { ticket, setValue } = useTicketStore();

  const { userData, setUser } = useUserStore();

  const [status, setStatus] = useState<string>("all");

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTicket,
  });

  const checkToken = async () => {
    const check = await RefreshToken();
    console.log(check);
    setUser(check.user);
    if (check.message == "Not Found User") {
      navigate("/");
      return;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      startTransition(() => {
        if (!userData) {
          checkToken();
        }
        setValue(data.ticket);
      });
      console.log(ticket);
    }
  }, [isSuccess, data, setValue]);

  if (isError) {
    return <>{error.message}</>;
  }

  // if (!isSuccess) {
  //   return (
  //     <div className="landing-page-containers w-[100%] h-[100vh] flex items-center justify-center">
  //       <Hourglass
  //         visible={true}
  //         height="80"
  //         width="80"
  //         ariaLabel="hourglass-loading"
  //         colors={["#306cce", "#72a1ed"]}
  //       />
  //     </div>
  //   );
  // }

  let sortTicket = ticket.sort((a, b) => a.id - b.id);

  return (
    <div className="landing-page-container">
      <div className="h-32 landing-container flex justify-center items-center">
        <Navbar page="ticket" />
      </div>
      <div className="ticket-wrapper h-[750px] flex items-center justify-center">
        <div className="ticket-list w-[1200px] h-[700px]  bg-[#133D94] p-[20px] flex  items-center rounded-2xl flex-col overflow-y-scroll mb-[20px]">
          <div className="filter-ticket-wrapper w-[90%] flex mt-[10px] mb-[10px] justify-end">
            <div className="filter-ticket">
              <select
                className="text-[#000] text-[25px] rounded-md w-[500px]"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                {options.map((option, idx) => (
                  <option value={option.value} key={idx}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TicketTable
            ticket={sortTicket}
            userData={userData}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;

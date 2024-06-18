import React, { useEffect, useState } from "react";
import { useSelectedTicketStore } from "../../store/SelectedTicketStore";
import Navbar from "../../component/Navbar";
import "../../css/TicketPage.css";
import { RefreshToken } from "../../service/API/users";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import TicketHiddenInfo from "../../component/TicketInfo/TicketHiddenInfo";
import Ticket from "../../component/TIcketPage/Ticket";

const TicketInfo = () => {
  const navigate = useNavigate();

  const { selectTicket } = useSelectedTicketStore();

  useEffect(() => {
    console.log(selectTicket);
    checkToken();
  }, [selectTicket]);

  const checkToken = async () => {
    const check = await RefreshToken();
    console.log(check);
    setUser(check.user);
    if (check.message == "Not Found User") {
      navigate("/");
      return;
    }
  };

  const { userData, setUser } = useUserStore();

  return (
    <div className="landing-page-container">
      <div className="h-32 landing-container flex justify-center items-center">
        <Navbar page="ticketInfo" />
      </div>
      <div className="ticket-info-container w-[100%] justify-center items-center flex">
        <div className="ticket-info w-[800px] h-[auto] pb-[40px] mb-[40px] bg-[#FFFAFA] rounded-xl shadow-md">
          <Ticket selectTicket={selectTicket} />
          <TicketHiddenInfo userData={userData} selectTicket={selectTicket} />
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;

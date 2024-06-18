import { FC } from "react";
import { ITicketComponent } from "../../dto/ITicketComponent";
import ITicketInfoAccept from "../../dto/ITicketInfoAccept";
import TicketInfoPending from "./TicketInfoPending";
import TicketInfoSuccessOrReject from "./TicketInfoSuccessOrReject";

const TicketHiddenInfo: FC<ITicketComponent> = ({ selectTicket, userData }) => {
  return (
    <>
      <TicketInfoPending userData={userData} selectTicket={selectTicket} />
      <TicketInfoSuccessOrReject
        userData={userData}
        selectTicket={selectTicket}
      />
      <ITicketInfoAccept userData={userData} selectTicket={selectTicket} />
    </>
  );
};

export default TicketHiddenInfo;

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createTicket } from "../../service/API/tickets";
import Swal from "sweetalert2";
import SelectTopicInput from "../Input/SelectTopicInput";
import TextInput from "../Input/TextInput";
import TextAreaInput from "../Input/TextAreaInput";
import { queryClient } from "../../service/queryClient";
import { swalFire } from "../../service/function/Swalfire";

const options = [
  { value: "ปัญหาด้านเว็ปไซต์", label: "ปัญหาด้านเว็ปไซต์" },
  { value: "ปัญหาด้านเซิฟเวอร์", label: "ปัญหาด้านเซิฟเวอร์" },
  { value: "ปัญหาด้านการโอนเงิน", label: "ปัญหาด้านการโอนเงิน" },
  { value: "ปัญหาอื่นๆ", label: "ปัญหาอื่นๆ" },
];

const CreateTicketForm = ({}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [selectedTopic, setSelectedTopic] =
    useState<string>("ปัญหาด้านเว็ปไซต์");
  const IsSubmitEnable = !name || !email || !detail;
  const pushData = useMutation({
    mutationKey: ["create ticket"],
    mutationFn: createTicket,
  });
  const createData = async (e: any) => {
    e.preventDefault();
    4;

    const Data = {
      name: name,
      email: email,
      detail: detail,
      selectTopic: selectedTopic,
    };

    await pushData.mutateAsync(Data);
    queryClient.invalidateQueries({
      queryKey: ["tickets"],
    });
    swalFire({
      title: "สําเร็จ!",
      icon: "success",
      text: "สร้างรายการ Ticket สําเร็จ",
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <span className="m-[10px] text-white text-[50px]">CREATE TICKET</span>

      <form
        className="input-container h-[100%] flex items-center flex-col p-[20px]"
        onSubmit={createData}
      >
        <SelectTopicInput
          options={options}
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        />
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          type={"text"}
          placeholder="กรอกชื่อ"
        />
        <TextInput
          value={email}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="กรอก Email"
        />
        <TextAreaInput
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="กรอกรายละเอียดปัญหา"
        />
        <button
          type="submit"
          disabled={IsSubmitEnable}
          className={
            IsSubmitEnable
              ? "text-white bg-[#808080] rounded-md w-[500px] h-[50px] mt-[10px]"
              : "text-white bg-[#D53177] rounded-md w-[500px] h-[50px] mt-[10px]"
          }
        >
          แจ้งปัญหา
        </button>
      </form>
    </>
  );
};

export default CreateTicketForm;

import { FC } from "react";

interface ISelectInput {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const options = [
  { value: "ปัญหาด้านเว็ปไซต์", label: "ปัญหาด้านเว็ปไซต์" },
  { value: "ปัญหาด้านเซิฟเวอร์", label: "ปัญหาด้านเซิฟเวอร์" },
  { value: "ปัญหาด้านการโอนเงิน", label: "ปัญหาด้านการโอนเงิน" },
  { value: "ปัญหาอื่นๆ", label: "ปัญหาอื่นๆ" },
];

const SelectTopicInput: FC<ISelectInput> = ({ value, onChange }) => {
  return (
    <select
      className="text-[#000] text-[25px] rounded-md m-[10px] w-[500px]"
      onChange={onChange}
      value={value}
    >
      {options.map((option, idx) => (
        <option value={option.value} key={idx}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectTopicInput;

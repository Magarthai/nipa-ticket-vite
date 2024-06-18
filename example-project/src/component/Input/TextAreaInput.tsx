import { FC } from "react";
import { IInput } from "../../dto/IInput";

const TextAreaInput: FC<IInput> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      name="detail"
      id="detail"
      placeholder={placeholder}
      className="rounded-md m-[10px] w-[500px] px-[5px] h-[100px]"
      onChange={onChange}
    />
  );
};

export default TextAreaInput;

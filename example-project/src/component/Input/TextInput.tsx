import { FC } from "react";
import { IInput } from "../../dto/IInput";

const TextInput: FC<IInput> = ({ value, onChange, placeholder, type }) => {
  return (
    <input
      value={value}
      type={type}
      name="username"
      id="username"
      placeholder={placeholder}
      className="rounded-md m-[10px] w-[500px] px-[5px] h-[40px]"
      onChange={onChange}
    />
  );
};

export default TextInput;

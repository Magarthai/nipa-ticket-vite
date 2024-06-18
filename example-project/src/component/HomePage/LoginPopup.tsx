import { FC } from "react";
import "../../css/LoginPopup.css";
import NipaLogo from "../../assets/img/R_1.png";
import LoginForm from "./LoginForm";
interface ILoginPopup {
  open: Boolean;
  onClose: () => void;
}

const LoginPopup: FC<ILoginPopup> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={() => onClose()} className="loginpopup-container">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="login-container flex items-center justify-center"
      >
        <div className="login-header flex items-center justify-center flex-col">
          <div className="circle-container" onClick={() => onClose()}>
            <div className="circle-exit button-color bold">X</div>
          </div>
          <img className="nipa-logo" src={NipaLogo} alt="nipa logo" />
          <h1 className="font-primary">เข้าสู่ระบบ Admin</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPopup;

import { FC, useState } from "react";
import NipaLogo from "../assets/img/Logo-EPc-2_-_Copy.png";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./HomePage/LoginPopup";
import { Logout } from "../service/API/users";
import Swal from "sweetalert2";
interface A {
  page: string;
}

const Navbar: FC<A> = ({ page }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  const navButton = async (page: string) => {
    if (page == "home") {
      setOpenPopup(true);
    } else {
      try {
        console.log("logout");
        const logout = await Logout();
        if (logout == "success") {
          Swal.fire({
            title: "ล็อคเอ้าท์สําเร็จ!",
            icon: "success",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#263A50",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "ล็อคเอ้าท์ไม่สําเร็จ!",
          icon: "error",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#263A50",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
        navigate("/");
      }
    }
  };

  return (
    <>
      <LoginPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      ></LoginPopup>
      <section
        className="first-section"
        style={{ filter: openPopup ? "blur(100px)" : "none" }}
      ></section>
      <div className="navbar-container flex w-[100%] h-[100px]  justify-between p-[40px] items-center">
        <a href="/" className="logo text-white">
          <img src={NipaLogo} alt="" width={200} className="drop-shadow" />
        </a>
        <div className="bututon-login text-white bg-[#D53177] rounded-md shadow-md">
          <a
            className="w-[150px] h-[40px] flex items-center justify-center cursor-pointer select-none"
            onClick={() => {
              navButton(page);
            }}
          >
            <p>{page == "home" ? "TICKET" : "LOGOUT"}</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import { useState } from "react";
import { Login } from "../../service/API/users";
import Swal from "sweetalert2";
import { swalFire } from "../../service/function/Swalfire";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const IsSubmitEnable = !email || !password;

  const userLogin = async () => {
    try {
      const login_info = {
        email: email,
        password: password,
      };
      const userlogin = await Login(login_info);

      if (userlogin == "User logged in successfully") {
        swalFire({
          title: "สําเร็จ!",
          icon: "success",
          text: "คุณได้ล็อคอินสําเร็จ",
        }).then(() => {
          window.location.reload();
        });
      } else if (userlogin == "Invalid password") {
        swalFire({
          title: "เกิดข้อผิดพลาด!",
          icon: "error",
          text: "คุณล็อคอินไม่สําเร็จ กรุณาตรวจสอบใหม่อีกครั้ง",
        });
      } else {
        swalFire({
          title: "เกิดข้อผิดพลาด!",
          icon: "error",
          text: "กรุณาลองใหม่อีกครั้ง",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-input font-primary">
        <p>Email</p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="example@gmail.com"
          className="bg-[#ebebeb] rounded-md text-black border-none placeholder:text-[#00000070] border-gray-100"
        />
      </div>

      <div className="login-input font-primary">
        <p>Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
          placeholder="type password here!"
          className="bg-[#ebebeb] rounded-md text-black border-none placeholder:text-[#00000070] border-gray-100"
        />
      </div>

      <button
        disabled={IsSubmitEnable}
        onClick={() => userLogin()}
        className={
          IsSubmitEnable
            ? "button-login cursor-none bold button-color bg-[#6e6e6e] rounded-md text-white border-none placeholder:text-[#ffffff70] border-gray-100"
            : "button-login bold button-color bg-[#D53177] rounded-md text-white border-none placeholder:text-[#ffffff70] border-gray-100"
        }
      >
        ล็อคอิน
      </button>
    </>
  );
};

export default LoginForm;

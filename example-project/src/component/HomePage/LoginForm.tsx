import { useState } from "react";
import { Login } from "../../service/API/users";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const IsSubmitEnable = !email || !password;

  const userLogin = async () => {
    try {
      const login_info = {
        email: email,
        password: password,
      };
      const userlogin = await Login(login_info);

      if (userlogin == "User logged in successfully") {
        Swal.fire({
          icon: "success",
          title: "ล็อคอินสําเร็จ",
          text: "ยินดีต้อนรับเข้าสู่เว็ปไซต์ Nipa Cloud!",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#263A50",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/ticket");
          } else {
          }
        });
      } else if (userlogin == "Invalid password") {
        Swal.fire({
          icon: "error",
          title: "ล็อคอินไม่สําเร็จ",
          text: "กรุณาลองใหม่อีกครั้ง!",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#263A50",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ล็อคอินไม่สําเร็จ",
          text: "ไม่พบบัญชีนี้ในระบบ!",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#263A50",
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

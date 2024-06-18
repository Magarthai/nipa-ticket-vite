import { useEffect } from "react";
import "../../css/TicketPage.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import CloudImg from "../../assets/img/right-side.png";
import Navbar from "../../component/Navbar";
import { RefreshToken } from "../../service/API/users";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import CreateTicketForm from "../../component/HomePage/CreateTicketForm";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";

function HomePage() {
  const { setUser } = useUserStore();

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["refresh"],
    queryFn: RefreshToken,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data != undefined) {
      if (data.user != undefined) {
        setUser(data.user);
        navigate("/ticket");
      }
    }
  }, [data]);

  if (isError) {
    return (
      <div className="landing-page-containers w-[100%] h-[100vh] flex items-center justify-center text-[30px]">
        <div className="error-wrapper w-[500px] h-[300px] p-[40px] bg-[#133D94] rounded-xl justify-center items-center flex flex-col text-white">
          <img
            width={200}
            src="https://th.bing.com/th/id/R.44e5ed643431e726d611283422cc296e?rik=iHSRYCIpFWpGlA&pid=ImgRaw&r=0"
            alt="error icon"
          />
          <p>เกิดข้อผิดพลาด</p>
          <p>{error.message}</p>
          <button
            className="pl-[20px] pr-[20px] bg-white rounded-md text-[#133D94] mt-[10px] cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Relaod
          </button>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="landing-page-containers w-[100%] h-[100vh] flex items-center justify-center">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  return (
    <div className="landing-page-container">
      <div className="h-32 landing-container flex justify-center items-center">
        <Navbar page="home" />
      </div>
      <div className="landing-center-container h-[750px] flex justify-between p-[40px]">
        <div className="landing-center-left-side w-[50%] flex justify-center items-center">
          <div className="create-ticket-container w-[700px] h-[550px] bg-[#133D94] text-[20px] rounded-2xl flex-col flex  items-center p-[20px] font-[500] shadow-xl">
            <CreateTicketForm />
          </div>
        </div>
        <div className="landing-center-right-side w-[50%] flex justify-center items-center">
          <img
            src={CloudImg}
            alt="cloud image"
            width={550}
            className="drop-shadow-3xl drop-shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

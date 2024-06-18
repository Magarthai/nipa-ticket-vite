import axios from "axios";
import Cookie from "js-cookie";
import { ITicketEntity } from "../../store/TicketStore";
interface ILoginRequest {
  email: string;
  password: string;
}

export async function Login(data: ILoginRequest) {
  const login = await axios.post("http://localhost:5000/login", data, {
    withCredentials: true,
  });

  if (login.data.message == "User logged in successfully") {
    Cookie.set("refreshToken", login.data.token);
  }

  return login.data.message;
}

export async function RefreshToken() {
  const response = await axios.get("http://localhost:5000/refresh", {
    withCredentials: true,
  });

  return response.data;
}

export async function Logout() {
  const response = await axios.get("http://localhost:5000/logout", {
    withCredentials: true,
  });
  Cookie.remove("refreshToken");
  return response.data;
}

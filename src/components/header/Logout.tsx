"use client";
import { DOMAIN } from "@/constants/enums";
import axios from "axios";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
        await axios.get(`${DOMAIN.HOST}/api/auth/logout`);
        router.push("/");
        router.refresh();
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <button onClick={logoutHandler} className="bg-gray-700 text-gray-200 px-1 rounded">
        Logout
    </button>
  )
}

export default LogoutButton
import React from "react";
import axios from "axios";
import Account from "@/components/account";

export default function AccountContainer() {
  const handleClickTest = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/business-user`, {
        withCredentials: true,
      });

      console.log("테스트 API : ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return <Account />;
}

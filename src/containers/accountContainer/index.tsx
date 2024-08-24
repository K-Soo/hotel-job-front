import React from "react";
import axios from "axios";
import Account from "@/components/account";
import { Get, Post } from "@/apis";

export default function AccountContainer() {
  const handleClickTest = async () => {
    try {
      const response = await Post.getUserInfo({});
      console.log("유저정보 API : ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <button onClick={handleClickTest}>asd</button>
      <Account />;
    </>
  );
}

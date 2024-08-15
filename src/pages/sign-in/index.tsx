import axios from "axios";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [index, setindex] = useState(1);
  // useEffect(() => {
  //   // (async () => {
  //   //   try {
  //   //     const response = await axios.post("http://localhost:8000/auth/signup", {
  //   //       email: "test2@test.com",
  //   //       password: "1234",
  //   //     });
  //   //     console.log("post: ", response);
  //   //   } catch (error) {
  //   //     console.log("error: ", error);
  //   //   }
  //   // })();

  //   // (async () => {
  //   //   try {
  //   //     const response = await axios.get("http://localhost:8000/auth/colors/5", {});
  //   //     console.log("red: ", response);
  //   //   } catch (error) {
  //   //     console.log("error: ", error);
  //   //   }
  //   // })();

  //   // (async () => {
  //   //   try {
  //   //     const response = await axios.get("http://localhost:8000/auth/colors", {});
  //   //     console.log("get: ", response);
  //   //   } catch (error) {
  //   //     console.log("error: ", error);
  //   //   }
  //   // })();
  // }, []);

  const onClick = async () => {
    setindex((prev) => prev + 1);
    try {
      const response = await axios.get(`http://localhost:8000/auth/colors/${index}`, {
        withCredentials: true,
      });

      console.log("red: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <button onClick={onClick} type="button">
        제출
      </button>
    </>
  );
}

import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Get } from "@/apis";

export default function TestPage() {
  const fetchPosts = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data;
  };

  const { data, isError, isLoading, status, isSuccess } = useQuery({
    queryFn: () => fetchPosts(),
    queryKey: ["fetchPosts"],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
  console.log("status: ", status);
  console.log("isLoading: ", isLoading);

  console.log("테스트 API : ", data);

  const fetchTest = async () => {
    try {
      const { data } = await Get.getTests();
      console.log("data: ", data);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <button>유저정보</button>
      <button onClick={fetchTest}>일반 테스트</button>
    </>
  );
}

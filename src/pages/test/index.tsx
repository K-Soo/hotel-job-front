import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

  return <>index</>;
}

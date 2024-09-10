import Post from "./post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const fetchPosts = async () => {
  const { data } = await makeRequest.get("/post");
  return data;
};

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"], // This key is used to uniquely identify the query
    queryFn: fetchPosts, // Define the query function as a separate function or inline
    staleTime: 60000,    // Optional: Prevent frequent refetching within 60 seconds
  });
  

  return (
    <div className="flex flex-col gap-[50px]">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading..."
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;

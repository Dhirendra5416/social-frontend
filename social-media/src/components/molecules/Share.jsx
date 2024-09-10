import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(""); 
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Function to create a post with FormData
  const createPost = async (formData) => {
    try {
      const { data } = await makeRequest.post("/post/add-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (err) {
      throw new Error("Post creation failed: " + err.message);
    }
  };

  // Mutation for post creation
  const postMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setDesc("");
      setFile(null);
      setError(""); // Clear error on success
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  // Handle the click event for sharing a post
  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc && !file) {
      setError("Please add a description or upload an image");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("desc", desc);
    if (file) {
      formData.append("file", file);
    }

    // Trigger post creation
    postMutation.mutate(formData);
  };

  return (
    <div className="shadow-lg rounded-lg bg-white dark:bg-gray-800 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 flex-3">
          <img
            src={`/upload/${currentUser.profilePic}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser.name}?`}
            className="border-none outline-none bg-transparent w-[70v] p-2 text-gray-900 dark:text-gray-100"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex-1">
          {file && (
            <img
              className="w-24 h-24 object-cover"
              alt="Uploaded file preview"
              src={URL.createObjectURL(file)}
            />
          )}
        </div>
      </div>
      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label htmlFor="file" className="flex items-center cursor-pointer space-x-2">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">Add Image</span>
          </label>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">Add Place</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">Tag Friends</span>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={postMutation.isLoading}
        >
          {postMutation.isLoading ? "Sharing..." : "Share"}
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default Share;

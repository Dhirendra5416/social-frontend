import { useState, useContext } from "react";
import { FaRegHeart, FaHeart, FaRegCommentDots, FaShareAlt, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const fetchLikes = async (postId) => {
  const { data } = await makeRequest.get(`/like?postId=${postId}`);
  return data;
};

const Post = ({ post }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: likes = [], isLoading } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => fetchLikes(post.id),
  });

  const likeMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return makeRequest.delete(`/like?postId=${post.id}`);
      }
      return makeRequest.post("/like", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/posts/${post.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = () => {
    const isLiked = likes.includes(currentUser.id);
    likeMutation.mutate(isLiked);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  console.log(post,"data")
  return (
    <div className="post shadow-md rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="container p-5">
        <div className="user flex items-center justify-between relative">
          <div className="userInfo flex gap-5">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={`/upload/${post.profilePic}`}
              alt="User Profile"
            />
            <div className="details flex flex-col">
              <Link
                to={`/profile/${post.userId}`}
                className="text-blue-500 hover:underline"
              >
                <span className="name font-medium">{post.name}</span>
              </Link>
              <span className="date text-xs text-gray-600">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <FaEllipsisH
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          />
          {menuOpen && post.userId === currentUser.id && (
            <button
              onClick={handleDelete}
              className="absolute top-7 right-0 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          )}
        </div>
        <div className="content my-5">
          <p>{post.desc}</p>
          {post.img && (
            <img
              className="w-full max-h-[500px] object-cover mt-5"
              src={`/upload/${post.img}`}
              alt="Post Content"
            />
          )}
        </div>
        <div className="info flex items-center gap-5">
          <div className="item flex items-center gap-2 cursor-pointer text-sm">
            {isLoading ? (
              "Loading..."
            ) : likes.includes(currentUser.id) ? (
              <FaHeart
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FaRegHeart onClick={handleLike} />
            )}
            <span>{likes.length} Likes</span>
          </div>
          <div
            className="item flex items-center gap-2 cursor-pointer text-sm"
            //onClick={() => setCommentOpen(!commentOpen)}
          >
            <FaRegCommentDots />
            <span>See Comments</span>
          </div>
          <div className="item flex items-center gap-2 cursor-pointer text-sm">
            <FaShareAlt />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

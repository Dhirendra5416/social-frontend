import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineMail,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import Posts from "../components/molecules/posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import Update from "../components/molecules/update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Extract the userId from the URL
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const queryClient = useQueryClient();

  // Fetch user data using the userId in the queryKey
  const { isLoading: isUserLoading, error: userError, data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
  });

  // Fetch relationship data using the userId in the queryKey
  const { isLoading: isRelationshipLoading, error: relationshipError, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: () => makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => res.data),
  });

  // Mutation for following/unfollowing the user
  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makeRequest.delete(`/relationships?userId=${userId}`);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship", userId] }); // Invalidate and refetch relationship data
    },
  });

  const handleFollow = () => {
    if (relationshipData) {
      mutation.mutate(relationshipData.includes(currentUser.id));
    }
  };

  // Handle loading and error states
  if (isUserLoading || isRelationshipLoading) return <div>Loading...</div>;
  if (userError || relationshipError) return <div>Something went wrong!</div>;

  return (
    <div className="profile w-full">
      <div className="w-full">
        <img
        src={"/postimage2.jpg"}
          alt="Cover"
          className="w-full h-56 object-cover"
        />
        <img
          src={`/upload/${currentUser.profilePic}`}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto mt-[-4rem] border-4 border-white"
        />
      </div>
      <div className="profileContainer p-6">
        <div className="uInfo flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <a href="http://facebook.com" className="text-blue-600">
              <FaFacebook size={28} />
            </a>
            <a href="http://instagram.com" className="text-pink-500">
              <FaInstagram size={28} />
            </a>
            <a href="http://twitter.com" className="text-blue-400">
              <FaTwitter size={28} />
            </a>
            <a href="http://linkedin.com" className="text-blue-700">
              <FaLinkedin size={28} />
            </a>
            <a href="http://pinterest.com" className="text-red-600">
              <FaPinterest size={28} />
            </a>
          </div>
          <div className="center text-center">
            <span className="font-bold text-xl">{userData.name}</span>
            <div className="info flex justify-center items-center space-x-4 mt-2">
              <div className="item flex items-center space-x-1">
                <HiOutlineLocationMarker className="text-gray-600" />
                <span>{userData.city}</span>
              </div>
              <div className="item flex items-center space-x-1">
                <HiOutlineGlobeAlt className="text-gray-600" />
                <span>{userData.website}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button
                onClick={() => setOpenUpdate(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="right mt-4 flex space-x-2">
            <HiOutlineMail className="text-gray-600" />
            <HiOutlineDotsVertical className="text-gray-600" />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={userData} />}
    </div>
  );
};

export default Profile;

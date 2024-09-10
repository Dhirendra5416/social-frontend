import React from 'react';

const PostHeader = ({ profilePic, userName,onClick }) => (
    <div onClick={onClick} className="flex items-center space-x-3 mb-4">
        
        <img
            src={profilePic || "src/assets/avatar.svg"}
            alt={userName|| "avatar"}
            className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold text-gray-900 dark:text-white">{userName||"Dhirendra"}</span>
    </div>
);

export default PostHeader;
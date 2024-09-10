import React from 'react'
import Image from '../atom/image'
import PostHeader from './postheader'
import Paragraph from '../atom/Paragraph'
import { IconButton } from '../atom/button'
import { FaThumbsUp, FaComment } from 'react-icons/fa';

const Postcard = ({ profilePic, userName, imageSrc, text,onclick,key }) => {
    const handleLike = () => {
        console.log('Like button clicked');
    };

    const handleComment = () => {
        console.log('Comment button clicked');
    };
  return (
    <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <PostHeader onClick={onclick} profilePic={profilePic ||"src/assets/avatar.svg"} userName={userName||"dhirendra"} />
    
    <Image src={imageSrc || "src/assets/flower.jpg"} alt="Post image" />
    <div className="mt-4">
        
        <Paragraph text={text || "lorem"} />
    </div>
     <div className="mt-4 flex space-x-4">
        
        <IconButton
            icon={<FaThumbsUp />}
            onClick={handleLike}
            label="Like"
        />
        <IconButton
            icon={<FaComment />}
            onClick={handleComment}
            label="Comment"
        />
    </div> 
</div>
  )
}

export default Postcard
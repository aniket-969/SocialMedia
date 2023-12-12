import React, { useEffect, useState } from 'react'
import { getLikes,createLikes, removeLike } from "../lib/appwrite/api";
import { useUserContext } from '../context/AuthProvider';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Likes = ({ post }) => {

    const [likes, setLike] = useState(null)
    const { user } = useUserContext()
    const[likeId,setLikeId] = useState(null)

    const getLikesData = async () => {

        const likeData = await getLikes(post.$id)
        
        setLike(likeData.documents.map((doc) => ({ userId: doc.userId, })));
        

    }

    useEffect(() => {
        getLikesData()
    }, [])
 
    const handleHeartClick = async (postId) => {

        const userId = user.id
        try {
          const liked = await createLikes(postId, userId)
         
          console.log(liked.$id);
          setLikeId(liked.$id) 
          getLikesData();
        }
        catch (error) {
          console.log(error);
        }
     
      };
    
const removeLiked = async()=>{

    try {
        await removeLike(likeId)
    } catch (error) {
        console.log(error);
    }
}

const hasUserLiked = likes?.find((like)=> like.userId === user?.id)

    return (
        <>
         {hasUserLiked?<FaHeart className="border-or text-red-500" onClick={()=>removeLiked} />:<FaRegHeart onClick={() => handleHeartClick(post.$id)} />}
            {
                likes && <p>Likes:{likes?.length}</p>
            }</>
    )

}

export default Likes
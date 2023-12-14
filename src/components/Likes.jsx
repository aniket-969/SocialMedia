import React, { useEffect, useState } from 'react'
import { getLikes,createLikes, removeLike, getOneLike } from "../lib/appwrite/api";
import { useUserContext } from '../context/AuthProvider';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Likes = ({ post }) => {

    const [likes, setLike] = useState(null)
    const { user } = useUserContext()

    const getLikesData = async () => {
console.log('called it');
        const likeData = await getLikes(post.$id)
        console.log(likeData,post.$id);
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
          
          getLikesData();
        }
        catch (error) {
          console.log(error);
        }
     
      }; 
     
const removeLiked = async(postId)=>{

    try {
        const userId =user?.id
        const getId = await getOneLike(postId,userId)
        console.log(getId,getId.documents[0].$id);
       await removeLike(getId.documents[0].$id)
       await getLikesData() 
      
    } catch (error) { 
        console.log(error);   
    }
}
console.log(likes,post.$id);
const hasUserLiked = likes?.find((like)=> like.userId === user?.id)   
// console.log(hasUserLiked,post.$id);
 
    return (
        <>
         {hasUserLiked?<FaHeart className="border-or text-red-500" onClick={()=>removeLiked(post.$id)} />:<FaRegHeart onClick={() => handleHeartClick(post.$id)} />}
            {
                likes && <p>Likes:{likes?.length}</p>
            }</>
    )

}

export default Likes
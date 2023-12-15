import React, { useEffect, useState } from "react";
import { createLikes, getAllPosts, getFilePreview, getLikes } from "../../lib/appwrite/api";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import { useUserContext } from "../../context/AuthProvider";

const Post = (props) => {

    const{post,index} = props

    
  const [postImages, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
const{user} = useUserContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getAllPosts();
        setPosts(postData.documents);
        fetchFilePreview(postData.documents);
        // console.log(getLikes('65773dabc02e59f1abbb'));

        

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchFilePreview = async (posts) => {
      try {
        console.log(posts);
        const images = await Promise.all(
          posts.map((post) => getFilePreview(post.imageId))
        );

        setPostImages(images);
      } catch (error) {
        console.error("Error fetching file preview:", error);
      }
    };


    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleHeartClick = async(postId) => {

    const userId = user.id
   try {
    const liked = await createLikes(postId,userId)
    console.log(liked);
   } 
   catch (error) {
    console.log(error);
   }
   
  };

  return (
    <div key={post.$id} >
          
    <Link to={`/posts/${post.$id}` } className="flex flex-col gap-4 items-center py-4 justify-center max-w-[95rem] my-5 " >

      <div className="flex gap-3">
        <p className=" ">{post.name}</p>
        <div className="vertical-line"></div>
        <p>@{post.username}</p>
      </div>

      <div className="w-[25rem] m-2 ">
        {postImages[index] && <img className="rounded-[2rem]" src={postImages[index]} alt="" />}
      </div>

      <p className="bg-[#9d4edd] px-8 py-4 max-w-[70%] text-white rounded-xl">{post.desc}</p>

     

    </Link>

     <div className="flex gap-4 items-center justify-center pb-4">
        <FaRegComment />
        <FaRegHeart className="border-or" onClick={()=>handleHeartClick(post.$id)} />

      </div>
    
  </div>

  )
}

export default Post
import React, { useEffect, useState } from 'react'
import { getUserPosts } from '../../lib/appwrite/api'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import Likes from "../../components/Likes";
import { createLikes, getAllPosts, getFilePreview } from "../../lib/appwrite/api";

const Profile = () => {

  const { id } = useParams()
  const [postImages, setPostImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserPost = async (userId) => {

    try {
      const Userposts = await getUserPosts(userId)
      console.log(Userposts);
      setPosts(Userposts.documents)
      fetchFilePreview(Userposts.documents)
      setLoading(false)
    } catch (error) {

    }
  }

  useEffect(() => {
    getUserPost(id)
  }, [])

  const handleHeartClick = async (postId) => {

    const userId = user.id
    try {
      const liked = await createLikes(postId, userId)
      console.log(liked);
    }
    catch (error) {
      console.log(error);
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


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-5 border-re p-4 justify-center items-cetner max-w-[1600px]">
      <h1 className='flex items-center justify-center text-3xl py-4'>Your Posts</h1>
      {posts.map((post, index) => (

        <div key={post.$id} >

          <Link to={`/posts/${post.$id}`} className="flex flex-col gap-4 items-center py-4 justify-center max-w-[95rem] my-5 " >

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

            <Likes post={post} />
          </div>

        </div>

      ))}

    </div>
  )
}

export default Profile
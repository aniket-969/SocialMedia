import React, { useEffect, useState } from 'react'
import { getUserPosts } from '../../lib/appwrite/api'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa"
import Likes from "../../components/Likes";
import { createLikes, getFilePreview } from "../../lib/appwrite/api";
import { useUserContext } from '../../context/AuthProvider';

const Profile = () => {

  const { id } = useParams()
  const [postImages, setPostImages] = useState([]);
  const [posts, setPosts] = useState(null);
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

  else if (!posts || posts.length === 0) {
    return <div className='m-4 text-xl'>You don't have any posts : Please create one </div>
  }

  return (
    <div className="flex flex-col gap-5 border-re p-4 justify-center items-cetner max-w-[1600px]">
      <h1 className='flex items-center justify-center text-3xl py-4 '>Your Posts</h1>
      {posts.map((post, index) => (
        <div key={post.$id} className=" shadow-lg rounded-2xl">

          <Link to={`/posts/${post.$id}`} className="flex flex-col gap-4 items-center py-2 justify-center max-w-[95rem] my-2" >

            <div className="flex md:gap-3">
              <p className=" ">{post.name}</p>
              <div className="vertical-line"></div>
              <p>@{post.username}</p>
            </div>

            <div className="max-w-[25rem] m-2 ">
              {postImages[index] && <img className="rounded-[2rem]" src={postImages[index]} alt="" />}
            </div>

            <p className=" border-c bg-[#9d4edd] px-4 max-w-[90%] text-white rounded-xl md:px-8 py-3 text-base">{post.desc}</p>



          </Link>

          <div className="flex gap-4 items-center justify-center pb-4">

            <Link to={`/posts/${post.$id}`}>
              <FaRegComment />
            </Link>

            <Likes post={post} />
          </div>

        </div>

      ))}

    </div>
  )
}

export default Profile
import React, { useEffect, useState } from "react";
import { createLikes, getAllPosts, getFilePreview } from "../../lib/appwrite/api";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import { useUserContext } from "../../context/AuthProvider";
import Likes from "../../components/Likes";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUserContext()

  useEffect(() => {

    const fetchData = async () => {

      try {

        const postData = await getAllPosts();
        setPosts(postData.documents);
        fetchFilePreview(postData.documents);
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


  return (
    <div className="flex flex-col gap-5 border-re p-4 justify-center items-cetner max-w-[1600px] ">

      {posts.map((post, index) => (

        <div key={post.$id} className=" shadow-lg rounded-2xl">

          <Link to={`/posts/${post.$id}`} className="flex flex-col gap-4 items-center py-4 justify-center max-w-[95rem] my-5" >

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
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { getAllPosts, getFilePreview } from "../../lib/appwrite/api";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <div className="flex flex-col gap-5 border-re p-4 justify-center items-cetner max-w-[1600px]">

      {posts.map((post, index) => (

        <Link key={post.$id} to={`/posts/${post.$id}`} >

          <div key={post.$id} className="flex flex-col gap-4 items-center py-4 justify-center max-w-[95rem] my-5 ">

            <div className="flex gap-3">
              <p className=" ">{post.name}</p>
              <div className="vertical-line"></div>
              <p>@{post.username}</p>
            </div>

            <div className="w-[25rem] m-2 ">
              {postImages[index] && <img className="rounded-[2rem]" src={postImages[index]} alt="" />}
            </div>

            <p className="bg-[#9d4edd] px-8 py-4 max-w-[70%] text-white rounded-xl">{post.desc}</p>

            <div className="flex gap-4">
              <FaRegComment />
              <FaRegHeart />
            </div>


          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { getAllPosts, getFilePreview } from "../../lib/appwrite/api";
import { Link } from "react-router-dom";

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

if(loading){
  return <p>Loading...</p>;
}

 
  return (
    <div>
      {posts.map((post, index) => (
         <Link key={post.$id} to={`/posts/${post.$id}`}>
        <div key={post.$id}>
 <p>{post.name}</p>
 <p>{post.username}</p> 
          <h1>{post.title}</h1> 
          <p>{post.desc}</p>
          {postImages[index] && <img src={postImages[index]} alt="" />}
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;

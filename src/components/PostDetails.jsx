import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getPost, getFilePreview } from "../lib/appwrite/api";

const PostDetails = () => {

  const [posts, setPost] = useState(null)
  const [postImage, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams()

  useEffect(() => {

    const fetchPost = async () => {
      try {
        const post = await getPost(id)
        setPost(post)

        getImage(post.imageId)
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }

    const getImage = async (imageId) => {
      try {
        const image = await getFilePreview(imageId)
        setPostImages(image)
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }
  console.log(posts);

  return (
    <div>
      <h2>{posts.name}</h2>
      <h2>{posts.username}</h2>
      <p>{posts.title}</p>
      <p>{posts.desc}</p>
      <img src={postImage} alt="" />
    </div>
  )
}

export default PostDetails
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getPost, getFilePreview, createComment } from "../lib/appwrite/api";

const PostDetails = () => {

  const [posts, setPost] = useState(null)
  const [postImage, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

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

  const createUserComment = async () => {
    try {
     
      const userComment = await createComment(id, posts.name, posts.username, comment)
      console.log(userComment);
    } catch (error) {
      console.log(error);
    }
  }

  const getComment = () => {

    console.log(comment);
    createUserComment()
    setComment('')
  
  }

  const getUserComment = (e) => {
    setComment(e.target.value)
  }


  return (
    <div>
      <div className="post">
        <h2>{posts.name}</h2>
        <h2>{posts.username}</h2>
        <p>{posts.title}</p>
        <p>{posts.desc}</p>
        <img src={postImage} alt="" />
      </div>
      <div className="comments">

        <input type="text" value={comment} placeholder='Add comment...' onChange={getUserComment} />
        <button onClick={getComment}>Add</button>

      </div>
    </div>
  )
}

export default PostDetails
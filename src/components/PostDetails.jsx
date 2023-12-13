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

  const setUserComment = async () => {

    try {

      console.log(comment);
      const userComment = await createComment(id, posts.name, posts.username, comment)
      console.log(userComment);
    } catch (error) {
      console.log(error);
    }
    setComment('')
  }

  const getUserComment = (e) => {
    setComment(e.target.value)
  }

  return (
    <div className="flex flex-col gap-5 border-re p-4 justify-center items-cetner max-w-[1600px]">
      <div className="flex flex-col gap-4 items-center py-4 justify-center max-w-[95rem] my-5 border-tea">
       
      <div className="flex gap-3">
              <p className=" ">{posts.name}</p>
              <div className="vertical-line"></div>
              <p>@{posts.username}</p>
            </div>
<img src={postImage} alt="" />
        <p className="bg-[#9d4edd] px-8 py-4 max-w-[70%] text-white rounded-xl">{posts.desc}</p>
        
      </div>

      <div className="comments">

        <input type="text" value={comment} placeholder='Add comment...' onChange={getUserComment} />
        <button onClick={setUserComment}>Add</button>

      </div>

    </div>
  )
}

export default PostDetails
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getPost, getFilePreview, createComment, getPostComments } from "../lib/appwrite/api";
import { useUserContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const PostDetails = () => {

  const [posts, setPost] = useState(null)
  const [postImage, setPostImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState([])
  const { user } = useUserContext()

  const userId = user?.id

  const { id } = useParams()

  const fetchComments = async () => {
    console.log('called');
    const commentData = await getPostComments(id)
    console.log(commentData);
    setPostComments(commentData.documents)

  }

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
    fetchComments()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }


  const setUserComment = async () => {

    try {

      console.log(comment);
      const userComment = await createComment(id, user?.name, user?.username, comment, userId)
      console.log(userComment);

    } catch (error) {
      console.log(error);
    }
    setComment('')
    fetchComments()
    toast.success('Comment added')

  }

  const getUserComment = (e) => {
    setComment(e.target.value)
  }

  console.log(postComments);

  return (

    <div className="flex flex-col gap-6 justify-center items-cetner max-w-[1600px]">
      <div className="flex flex-col gap-4 items-center py-4 justify-center max-w-[95rem]  ">

        <div className="flex gap-3">
          <p className=" ">{posts.name}</p>
          <div className="vertical-line"></div>
          <p>@{posts.username}</p>
        </div >
        <div className='w-[40%] flex items-center justify-center'>
          <img src={postImage} alt="" />
        </div>
        
        <p className="bg-[#9d4edd] px-8 py-2.5 max-w-[70%] text-white rounded-xl">{posts.desc}</p>

      </div>

      <div className="flex justify-center gap-2 items-center">

        <textarea type="text" value={comment} placeholder='Add comment...' onChange={getUserComment} className='border-tea w-[40%]' />
        <button onClick={setUserComment}>Add</button>

      </div>
      <p className='text-2xl flex items-center my-4 justify-center'>Comments:</p>
      {postComments.map((comment, index) => (

        <div key={index} className=' flex flex-col gap-4 justify-center items-center px-8  my-4  w-[]'>

          <div className="flex gap-3 text-md">
            <p> {comment.name}</p>
            <div className="vertical-line"></div>
            <p> {comment.username}</p>
          </div>

          <p className='text-xl'>{comment.comment}</p>

        </div>
      ))}

    </div>
  )
}

export default PostDetails
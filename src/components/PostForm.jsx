import React, { useState,useCallback } from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import {  useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthProvider';
import { createPost, uploadFile } from '../lib/appwrite/api';

const PostForm = () => {

    const {user}= useUserContext()
    const [baseImage, setBaseImage] = useState('');


    const schema = yup.object().shape({

        title: yup.string().required("Pls Add Title"),
        desc: yup.string(),
        file: yup.mixed().test('required',"Please select a file",value=>{
            return value && value.length
        })

    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate()

    const handleImageChange= async(e)=>{

        const file = await e.target.files[0];
    
        try {
            const uploadedFile = await uploadFile(file);
            // console.log(uploadedFile);
            // console.log(uploadedFile.$id);
            setBaseImage(uploadedFile.$id)
           
            
        } catch (error) {
            console.error("Error uploading file:", error);
           
        }
    }

    const onPostsubmit = async(data) => {
        console.log(data); 
        console.log(baseImage);

        const newPost = await createPost({
            imageId:baseImage,
            title:data?.title,
            desc:data?.desc,
            userid:user?.id
        })
        if(!newPost){
            toast.error("Please try again")
        }
        toast.success("Uploaded succesfully")
        navigate('/')
    }

    return ( 
        <div>
            <p>image:</p>
            <img src={baseImage} alt="" />
            <form onSubmit={handleSubmit(onPostsubmit)}>
                <label> Add Title:</label>
                <input
                    type="text"
                    placeholder="Add Title"
                    {...register("title")}
                />
                <p className="text-red-500">{errors.title?.message}</p>

                <label>Description:</label>
                <textarea
                    type="textarea"
                    placeholder="Description"
                    {...register("desc")}
                />
                <p className="text-red-500">{errors.firstName?.message}</p>

                <label>Add image:</label>
                <input type="file" name="img" accept="image/*"
                    {...register("file")} multiple onChange={(e) => {
                        handleImageChange(e);
                      }}/>
                <p className="text-red-500">{errors.file?.message}</p>
                

                <input type="submit" />
            </form>
        </div>
    )
}

export default PostForm
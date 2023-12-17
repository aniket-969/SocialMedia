import React, { useState, useCallback } from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthProvider';
import { createPost, uploadFile } from '../lib/appwrite/api';

const PostForm = () => {

    const { user } = useUserContext()
    const [baseImage, setBaseImage] = useState('');
    const [file, setFile] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(null)

    const schema = yup.object().shape({

        title: yup.string().required("Pls Add Title"),
        desc: yup.string(),
        file: yup.mixed().test('required', "Please select a file", value => {
            return value && value.length
        })

    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate()

    const handleImageChange = async (e) => {

        const file = await e.target.files[0];
        setFile(file)
        setLoading(true)

        try {
            console.log(loading);
            const uploadedFile = await uploadFile(file);
            setLoading(false)
            
            console.log(uploadedFile);
            if (uploadedFile) {
                console.log('file is uploaded');
                setBaseImage(uploadedFile.$id);
                toast.success('File uploaded successfully');
            } else {
                toast.error("Please select a file");
            }

            setBaseImage(uploadedFile.$id);


        } catch (error) {
            console.error("Error uploading file:", error);

        }
    }

    const onPostsubmit = async (data) => {

        console.log(loading);
        console.log(baseImage);

        if (baseImage) {

            try {
                const newPost = await createPost({
                    imageId: baseImage,
                    title: data?.title,
                    desc: data?.desc,
                    name: user?.name,
                    username: user?.username,
                    userId: user?.id
                })

                if (!newPost) {
                    toast.error("Please try again")
                }
            } catch (error) {
                console.log(error);
            }

        }

        else {
            toast.error("File was not uploaded")
            return;
        }
        toast.success("Uploaded succesfully")
        navigate('/')
    }

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageUrl = e.target.result;
            setImageUrl(imageUrl)

        };

        reader.readAsDataURL(file);
    }

    return (

        <div className='flex flex-col  items-center justify-center gap-3 max-w-[1600px] py-10 '>

            <h1 className='text-2xl font-semibold'>Create a new post</h1>

            <div className='flex flex-col items-center gap-2'>

                <p>image selected:</p>
                <div className='max-w-[30rem] m-4'>
                        <img src={imageUrl} className='py-4 rounded-[3rem]' alt="" />
                </div>
            
            </div>

            <form className='flex flex-col items-center gap-2 border-solid border-2 border-[#7E30E1] py-6 max-w-[95%] ' onSubmit={handleSubmit(onPostsubmit)}>

                <div className='flex flex-col gap-2 w-[80%]'>

                    <input className="bg-[#f1eaff] px-8 py-4 rounded-3xl"
                        type="text"
                        placeholder="Add Title"
                        {...register("title")}
                    />
                    <p className="text-red-500">{errors.title?.message}</p>



                    <textarea className="bg-[#f1eaff] px-8 py-4 flex  items-center gap-4 rounded-3xl"
                        type="textarea"
                        placeholder="Description..."
                        {...register("desc")}

                    />
                    <p className="text-red-500">{errors.firstName?.message}</p>

                </div>


                <div className='flex items-center gap-4 my-3 p-2   w-[80%]'>
                    <label>Add image:</label>
                    <input type="file" name="img" accept="image/*"
                        {...register("file")} multiple onChange={(e) => {
                            handleImageChange(e);
                        }} />
                    <p className="text-red-500">{errors.file?.message}</p>
                </div>
 
                {loading ? (
        <p>Wait, file is being uploaded...</p>
      ) : (
        <p></p>
      )}

                <input type="submit" className='bg-[#9d4edd] text-white font-semibold py-2 px-6  rounded-[3rem] text-md' />
            </form>
        </div>
    )
}

export default PostForm
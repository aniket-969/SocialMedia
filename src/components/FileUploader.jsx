import React from 'react'
import { useCallback, useState } from "react";
import {  useDropzone } from "react-dropzone";


const FileUploader = () => {

    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState();
  
    const onDrop = useCallback(
      (acceptedFiles) => {
        setFile(acceptedFiles);
        // fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]));
        console.log(fileUrl);
      },
      [file]
    );
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpeg", ".jpg"],
      },
    });

  return (
    <div
  {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? ( 
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <img
            src="https://img.freepik.com/free-vector/upload-concept-illustration_114360-1317.jpg?w=740&t=st=1702044289~exp=1702044889~hmac=a26d715139a1c8178c1338e6340e7b735324b8bc52e858dbc8323814199233a6"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <button type="button" className="shad-button_dark_4">
            Select from computer
          </button>
        </div>
      )}
    </div>
  )
}

export default FileUploader
"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const UploadImages = (props) => {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(info) => {
        console.log("Image uploaded successfully:", info.info.secure_url);
        props.setImageFiles((prev) => [...prev, info.info.secure_url]);
      }}
    >
      {({ open }) => <button onClick={() => open()}>Upload Image</button>}
    </CldUploadWidget>
  );
};

export default UploadImages;

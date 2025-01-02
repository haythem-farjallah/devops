import { ErrorMessage } from "formik";
import React, { useState } from "react";
function ImageField({ setFieldValue, name, label, restImg, setRestImg }) {
  const [image, setImage] = useState(null);
  return (
    <div className={`flex flex-col gap-2 relative`}>
      <label className="text-gray-500 capitalize  text-lg ">{label}</label>
      <label
        className="flex flex-col gap-2 justify-center cursor-pointer items-center border-2 border-dashed border-gray-300 p-1 h-24 "
        htmlFor={name}>
        {image && !restImg ? (
          <div className=" border-2 border-gray-400">
            <img src={image} className="h-20 w-60 object-cover  " alt="img" />
          </div>
        ) : (
          <i className={`fa-regular fa-image text-2xl `}></i>
        )}
        {image && !restImg ? image.name : "No Image Selected"}
      </label>
      <input
        className="d-none"
        type="file"
        name={name}
        id={name}
        onChange={(event) => {
          setRestImg(false);
          setImage(URL.createObjectURL(event.target.files[0]));
          setFieldValue(name, event.currentTarget.files[0]); // Dosyayı setFieldValue ile ayarlayın
        }}
      />
      <ErrorMessage
        className="text-red-500 text-sm p-0 absolute -bottom-5 right-0"
        name={name}
        component="div"
      />
    </div>
  );
}

export default ImageField;

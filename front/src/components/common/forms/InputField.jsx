import React from "react";
import { Field, ErrorMessage, useField } from "formik";
function InputField({ label, ...input }) {
  return (
    <div className={` w-full flex flex-col  space-y-2 relative`}>
      <label className="text-gray-500 capitalize  text-lg " htmlFor={input.id}>
        {label}
      </label>
      <Field
        className="w-full border  bg-primary border-gray-400 rounded-sm p-3 "
        {...input}
      />
      <ErrorMessage
        className="text-red-500 text-sm p-0 absolute -bottom-5 right-0"
        name={input.name}
        component="div"
      />
    </div>
  );
}

export default InputField;

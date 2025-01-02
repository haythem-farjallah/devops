import React from "react";
import { Field, ErrorMessage, useField } from "formik";
function InputFieldV({ label, ...input }) {
  return (
    <div className={` w-full flex flex-col  space-y-2 relative`}>
      <Field
        className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
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

export default InputFieldV;

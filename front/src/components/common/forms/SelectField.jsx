import MultiSelect from "../../../utils/multiSelectFun";
import { Field, ErrorMessage, useField } from "formik";

function SelectField({ ...props }) {
  const meta = useField("category");
  // console.log(meta);
  return (
    <div className={` w-full flex flex-col space-y-3 relative`}>
      <label className="text-gray-500 capitalize text-lg" htmlFor={props.id}>
        {props.label}
      </label>
      <Field
        className="w-full border   bg-primary border-gray-400 rounded-sm p-3 "
        {...props}
        component={MultiSelect}></Field>
      <ErrorMessage
        className="text-red-500 text-sm p-0 absolute -bottom-5 right-0"
        name={props.name}
        component="div"
      />
    </div>
  );
}

export default SelectField;

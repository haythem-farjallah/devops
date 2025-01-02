import MultiSelect from "../../../utils/multiSelectFun";
import { Field, ErrorMessage, useField } from "formik";
import Select from "react-select";

function SelectFieldSimple({ setCategory, ...props }) {
  return (
    <div className={` w-full flex flex-col space-y-3 relative`}>
      <label className="text-gray-500 capitalize text-lg" htmlFor={props.id}>
        {props.label}
      </label>
      <Select
        options={props.options}
        name={props.name}
        value={
          props.options
            ? props.options.find((option) => option.value === props.value)
            : ""
        }
        onChange={(option) => {
          setCategory(option.value);
          return props.setFieldValue(props.name, option.value);
        }}
        placeholder={props.placeholder}
      />

      {/* <Field
        className="w-full border  border-gray-300 rounded-sm p-3 "
        {...props}
        component={MultiSelect}></Field> */}
      <ErrorMessage
        className="text-red-500 text-sm p-0 absolute -bottom-5 right-0"
        name={props.name}
        component="div"
      />
    </div>
  );
}

export default SelectFieldSimple;

import MultiSelect from "../../../utils/multiSelectFun";
import { Field, ErrorMessage, useField } from "formik";

function SelectFieldV({ ...props }) {
  const meta = useField("category");
  // console.log(meta);
  return (
    <div className={` w-full flex flex-col space-y-3 relative`}>
      <Field
        className="w-full border  border-gray-300 rounded-lg p-3 focus:outline-none  "
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

export default SelectFieldV;

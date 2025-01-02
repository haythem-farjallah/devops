import React from "react";
import { Select, Option } from "@material-tailwind/react";

function Dropdown({ data, setState, label }) {
  const onChange = (event) => {
    setState(event);
  };
  return (
    <div className="h-11 w-44 ">
      <Select className="h-11 " onChange={onChange} size="lg" label={label}>
        {data?.map((op) => (
          <Option key={op.value} value={op.value}>
            {op.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;

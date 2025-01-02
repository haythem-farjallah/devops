import { Button } from "@material-tailwind/react";
import React from "react";

function Buttons({ onClickFun, type, variant, text }) {
  return (
    <Button
      className={
        variant == "filled"
          ? "bg-red-400"
          : "" +
            "h-14  flex justify-center items-center hover:shadow-lg  w-full "
      }
      onClick={() => onClickFun()}
      variant={variant}
      type={type}>
      {text}
    </Button>
  );
}

export default Buttons;

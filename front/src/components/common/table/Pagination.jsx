import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination({ nbPages, selectPage }) {
  const [active, setActive] = React.useState(0);
  let i = 0;
  const pages = Array.from(Array(nbPages), () => i++);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "red",
    onClick: () => {
      setActive(index);
      selectPage(index);
    },
  });

  const next = () => {
    if (active === nbPages - 1) return;
    selectPage(active + 1);
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 0) return;
    selectPage(active - 1);
    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 0}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {nbPages &&
          pages.map((page) => (
            <IconButton key={page} {...getItemProps(page)}>
              {page + 1}
            </IconButton>
          ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === nbPages - 1}>
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

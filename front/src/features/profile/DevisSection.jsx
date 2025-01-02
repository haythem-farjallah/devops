import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import AccordionDevis from "../../features/devis/AccordionDevis";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";
import Pagination from "../../components/common/table/Pagination";
import Dropdown from "../../components/common/dropdown/Dropdown";
import AccordionDevisProfile from "./AccordionDevisProfile";
import { useUser } from "../../hooks/useUser";

function DevisSection(props) {
  const { user } = useUser();
  let { handleModal } = useContext(ModalContext);
  const [open, setOpen] = useState(0);
  const [status, setStatus] = useState(null);
  const [deviss, setDeviss] = useState([]);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  console.log(status);
  const { data, selectPage, page, fetchDataWithParams, refetch } =
    usePaginatedData(5, "/devis?user=" + user?._id, "getdeviss" + user?._id);
  console.log(deviss);
  useEffect(() => {
    fetchDataWithParams(`/devis/?${status ? "status=" + status : ""}`).then(
      (data) => {
        console.log(deviss);
        setDeviss(data);
      }
    );
  }, [status, page]);

  return (
    <div className="flex flex-col gap-2   ">
      <div className=" bg-white w-full  p-8 flex flex-col justify-between shadow-md ">
        <div>
          {" "}
          <div className="flex justify-end pb-4 pr-4">
            <Dropdown
              data={[
                { label: "All", value: null },
                { label: "Pending", value: "Pending" },
                { label: "Completed", value: "Completed" },
                { label: "Ordered", value: "Ordered" },
              ]}
              setState={setStatus}
              label="Status"
            />
          </div>
          <div className="h-[45vh] overflow-auto">
            {deviss &&
              deviss?.data?.map((devis, index) => (
                <AccordionDevisProfile
                  key={index}
                  open={open}
                  handleOpen={handleOpen}
                  index={index + 1}
                  devis={devis}
                  refetch={refetch}
                />
              ))}
          </div>
          <div className="w-full flex justify-end mt-4 pb-4">
            <Pagination
              selectPage={selectPage}
              nbPages={deviss?.paginationResult?.numberOfPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevisSection;

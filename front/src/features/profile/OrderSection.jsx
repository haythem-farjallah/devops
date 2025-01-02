import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";
import Pagination from "../../components/common/table/Pagination";
import Dropdown from "../../components/common/dropdown/Dropdown";
import AccordionOrderProfile from "./AccordionOrderProfile";
import { useUser } from "../../hooks/useUser";
function OrderSection(props) {
  const { user } = useUser();
  const [open, setOpen] = useState(0);
  const [isPaid, setIspaid] = useState(null);
  const [isDelivered, setIsDelivered] = useState(null);
  const [orders, setOrders] = useState([]);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { selectPage, page, fetchDataWithParams, refetch } = usePaginatedData(
    5,
    "/order?user=" + user?._id,
    "getordersUser" + user?._id
  );
  useEffect(() => {
    fetchDataWithParams(
      `/order/?${isPaid != null ? "isPaid=" + isPaid : ""}${
        isDelivered != null ? "&isDelivered=" + isDelivered : ""
      }`
    ).then((data) => {
      setOrders(data);
    });
  }, [isPaid, isDelivered, page]);
  return (
    <div className="flex flex-col gap-2  -my-6 ">
      <div className=" bg-white w-full  p-8 flex flex-col justify-between shadow-md ">
        <div>
          {" "}
          <div className="flex justify-end space-x-8 pb-4 pr-4">
            <Dropdown
              data={[
                { label: "All", value: null },
                { label: "yes", value: true },
                { label: "no", value: false },
              ]}
              setState={setIsDelivered}
              label="isDelivred"
            />
            <Dropdown
              data={[
                { label: "All", value: null },
                { label: "yes", value: true },

                { label: "no", value: false },
              ]}
              setState={setIspaid}
              label="isPaid"
            />
          </div>
          <div className="h-[49vh] overflow-auto">
            {orders &&
              orders?.data?.map((order, index) => (
                <AccordionOrderProfile
                  key={index}
                  open={open}
                  handleOpen={handleOpen}
                  index={index + 1}
                  order={order}
                />
              ))}
          </div>
          <div className="w-full flex justify-end mt-4 pb-4  ">
            <Pagination
              selectPage={selectPage}
              nbPages={orders?.paginationResult?.numberOfPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSection;

import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import UpdateProfileSection from "./UpdateProfileSection";
import UpdateAdressSection from "./UpdateAdressSection";
import OrderSection from "./OrderSection";
import DevisSection from "./DevisSection";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export default function UpdateSection() {
  let { tabs } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeTab, setActiveTab] = React.useState(tabs);
  let data = [];
  if (user.role === "admin")
    data = [
      {
        label: "Profile",
        value: "Profile",
      },
      {
        label: "Adress",
        value: "Adress",
      },
    ];
  else
    data = [
      {
        label: "Profile",
        value: "Profile",
      },
      {
        label: "Adress",
        value: "Adress",
      },
      {
        label: "Order",
        value: "Order",
      },
      {
        label: "Devis",
        value: "Devis",
      },
    ];

  return (
    <div className="col-span-3 bg-white p-4 shadow-md">
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b  w-full grid grid-cols-4 border-blue-gray-50 bg-transparent p-0 "
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}>
          {data.map(({ label, value }) => (
            <button
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value);
                if (user.role === "admin") {
                  navigate("/admin/profile/" + value);
                } else navigate("/profile/" + value);
              }}
              className={`  p-2  focus:outline-none duration-1000 ${
                activeTab === value ? "   bg-gray-900 text-white " : "border  "
              }`}>
              {label}
            </button>
          ))}
        </TabsHeader>
        <TabsBody>
          <div className=" pt-8  ">
            {activeTab === "Profile" ? (
              <UpdateProfileSection />
            ) : activeTab === "Adress" ? (
              <UpdateAdressSection />
            ) : activeTab === "Order" ? (
              <OrderSection />
            ) : (
              <DevisSection />
            )}
          </div>
        </TabsBody>
      </Tabs>
    </div>
  );
}

import { Avatar } from "@material-tailwind/react";
import React from "react";
import { useUser } from "../../hooks/useUser";

function CardProfile() {
  const { user } = useUser();

  return (
    <div>
      <div className="bg-white overflow-hidden shadow-md border">
        <div className="px-4 py-3 sm:px-6 flex justify-center">
          <Avatar
            className="w-48 h-48 border"
            src={
              user.profileImg
                ? "http://localhost:8000/users/" + user.profileImg
                : "https://img.freepik.com/free-icon/user_318-159711.jpg"
            }
            alt="avatar"
          />
        </div>
        <div className="border-t border-gray-200 px-4 pb-4  sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-3">
              <dt className="text-xs font-medium text-gray-500 sm:col-span-2 ">
                Full name
              </dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-3">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-3">
              <dt className="text-xs font-medium text-gray-500 sm:col-span-2">
                Email address
              </dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-3">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-3">
              <dt className="text-xs font-medium text-gray-500 sm:col-span-2">
                Phone number
              </dt>
              <dd className="mt-1 text-xs text-gray-900 sm:mt-0 sm:col-span-3">
                +216 {user?.phone}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      ;
    </div>
  );
}

export default CardProfile;

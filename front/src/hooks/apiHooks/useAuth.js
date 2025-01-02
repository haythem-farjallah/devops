import { useState } from "react";

import { useUser } from "../useUser";
import { useQuery } from "react-query";
import baseUrl from "../../api/baseURL";
import toast from "react-hot-toast";

const useAuth = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { saveUser } = useUser();
  const authCall = async (data) => {
    setIsLoading(true);
    return await baseUrl
      .post(url, data)
      .then((res) => {
        setIsLoading(false);
        // console.log(res.data.data);

        saveUser(res.data.data);
        toast.success("! CONNECTED");
        return res.data.data;
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message);
        return error.response.data.message;
      });
  };

  return { data, isLoading, error, authCall };
};

const useLoggedUser = (url) => {
  const { data, ...rest } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: () => getLoggedUser(),
  });
  const getLoggedUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await baseUrl.get("/users/getMe", config);
    return res.data;
  };
  return { data, ...rest };
};

const useCartUser = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["CartUser"],
    queryFn: () => getCartUser(),
  });
  const getCartUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    return baseUrl.get("/cart/", config).then((res) => {
      console.log(res);
      return res.data;
    });
  };
  return { data, ...rest, getCartUser };
};

export { useAuth, useLoggedUser, useCartUser };

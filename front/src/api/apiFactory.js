import baseUrl from "./baseURL";
export const addApi = async (url, data, conf) => {
  let config = {};
  console.log(data);
  if (conf.token) {
    config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }
  if (conf.token && conf.formData) {
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  return await baseUrl.post(url, data, config);
};

export const deleteApi = async (url, id, conf) => {
  let config = {};
  if (conf.token) {
    config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }
  if (conf.token && conf.formData) {
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  return await baseUrl.delete(url + id, config);
};

export const updateApi = async (url, id, data, conf) => {
  console.log(id);
  let config = {};
  if (conf.token) {
    config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }
  if (conf.token && conf.formData) {
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  return await baseUrl.put(url + id, data, config);
};

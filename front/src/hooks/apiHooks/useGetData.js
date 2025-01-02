import { useState, useEffect } from "react";
import baseUrl from "../../api/baseURL";
// import { useLocalStorage } from "../useLocalStorage";
import { useQuery } from "react-query";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZhM2JlNzVmNTFlMjQyZDdiYzVmZmUiLCJpYXQiOjE3MTE5MzI4MDEsImV4cCI6MTcxNzExNjgwMX0.y_If-ApXoXsFghI81MFt6FC-dOtfe9IeSz-DLgiRix0";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

function useGetData(apiEndpoint, key, limit) {
  const [page, setPage] = useState(0);
  const { data, isFetching, isSuccess, ...rest } = useQuery(
    [key, limit],
    () => fetchData(apiEndpoint, page, limit),
    { keepPreviousData: true }
  );

  function fetchData(url, page) {
    return baseUrl
      .get(`${url}?page=${page}&size=${limit}`, config)
      .then((res) => res.data);
  }

  function loadMore() {
    return baseUrl
      .get(`${apiEndpoint}?page=${page}&size=${limit}`, config)
      .then((res) => res.data);
  }

  function selectPage(page) {
    setPage(page);
  }

  return { data, isFetching, selectPage, isSuccess, loadMore, ...rest };
}

function useGetSpecificData(apiEndpoint, id) {
  const { data, isFetching, isSuccess, ...rest } = useQuery(
    ["dataSepecific", id],
    () => fetchData(apiEndpoint, id),
    { keepPreviousData: true }
  );

  function fetchData(url, id) {
    return baseUrl.get(`${url + id}`, config).then((res) => res.data);
  }

  return { data, isFetching, isSuccess, ...rest };
}

function usePaginatedData(limit, apiEndpoint, key) {
  const [page, setPage] = useState(0);
  const { data, isFetching, isSuccess, ...rest } = useQuery(
    [key, page],
    () => fetchData(apiEndpoint, page),
    { keepPreviousData: true }
  );

  function fetchData(url, page) {
    return baseUrl
      .get(`${url}?page=${page}&size=${limit}`, config)
      .then((res) => res.data);
  }

  function fetchDataWithParams(url) {
    return baseUrl
      .get(`${url}&page=${page}&size=${limit}`, config)
      .then((res) => res.data);
  }

  function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  function selectPage(page) {
    setPage(page);
  }

  return {
    data,
    isFetching,
    selectPage,
    isSuccess,
    loadMore,
    page,
    fetchDataWithParams,
    fetchData,
    ...rest,
  };
}

function usePaginatedDataWithParams(limit, apiEndpoint, key) {
  const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess, ...rest } = useQuery(
    [key, page],
    () => fetchDataWithParams(apiEndpoint),
    { keepPreviousData: true }
  );

  function fetchData(url, page) {
    return baseUrl
      .get(`${url}?page=${page}&isDeleted=${false}&limit=${limit}`, config)
      .then((res) => res.data);
  }

  function fetchDataWithParams(url) {
    return baseUrl
      .get(`${url}&page=${page}&isDeleted=${false}&limit=${limit}`, config)
      .then((res) => res.data);
  }

  function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  function selectPage(page) {
    setPage(page);
  }

  return {
    data,
    isFetching,
    selectPage,
    isSuccess,
    loadMore,
    page,
    fetchDataWithParams,
    fetchData,
    ...rest,
  };
}

export {
  usePaginatedData,
  useGetData,
  usePaginatedDataWithParams,
  useGetSpecificData,
};

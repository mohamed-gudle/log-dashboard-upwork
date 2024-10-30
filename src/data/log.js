import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import axios, { fetcher, endpoints } from "@/utils/axios";

// ----------------------------------------------------------------------

const LOG_ENDPOINTS = {
  IMMI: "/workflows/immi",
  bridging: "/workflows/bridging",
  jotform: "/workflows/jotform",
  s56: "/workflows/s56",
};

// ----------------------------------------------------------------------

export function useGetLog(logType, date = new Date()) {
  date = date.toISOString();
  console.log(date);
  const { data, isLoading, error, isValidating } = useSWR(
    `LOG_ENDPOINTS[logType]/${date}`,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(() => {
    return {
      data,
      isLoading,
      error,
      isValidating,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export async function getLog(url, { arg }) {
  const { logType, date } = arg;

  console.log("getLog", logType, date);
  const dateString = date.toISOString();
  const response = await axios.get(`${LOG_ENDPOINTS[logType]}/${dateString}`);
  return response.data;
}

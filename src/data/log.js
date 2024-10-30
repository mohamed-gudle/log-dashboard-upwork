import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import axios, { fetcher, endpoints } from "src/utils/axios";

// ----------------------------------------------------------------------

const LOG_ENDPOINTS = {
  IMMI: "/workflows/immi",
  bridging: "/workflows/bridging",
  jotform: "/workflows/jotform",
  s56: "/workflows/s56",
};

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
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

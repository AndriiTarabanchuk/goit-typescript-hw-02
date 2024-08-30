import axios, { AxiosResponse } from "axios";

interface FetchParams {
  url: string;
  query: string;
  page?: number;
  per_page?: number;
}

async function fetchData<T>({
  url,
  query,
  page = 1,
  per_page = 12,
}: FetchParams): Promise<T> {
  const response: AxiosResponse<T> = await axios.get(url, {
    params: {
      query,
      page,
      per_page,
      orientation: "landscape",
    },
  });
  return response.data;
}

export { fetchData };

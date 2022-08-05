import { axiosInstance } from "./axios";

import { ReqFilmDB } from "../utils/interface";

export async function getMovie(page: number): Promise<ReqFilmDB> {
  console.log(page, "page");
  return await axiosInstance.get("movie/popular", {
    params: {
      api_key: "421054674fdb1413188d76322979a951",
      page,
      language: "en-US",
    },
  });
}

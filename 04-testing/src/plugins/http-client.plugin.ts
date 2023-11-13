import axios from "axios";

export const httpClientPlugin = {

  get: async (url: string) => {
    const { data } = await axios.get(url);
    return data
  },
  post: async (url: string, body: unknown) => {},
  put: async (url: string, body: unknown) => {},
  delete: async (url: string) => {},
   
};

import axios from "axios";
export const getNews = async (page: number) =>
  await axios.get(`http://testv2.vietamedical.com:8090/api/News?page=${page}`);

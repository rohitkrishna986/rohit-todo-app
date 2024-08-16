import { HOST } from "@/utils/constant.js";
import axios from "axios";

const apiClient = axios.create({
  baseURL: HOST,
});

export default apiClient;

// const instance = axios.create({
//   baseURL: "https://maps.googleapis.com/maps/api/place/textsearch",
// headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// },
// });
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.36:3003",
  // baseURL: " https://api.thecoffeehouse.com/api/v5/stores",
  timeout: 1000,
});
// https://api.thecoffeehouse.com/api/v5/stores/all-pickup
export const getList = (params) => instance.get("/product", params);

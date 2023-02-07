import axios from "axios";
import { config } from "./config";

export const stockControl = async (id, num) => {
  try {
    let number = num;
    let value = { number };
    await axios.post(`${config.api}/stock/${id}`, value);
  } catch (error) {
    alert("Error");
  }
};

import axios from "axios";

export default axios.create({
  baseURL: "https://api.sampleapis.com/coffee",
  headers: {
    "Content-type": "application/json"
  }
});
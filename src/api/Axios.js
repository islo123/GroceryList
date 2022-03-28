import axios from "axios";
  export const api = axios.create({
    baseURL: "https://grocery-list27.herokuapp.com/list"
    // baseURL: "http://localhost:3001/list"
  })


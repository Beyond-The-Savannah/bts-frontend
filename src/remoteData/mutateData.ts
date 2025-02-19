import axios from "axios"

const baseUrl = "https://efmsapi.azurewebsites.net";
// const baseUrl = "https://efmsapi-staging.azurewebsites.net";



export  const axiosInstance= axios.create({
  baseURL:baseUrl
})


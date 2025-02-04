import axios from "axios"

const baseUrl = "https://efmsapi.azurewebsites.net";



export  const axiosInstance= axios.create({
  baseURL:baseUrl
})


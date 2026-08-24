import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_DB_BASE_URL as string;
// const baseUrl = "https://efms.beyondthesavannah.co.ke";
// const baseUrl = "https://efmsapi.azurewebsites.net";
// const baseUrl = "https://efmsapi-staging.azurewebsites.net";



export  const axiosInstance= axios.create({
  baseURL:baseUrl
})


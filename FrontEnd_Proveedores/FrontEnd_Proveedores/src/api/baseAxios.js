import axios from 'axios';

export const supplierAPI = axios.create({
    baseURL: `https://localhost:7014/api/`
})

export const scrapeAPI = axios.create({
    baseURL: `http://localhost:3000/api/`
})


import axios from 'axios';

export const supplierAPI = axios.create({
    baseURL: `http://localhost:5171/api/`
})

export const scrapeAPI = axios.create({
    baseURL: `http://localhost:3000/api/`
})


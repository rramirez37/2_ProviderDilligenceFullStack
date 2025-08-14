import { supplierAPI } from "./baseAxios";

export async function login(userCredentials) {
  try {
    let {data} = await supplierAPI.post('User/Login',userCredentials)
    if (!data.success) return null
    else return data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
import { supplierAPI } from "./baseAxios";

export async function getCountries(token) {
  try {
    let { data } = await supplierAPI.get("Country", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    if (!data.success) return [];
    else return data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

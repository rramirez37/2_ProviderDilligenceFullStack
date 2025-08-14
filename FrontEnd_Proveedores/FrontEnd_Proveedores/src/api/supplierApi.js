import { supplierAPI } from "./baseAxios";

export async function getAllSuppliers(token) {
  try {
    let { data } = await supplierAPI.get("Suppliers", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!data.success) return [];
    else return data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

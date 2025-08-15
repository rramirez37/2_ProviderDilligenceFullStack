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

export async function createSupplier(supplier,token) {
  try{
    let {data} = await supplierAPI.post('Suppliers', supplier, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    console.log(data)
    if (!data.success) return {};
    else return data.result;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export async function updateSupplier(id,supplier,token) {
  try {
    let {data} = await supplierAPI.put(`Suppliers/${id}`, supplier, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    console.log(data)
    if (!data.success) return {};
    else return data.result;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export async function deleteSupplier(id,token) {
  try {
    let {data} = await supplierAPI.delete(`Suppliers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    console.log(data)
    return data.success;
  } catch (error) {
    return false;
  }
}
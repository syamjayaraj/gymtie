export const listPayments = async () => {
    const token = localStorage?.getItem("userToken")
    let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}payments/list`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "GET"
    });
    res = await res.json();
    return res
};

export const addPayment = async (params) => {
  const token = localStorage?.getItem("userToken")
  let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}payments`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    method: "POST",
    body: JSON.stringify(params),
  });
  res = await res.json();
  return res
};

export const updatePayment = async (params) => {
  const token = localStorage?.getItem("userToken")
  let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}payments/${params?._id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    method: "PUT",
    body: JSON.stringify(params),
  });
  res = await res.json();
  return res
};

export const deletePayment = async (memberId) => {
    const token = localStorage?.getItem("userToken")
    let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}payments/${memberId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "DELETE"
    });
    res = await res.json();
    return res as any
};
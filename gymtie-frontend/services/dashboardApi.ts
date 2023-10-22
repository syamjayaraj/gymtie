export const getDashboardDetails = async () => {
  const token = localStorage?.getItem("userToken");
  let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}dashboard/stats`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    method: "GET",
  });
  res = await res.json();
  return res;
};

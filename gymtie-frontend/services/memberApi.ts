export const listMembers = async () => {
  const token = localStorage?.getItem("userToken");
  let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}members/list`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    method: "GET",
  });
  res = await res.json();
  return res;
};

export const addMember = async (params) => {
  const token = localStorage?.getItem("userToken");
  let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}members`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    method: "POST",
    body: JSON.stringify(params),
  });
  res = await res.json();
  return res;
};

export const getMemberDetails = async (userId) => {
  console.log(userId, "user");
  const token = localStorage?.getItem("userToken");
  let res = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}members/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      method: "GET",
    }
  );
  res = await res.json();
  return res;
};

export const updateMember = async (params) => {
  const token = localStorage?.getItem("userToken");
  let res = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}members/${params?._id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      method: "PUT",
      body: JSON.stringify(params),
    }
  );
  res = await res.json();
  return res;
};

export const deleteMember = async (memberId) => {
  const token = localStorage?.getItem("userToken");
  let res = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}members/${memberId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      method: "DELETE",
    }
  );
  res = await res.json();
  return res as any;
};

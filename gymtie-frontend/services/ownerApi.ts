export const submitLoginForm = async (params) => {
    const token = localStorage?.getItem("userToken")
    let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}owners/login`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "POST",
      body: JSON.stringify({
        email: params?.email,
        password: params?.password,
      }),
    });
    res = await res.json();
    return res
};
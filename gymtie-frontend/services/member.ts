export const listMembers = async () => {
    const token = localStorage?.getItem("userToken")
    let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}members/list`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "GET"
    });
    res = await res.json();
    return res
};

export const deleteMember = async (memberId) => {
    const token = localStorage?.getItem("userToken")
    let res = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}members/${memberId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "DELETE"
    });
    res = await res.json();
    return res
};
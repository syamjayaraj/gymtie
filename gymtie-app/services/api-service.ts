import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginDetails } from "../models/model";
import { graphqlUrl } from "../config";
import { loginMutation } from "../mutation";

export const postLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }: ILoginDetails) => {
    try {
      console.log("1");
      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: loginMutation,
          variables: {
            identifier: username,
            password: password,
          },
        }),
      });

      console.log(response);
    } catch (error: any) {
      return error?.response.data;
    }
  }
);

export const fetchMembers = createAsyncThunk(
  "products/fetchMembers",
  async () => {
    const response = await axios.get(
      "https://api.youngmenu.com/api/items?populate=*"
    );
    return response.data;
  }
);

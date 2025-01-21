import axios from "axios";
import { User } from "../slices/userSlice";

// API URL
const API_URL = 'http://localhost:3001/users';

export const fetchUsersApi = async ({
    start,
    limit,
    sortModel = [],
    filterModel = {},
  }: {
    start: number;
    limit: number;
    sortModel?: { colId: string; sort: string }[];
    filterModel?: Record<string, any>;
  }) => {
    // Parse sorting
    const sort = sortModel
      .map((sort) => `${sort.sort === 'asc' ? sort.colId: "-"+sort.colId}`)
      .join(",");
  
    // Parse filtering
    const filters = Object.keys(filterModel)
      .map((key) => {
        const { filter,type } = filterModel[key];
        const filterType = type === "contains" ? "_like" : "";
        return `${key}${filterType}=${filter}`;
      })
      .join("&");
  
    // Construct the query string
    const query = new URLSearchParams({
      _start: start.toString(),
      _limit: limit.toString(),
      ...(sort && { _sort: sort }),
    }).toString();
    console.log(`${API_URL}?${query}`);
      return axios.get(`${API_URL}?${filters}&${query}`);
  };
  

export const addUserApi = (newUser:User) =>{
    return axios.post(API_URL, newUser);
}

export const updateUserApi = (updatedUser:User) =>{
    return axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
}

export const deleteUserApi = (id:string) =>{
    return axios.delete(`${API_URL}/${id}`);
}        
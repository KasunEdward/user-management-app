import axios from "axios";
// API URL
const API_URL = 'http://localhost:3002/stats';

export const fetchStatsApi = async () => {
    return axios.get(`${API_URL}`);
  };
  
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Fetch transactions along with statistics and bar chart data
export const fetchTransactionsWithStats = (month, search, page = 1, perPage = 5) => {
  return axios.get(`${API_URL}/transactions-with-stats`, {
    params: { month, search, page, perPage },
  });
};
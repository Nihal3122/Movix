import axios from "axios";

const Base_URl = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTZhZjNjMTQ1MTUxZDFmZTJiN2Y0NTNjNDZjN2MzMCIsInN1YiI6IjY1Nzg0MWM0MmRjOWRjMDBjNmY2MGFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LKxkgU3-V5al4zODGEzYSyofX7dnshGSw0cHUNs7U7w"

const headers = {
  Authorization: "Bearer  " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(Base_URl + url, {
      headers,
      params,
    })
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration , getGeners } from "./store/homeSlice";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Explore from "./pages/explore/Explore";
import Detail from "./pages/details/Detail";
import PagenotFound from "./pages/404/PagenotFound";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    generacall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      })
      .catch((error) => {
        console.error("api not wirking" + error);
      });
  };

  const generacall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allgeners = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => allgeners[item.id] = item);
    });
    dispatch(getGeners(allgeners))
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="/search/:query/" element={<SearchResult />} />
        <Route path="/explore/:mediaType/" element={<Explore />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

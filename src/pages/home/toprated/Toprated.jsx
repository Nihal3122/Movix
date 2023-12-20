import React,{useState} from "react";
import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import Switchtab from "../../../components/switchtab/Switchtab";
import useFetch from '../../../hooks/useFetch'
import Crousel from "../../../components/crousel/Crousel";

function Toprated() {
    const [endpoint , setEndpoint] = useState("movie")
    const { data , loading}  = useFetch(`/${endpoint}/top_rated`) 
    const ontabChange = (tab) => {
            setEndpoint(tab === "Movies" ? "movie" : "tv")
    }

  return (
    <div className="carouselSection">
      
      <ContentWrapper>
        <span className="carouseltitle">Top Rated</span>
        <Switchtab data={["Movies" , "Tv-shows" ]} ontabChange={ontabChange}/>
      </ContentWrapper>
      <Crousel  data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
}

export default Toprated;

import React,{useState} from "react";
import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import Switchtab from "../../../components/switchtab/Switchtab";
import useFetch from '../../../hooks/useFetch'
import Crousel from "../../../components/crousel/Crousel";

function Trending() {
    const [endpoint , setEndpoint] = useState("day")
    const { data , loading}  = useFetch(`/trending/all/${endpoint }`) 
    const ontabChange = (tab) => {
            setEndpoint(tab === "Day" ? "day" : "week")
    }

  return (
    <div className="carouselSection">
      
      <ContentWrapper>
        <span className="carouseltitle">Trending</span>
        <Switchtab data={["Day" , "Week" ]} ontabChange={ontabChange}/>
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading}/>
    </div>
  );
}

export default Trending;

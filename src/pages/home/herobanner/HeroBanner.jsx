import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyloadimg/Img'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper'

function HeroBanner() {

  const navigate = useNavigate()
  const {url} = useSelector((state) => state.home)
  const [background , setBackground] = useState("")
  const [query , setQuery] = useState("")
 
  const {data , loading} = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop +  data?.results[Math.floor(Math.random() * 19)]?.backdrop_path
    setBackground(bg)
  } , [data])

  const searchQueryHandler = (e) => {
      if (e.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`)
      }
  }

  return (
    <div className="herobanner">
     {!loading && <div className="backdropimg">
          <Img
            src={background}
            />
      </div>}
        <div className="opacitylayer">
              
        </div>
      <ContentWrapper>
          <div className="herobannercontent">
            <span className="title">Welcome</span>
            <span className="subtitle">Millions of movies , TV shows and people to discover.
             Explore now</span>
              <div className="serchinput">
                <input 
                type="text"
                placeholder='Serch for a movie or Tx show...'
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button>Search</button>
              </div>
          </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
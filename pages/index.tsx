import { Button, Card, CardItem, Image, SearchBar } from "@/components";
import { getMovieById, getMovieByName } from "./api/movie";
import { FormEvent, useState } from "react";
import _ from "lodash";

type Details = {
  plot: string
}

type Movies = {
  id: string;
  resultType: string;
  image: string;
  title: string;
  description: string;
  details?: Details;
}


export default function Home() {
  const [movie, setMovie] = useState<Movies[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isLoadingDetail, setLoadingDetail] = useState(false)
  const [isMovieEmpty, setMovieEmpty] = useState(false)
  
  const fetchDataByName = async (value:string) => {
    setLoading(true)
    const res = await getMovieByName(value);

    if(res.results.length === 0) {
      setMovieEmpty(true)
    } else {
      setMovieEmpty(false)
    }

    setLoading(false)
    setMovie(res.results);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    fetchDataByName(searchValue)
    e.preventDefault()
  }

  const fetchDataById = async (value:string) => {
    setLoadingDetail(true)
    const cloneMovie = _.cloneDeep(movie)
    const res = await getMovieById(value);
    const filteredMovies = cloneMovie.filter((movie:Movies) => movie.id === res.id)[0]
    filteredMovies.details = res
    setLoadingDetail(false)
    setMovie(cloneMovie)
  };

  const renderStatus = () => {
    if(isLoading) {
      return "Loading..."
    } else if((!isMovieEmpty && !isLoading && movie.length === 0)) {
      return "Your search list will appear here"
    } else if ((!isLoading && isMovieEmpty)) {
      return "Can't find any movies:("
    }
  }

  return (
    <div className="w-full h-full overflow-auto">
      <SearchBar onSubmit={onSubmit} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Find movie by name" />
      {!isLoading && (
        <div className="centered-container">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
            {movie.map((result, index) => {
              return (
                <Card key={index}> 
                  <div className="w-full md:w-[200px] max-w-[100%] h-full">
                    <Image src={result.image} alt="inception"/>
                  </div>
                  <CardItem 
                    title={result.title}
                    description={result.description}
                    isLoading={isLoadingDetail} 
                    details={result.details} 
                    fetchDataById={() => fetchDataById(result.id)} 
                  />
                </Card>
              )
            })}
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <div className="font-xl text-5xl w-full flex items-center justify-center text-gray-300">
          {renderStatus()}
        </div>
      </div>
    </div>
  )
}

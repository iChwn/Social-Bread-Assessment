import { Button, Card, Image, SearchBar } from "@/components";
import { getMovieByName } from "./api/movie";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [movie, setMovie] = useState([])
  const [searchValue, setSearchValue] = useState("")
  
  useEffect(() => {
    console.log("Wwkwkwk")
   
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getMovieByName("inception");
    setMovie(res.data);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(searchValue)
    e.preventDefault();
  }

  return (
    <div className="w-full h-full overflow-auto">
      <SearchBar onSubmit={onSubmit} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Find movie by name" />
      <div className="centered-container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
          <Card> 
            <div className="w-full md:w-[200px] max-w-[100%] h-full">
              <Image src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6800_AL_.jpg" alt="inception"/>
            </div>
            <div className="p-5 md:w-[290px] max-w-[100%] flex flex-col items-start">
              <h1 className="font-bold text-lg">Inception: The Cobol Job</h1>
              {/* <span className="text-gray-500 text-sm mt-2">2010</span> */}
              <Button title="Show Detail" className="mt-3"/>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta error nam sequi vero! Rerum delectus molestias quibusdam odit dignissimos exercitationem doloribus sed nihil nisi! Omnis quasi voluptas dicta id impedit.
              </p> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

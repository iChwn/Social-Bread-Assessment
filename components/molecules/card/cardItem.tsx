import Button from "@/components/atoms/button";
import React, { FC } from "react";

type Details = {
  plot: string
}

type CardItemProps = {
  title: string, 
  description: string, 
  isLoading: boolean, 
  details?: Details, 
  fetchDataById: (event: React.MouseEvent<HTMLButtonElement>) => void, 
}

const CardItem:FC<CardItemProps> = ({title, description, isLoading, details, fetchDataById}) => {
  return (
    <div className="p-5 md:w-[290px] max-w-[100%] flex flex-col items-start">
      <h1 className="font-bold text-lg">{title}</h1>
      <span className="text-gray-500 text-sm mt-2">{description}</span>
      {!details && (<Button isDisabled={isLoading} onClick={fetchDataById} title="Show Detail" className="mt-3"/>)}
      {details && (
        <p className="pt-1">
          {details.plot}
        </p>
      )}
    </div>
  )
}


export default CardItem;
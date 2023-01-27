import React, { FC } from "react";

type CardProps = {
  children: React.ReactNode;
}

const Card:FC<CardProps> = ({children}) => {
  return (
    <div className="relative w-[500px] max-w-[100%] min-h-[300px]">
      <div className="w-full relative h-full border-2 border-black bg-white z-10 flex flex-col md:flex-row">
        {children}
      </div>
      <div className="absolute top-[6px] right-[-6px] w-full h-full z-0 border-2 border-black border-dashed" />
    </div>
  )
}


export default Card;
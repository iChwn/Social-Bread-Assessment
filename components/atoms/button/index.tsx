import React, { FC } from "react";

type ButtonProps = {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button:FC<ButtonProps> = ({title, onClick, className}) => {
  return (
    <button className={`border-2 border-black px-4 py-2 rounded-[2px] relative z-10 bg-white ${className}`} onClick={onClick}>
      {title}
      <div className="absolute top-[6px] right-[-6px] w-full h-full z-0 border-2 border-black border-dashed hover:translate-x-[-6px] hover:translate-y-[-6px] duration-100" />
    </button>
  )
}

export default Button;
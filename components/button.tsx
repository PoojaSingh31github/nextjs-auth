import React from 'react'

type Props = {}

export const Button = (props: Props) => {
  return (
    <button
      className="rounded-md font-bold ring-offset-background  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 e p-2 m-5 bg-white hover:bg-gray-950 transition-all duration-200 ease-in-out hover:ring-gray-900 hover:text-white"
      type="submit"
    >
     Submit 
    </button>
  );
}

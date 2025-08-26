import React from 'react'
import { Link } from 'react-router-dom'

const HomePost = ({image,title,description,id}) => {
  return (
    <Link to={`/blog/${id}`} className="no-underline" id={id}>
    

  <div className=" w-[250px] rounded-lg shadow-xs shadow-black  bg-white dark:bg-gray-800 transition-all ">
      <img
        src={image}
        alt={title}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />
      <div className="p-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className=" h-10 text-gray-600 dark:text-gray-400 text-sm mt-2 overflow-clip">
          {description}
        </p>
      </div>
    </div>
    </Link>
  )
}

export default HomePost
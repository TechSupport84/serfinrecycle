

function Category({id, name, pressed}) {
  return (
    <div className="bg-gray-800 p-2 rounded  text-gray-500 hover:bg-orange-800 hover:underline hover:cursor-pointer" key={id} onClick={pressed}> {name}</div>
  )
}

export default Category
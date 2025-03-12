import { API_URL_IMAGE } from "../constants/API_URL";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { addItems } from "../features/CartSlices";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function Products({ products }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!Array.isArray(products)) {
    console.error("Products data is not an array:", products);
    return <p className="text-red-500 text-center">Invalid products data</p>;
  }

  const addToCart = (product) => {
    dispatch(addItems(product));
    console.log("Added!", product);
    toast.success("Product added successfully!");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 w-full ">
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available</p>
      ) : (
        products.map((item) => (
          <div
            key={item._id}
            className="relative flex flex-col w-full h-[350px] hover:shadow-lg hover:shadow-gray-600 group"
          >
            {item.image && item.image.length > 0 ? (
              <>
                <img
                  src={`${API_URL_IMAGE}/${item.image}`}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-t-lg hover:opacity-85 transition duration-300 ease-in-out"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <span className="border border-gray-500 bg-gray-800 p-1 rounded hover:bg-blue-500">
                    View details
                  </span>
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-center py-5">No Image Available</p>
            )}
            <div className="p-2 bg-gray-800 rounded-b-lg w-full">
              <h1 className="text-lg font-bold text-gray-400">{item.name}</h1>
              <div className="flex flex-col">
                <span className="text-gray-600">
                  <span className="line-through">${item.price}</span>{" "}
                  <span className="text-green-900">${item.price - 2}</span>
                </span>
                <span className="text-blue-500 p-1 rounded">
                  <span className="bg-gray-700 p-1 rounded text-blue-800">90% off</span>{" "}
                  {item.stock} units left
                </span>
                <span className="text-center text-gray-500">
                  Category:{" "}
                  <span className="text-green-400">{item.brand}</span>{" "}
                  <i className="fa fa-crosshairs" aria-hidden="true"></i>
                </span>
                <span className="absolute top-2 right-2 bg-gray-600 p-2 rounded-full hover:bg-gray-800">
                  <BiHeart size={34} color="#fff" />
                </span>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Products;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_URL_IMAGE } from "../constants/API_URL";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addItems } from "../features/CartSlices";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const dispatch = useDispatch()

  const formData = (date) => {
    if (!date) return "Date not available";
    try {
      return format(new Date(date), "PPpp");
    } catch (error) {
      console.error("Invalid date format:", error);
      return "Invalid date";
    }
  };

  const handleAddQuantity = () => setAddedQuantity((prev) => prev + 1);
  const handleDecrease = () => setAddedQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/byId/${id}`);
        setProduct(response.data.product);
        if (response.data.product?.image?.length > 0) {
          setMainImage(response.data.product.image[0]); // Set the first image as the main image
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getSingleProduct();
  }, [id]);

  


  const addToCart = (product) => {
    dispatch(addItems(product));
    console.log("Added!", product);
    toast.success("Product added successfully!");
  };

  return (
    <div className="container mx-auto p-10 mt-10">
      {product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* ✅ Image Section */}
          <div className="flex flex-col items-center">
            {mainImage ? (
              <img
                src={`${API_URL_IMAGE}/${mainImage.replace('/opt/render/project/src/', '')}`}
                alt={product.name || "Product Image"}
                className="w-full max-w-md rounded-lg shadow-lg object-cover"
              />
            ) : (
              <p className="text-gray-500 italic">No Image Available</p>
            )}

            {/* Thumbnail Images */}
            <div className="flex mt-4 space-x-3">
              {Array.isArray(product.image) &&
                product.image.map((img, index) => (
                  <img
                    key={index}
                    src={`${API_URL_IMAGE}/${img.replace('/opt/render/project/src/', '')}`}
                    alt={`Thumbnail ${index}`}
                    className={`w-20 h-20 rounded-md cursor-pointer border-2 ${mainImage === img ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
            </div>
          </div>

          {/* ✅ Product Details */}
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl font-bold text-gray-700">{product.name || "Unknown Product"}</h1>
            {product.description && <p className="text-gray-600">{product.description}</p>}
            <span className="text-green-500">Brand: {product.brand || "Unknown Brand"}</span>
            <span className="text-gray-500">{product.stock > 0 ? `${product.stock} items left` : "Out of Stock"}</span>
            <span className="text-green-600">Published: {formData(product.updatedAt)}</span>

            {/* ✅ Quantity Selector */}
            <div className="flex items-center space-x-2">
              <button onClick={handleDecrease} className="px-3 py-1 bg-gray-800 text-white rounded-md">-</button>
              <span className="text-xl font-semibold text-gray-200">{addedQuantity}</span>
              <button onClick={handleAddQuantity} className="px-3 py-1 bg-gray-800 text-white rounded-md">+</button>
            </div>

            {/* ✅ Add to Cart */}
            <button
              onClick={()=>addToCart(product)}
              className="border border-gray-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-center">No Product Found</div>
      )}
    </div>
  );
}

export default SingleProduct;

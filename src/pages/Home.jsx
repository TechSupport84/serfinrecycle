import { useEffect, useState } from "react";
import NavBar from "../navigation/NavBar";
import Products from "../components/Products";
import { API_URL } from "../constants/API_URL";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { data } from "../constants/data";
import Category from "../components/Category";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/product/products`);
        if (data && Array.isArray(data.product)) {
          setProducts(data.product);
          setFilteredProducts(data.product);
        } else {
          setError("Invalid response format: Expected an array.");
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const filterByCategorie = (categoryName) => {
    if (!categoryName) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(categoryName.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading)
    return (
      <p className="text-blue-500 text-xl text-center">Loading products...</p>
    );
  if (error)
    return <p className="text-red-800 text-2xl text-center">{error}</p>;

  return (
    <div className=" w-full min-h-screen bg-gray-900 mt-10 ">
      <NavBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg mt-4 w-full">
        <div className="flex flex-wrap items-center gap-4">
          <span className="bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-md">
            Category
          </span>
          {data.map((item) => (
            <div key={item.id}>
              <Category
                pressed={() => filterByCategorie(item.name)}
                {...item}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-0">
          <span
            onClick={() => navigate("/exchange")}
            className="cursor-pointer text-orange-500 text-lg font-semibold px-4 py-2 bg-gray-900 rounded-lg shadow-md hover:bg-orange-500 hover:text-white hover:underline"
          >
            Ex-Change
          </span>
        </div>
      </div>
      <div className="w-full mt-10">
        <Products products={filteredProducts} />
      </div>
    </div>
  );
}

export default Home;

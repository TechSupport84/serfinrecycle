import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone, FiMapPin, FiGlobe, FiCamera } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "", country: "" });
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !phone || !address.street || !address.city || !address.state || !address.zip || !address.country) {
      return setError("All fields are required.");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", JSON.stringify(address));
    if (image) {
      formData.append("image", image);
    }

    try {
      await register(formData);
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress({ street: "", city: "", state: "", zip: "", country: "" });
      setImage(null);
      navigate("/Login");
    } catch (err) {
        console.log(err)
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <FiCamera className="text-gray-500 text-2xl" />
              </div>
            )}
          </label>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <InputField icon={<FiUser />} value={username} setValue={setUsername} placeholder="Enter your username" label="Username" />
          <InputField icon={<FiMail />} value={email} setValue={setEmail} placeholder="Enter your email" label="Email" type="email" />
          <InputField icon={<FiPhone />} value={phone} setValue={setPhone} placeholder="Enter your phone number" label="Phone" type="tel" />

          <InputField icon={<FiMapPin />} value={address.street} setValue={(val) => handleAddressChange("street", val)} placeholder="Street" label="Street" />
          <InputField icon={<FiMapPin />} value={address.city} setValue={(val) => handleAddressChange("city", val)} placeholder="City" label="City" />
          <InputField icon={<FiMapPin />} value={address.state} setValue={(val) => handleAddressChange("state", val)} placeholder="State" label="State" />
          <InputField icon={<FiMapPin />} value={address.zip} setValue={(val) => handleAddressChange("zip", val)} placeholder="Zip Code" label="Zip Code" />
          <InputField icon={<FiGlobe />} value={address.country} setValue={(val) => handleAddressChange("country", val)} placeholder="Country" label="Country" />

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border rounded-md p-2 mt-1 relative">
              <FiLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
                placeholder="Enter your password"
                autoComplete="off"
                required
              />
              <button type="button" className="absolute right-3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ icon, value, setValue, placeholder, label, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <div className="flex items-center border rounded-md p-2 mt-1">
      {icon}
      <input type={type} value={value} onChange={(e) => setValue(e.target.value)} className="w-full outline-none" placeholder={placeholder} required />
    </div>
  </div>
);

export default Register;
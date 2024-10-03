import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null); // Initialize as null for better null handling
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [bool, setBool] = useState(false);
  const [bool1, setBool1] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [lenderId, setLenderId] = useState('');
  const navigate = useNavigate(); // For potential redirection

  // Determine borrowerId only if currentUser exists
  const borrowerId = currentUser ? currentUser._id : null;

  // Fetch Item Details
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(`/backend/item/itemdetail/${itemId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch item details");
        }
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItemDetails();
  }, [itemId]);

  // Check Cart Status
  useEffect(() => {
    if (!borrowerId) return; // Exit if borrowerId is not available

    const checkCart = async () => {
      try {
        const res = await fetch(`/backend/item/${borrowerId}/${itemId}`);
        if (!res.ok) {
          throw new Error("Failed to check cart");
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          console.log(data);
          setBool2(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkCart();
  }, [itemId, borrowerId]);

  // Check Request Status
  useEffect(() => {
    if (!borrowerId || !lenderId) return; // Exit if borrowerId or lenderId is not available

    const checkRequest = async () => {
      try {
        const res = await fetch(`/backend/item/${itemId}/${lenderId}/${borrowerId}`);
        if (!res.ok) {
          throw new Error("Failed to check request");
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0].status !== "returnedcheck") {
          setBool1(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkRequest();
  }, [itemId, borrowerId, lenderId]);

  // Check Rent Availability
  useEffect(() => {
    const checkRent = async () => {
      try {
        const res = await fetch(`/backend/item/available/${itemId}`);
        if (!res.ok) {
          throw new Error("Failed to check rent availability");
        }
        const data = await res.json();
        if (data) {
          setBool(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkRent();
  }, [itemId]);

  // Fetch Owner Information
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/backend/item/owner/${itemId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch owner information");
        }
        const data = await res.json();
        console.log(data.ownerId);
        setLenderId(data.ownerId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [itemId]);

  // Handle Rent Request
  const handleRent = async () => {
    if (!borrowerId) {
      alert("You must be logged in to rent an item.");
      return;
    }

    try {
      const res = await fetch('/backend/item/rentitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: itemId,
          lenderId: lenderId,
          borrowerId: borrowerId
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setBool1(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Add to Cart
  const addToCart = async () => {
    if (!borrowerId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const res = await fetch('/backend/item/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: itemId,
          user: borrowerId
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setBool2(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Next Image
  const handleNext = () => {
    if (!item || !item.images || item.images.length === 0) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle Previous Image
  const handlePrev = () => {
    if (!item || !item.images || item.images.length === 0) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };

  // Redirect to login if currentUser is null (Optional)
  useEffect(() => {
    if (currentUser === null) {
      // Uncomment the next line to enable redirection
      // navigate('/login');
    }
  }, [currentUser, navigate]);

  if (item === null) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100 p-6">
      <div className="max-w-7xl w-full h-full bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Slider Section */}
          <div className="lg:w-2/3 w-full relative h-74 overflow-hidden group">
            <div className="relative w-full h-full">
              <img
                src={item[0].images[currentImageIndex]}
                alt={item[0].itemName}
                className="lg:w-3/4 w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105 mx-auto"
              />
              {/* Previous Button */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-700 transition"
                onClick={handlePrev}
                aria-label="Previous Image"
              >
                <FaArrowLeft size={24} />
              </button>
              {/* Next Button */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-700 transition"
                onClick={handleNext}
                aria-label="Next Image"
              >
                <FaArrowRight size={24} />
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/3 w-full p-6 flex flex-col justify-between bg-gray-50">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{item[0].itemName}</h1>
              <p className="text-sm text-gray-600 mb-4">
                Category:{" "}
                <span className="font-semibold text-gray-800">{item[0].category}</span>
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{item[0].description}</p>
              <p className="text-3xl font-semibold text-blue-600 mb-6">${item[0].price}</p>
              <p className="text-sm text-gray-600 mb-4">
                Condition:{" "}
                <span className="font-semibold text-gray-800">{item[0].condition}</span>
              </p>
            </div>

            {/* Action Buttons */}
            {currentUser && currentUser._id !== item.ownerId && (
              <div className="flex space-x-4 mb-6">
                {bool && (
                  <button
                    onClick={handleRent}
                    disabled={bool1}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg transition ${
                      bool1
                        ? "from-blue-400 to-blue-500 cursor-not-allowed"
                        : "hover:from-blue-600 hover:to-blue-800"
                    }`}
                  >
                    {bool1 ? "Requested" : "Request Item"}
                  </button>
                )}
                <button
                  onClick={addToCart}
                  disabled={bool2}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium rounded-lg transition ${
                    bool2
                      ? "from-gray-500 to-gray-700 cursor-not-allowed"
                      : "hover:from-gray-700 hover:to-gray-900"
                  }`}
                >
                  {bool2 ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            )}

            {/* Prompt to Log In */}
            {!currentUser && (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Please log in to interact with this item.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;

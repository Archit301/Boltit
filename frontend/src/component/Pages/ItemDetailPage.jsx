import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
   const [bool,setbool]=useState(false)
   const [bool1,setbool1]=useState(false)
   const [bool2,setbool2]=useState(false)
   const [lenderId, setLenderId] = useState('');
   const borrowerId=currentUser._id
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(`/backend/item/itemdetail/${itemId}`);
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItemDetails();
  }, [itemId]);

  useEffect(()=>{
    const checkcart=async()=>{
      try {
        const res=await fetch(`/backend/item/${borrowerId}/${itemId}`)
        const data=await res.json()
        if (Array.isArray(data) && data.length > 0) {
          console.log(data)
          setbool2(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkcart()
  },[])

  useEffect(()=>{
    const checkRequest=async()=>{
   try {
    const res=await fetch(`/backend/item/${itemId}/${lenderId}/${borrowerId}`)
    const data=await res.json()
    if (Array.isArray(data) && data.length > 0) {
      setbool1(true)
    }
   } catch (error) {
    console.log(error)
   }
    }
    checkRequest();
  },[itemId,borrowerId,lenderId])

  useEffect(()=>{
    const checkrent=async()=>{
try {
  const res=await fetch(`/backend/item/available/${itemId}`)
   const data=await res.json();
   if(data)
   {
    setbool(true)
   }
} catch (error) {
  console.log(error)
}
    }
    checkrent()
  },[itemId])


  
  useEffect(()=>{
    const owner=async()=>{
      try {
    const res=await fetch(`/backend/item/owner/${itemId}`)
     const data=await res.json();
     console.log(data.ownerId)
    setLenderId(data.ownerId)
      } catch (error) {
        console.log(error)
      }
    }
    owner()
  },[itemId])

 const handlerent=async()=>{
  try {
    const res=await fetch('/backend/item/rentitem', {
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
    if(res.ok)
    {
      setbool1(true)
    }
  } catch (error) {
    console.log(error)
  }
 }


 const addcart=async()=>{
  try {
    const res=await fetch('/backend/item/cart', {
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
    if(res.ok)
    {
      setbool2(true)
    }
  } catch (error) {
    console.log(error)
  }
 }


  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item[0].images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item[0].images.length - 1 : prevIndex - 1
    );
  };

  if (!item.length) {
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
            {(currentUser._id != item[0].ownerId)?
            (
            <div className="flex space-x-4 mb-6">
              { bool?(<>
              <button  onClick={handlerent}
                 disabled={bool1}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 transition">
             { bool1?"Requested ":"Request Item"}
              </button>
              </>):('')
}
              <button onClick={addcart}
              disabled={bool2}
              className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium rounded-lg hover:from-gray-700 hover:to-gray-900 focus:ring-2 focus:ring-gray-500 transition">
             {bool2? "Added to cart":"Add to cart"}
              </button>
            </div>) :('')
}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;

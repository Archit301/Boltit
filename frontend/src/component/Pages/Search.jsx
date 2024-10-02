import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Search = () => {
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
  const [tickets, settickets] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const {currentUser}= useSelector((state)=>state.user)
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
  const fetchTickets=async()=>{
    setLoading(true);
    setShowMore(false);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/backend/ticket/get?${searchQuery}`);   
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    settickets(data);
    setLoading(false);
}
fetchTickets()
},[location.search])
  return (
    <div>
      
    </div>
  )
}

export default Search

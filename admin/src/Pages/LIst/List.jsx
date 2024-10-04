import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';


const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.status == 200){
      setList(response.data);
      console.log(response.data);

    } else {
      toast.error(response.data)
    }
  }
    useEffect(()=>{
      fetchList()
    },[])
    const removeFood=async(_id)=>{
      const response=await axios.post(`${url}/api/food/removeFoodItem`,{_id}) 
      if(response.status==200){
        toast.success(response.data)
      }
      else{
        toast.error(response.data)
      }
      
      
      await fetchList()
     
    }
  return (
    <div className='list flex-col' >
      <div className="list-table-wrapper">
      <div className="list-table title">
        <h2>Image</h2>
        <h2>Name</h2>
        <h2>Description</h2>
        <h2>Category</h2>
        <h2>Price</h2>
      </div>
      {list.map((item, index) => {
        return (
          <div key={index} className="list-table item ">
            <img src={`${url}/images/`+item.image} alt="" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <b>${item.price}</b>
            <h3 className='remove' onClick={()=>removeFood(item._id)}>X</h3>
          </div>
         )
      })}
      </div>
    </div>
  )
}

export default List
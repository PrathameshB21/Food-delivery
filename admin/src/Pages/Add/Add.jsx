import React, { useState } from 'react'
import './Add.css'
import { Assets } from '../../assets/assets';

import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "option's",
    price: ""

  })

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const onsubmitHandler = async (event) => {

    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);
    
    const response = await axios.post(`${url}api/food/add`, formData);
    if (response.status==200) {
      setData({
        name: "",
        description: "",
        category: "Option's",
        price: ""

      })
      setImage(false)
      toast.success(response.data)
    } else {
      console.error();


    }


  }
  return (
    <>
      <div className="add">
        <form className='flex-col' onSubmit={onsubmitHandler}>
          <div className="add-imgae-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : Assets.upload} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />

          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onchangeHandler} value={data.name} type="text" name='name' maxLength={14} placeholder='Type Here' />

          </div>
          <duv className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onchangeHandler} value={data.description} name="description" rows={3} maxLength={26} placeholder='Write content here' />


          </duv>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onchangeHandler} value={data.category} name="category" >
                <option value="Salad">Option's</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Desert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>

            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onchangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
            </div>
          </div>
          <div className="add-btn">
          <button type='submit' >Add</button>
          </div>
          
        </form>
      </div>
    </>
  )
}

export default Add
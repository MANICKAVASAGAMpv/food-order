import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

      const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

      const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
      })

      const onChangevalue = (event) =>{
          const name = event.target.name
          const value = event.target.value
          setData(prev => ({...prev,[name]:value}))
      }

     const placeOrder = async(event) =>{
          event.preventDefault()
          let orderItems = []
          food_list.map((item)=>{
              if(cartItems[item._id] > 0){
                let itemInfo = item;
                itemInfo["quantity"]  = cartItems[item._id]
                orderItems.push(itemInfo)
              }
          })
            let orderData = {
              address:data,
              items: orderItems,
              amount:getTotalCartAmount()+2
            }

            let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
            if(response.data.success){
              const {session_url} = response.data;
              window.location.replace(session_url)
            }else{
              alert("Error")
            }

        }

        const navigate = useNavigate()

        useEffect(()=>{
          if(!token){
              navigate("/cart")
          }else if(getTotalCartAmount() === 0){
            navigate('/cart')
          }
        },[token])

  return (
    <form  onSubmit={placeOrder} className='place-order'>
     <div className="place-order-left">
        <p className="title">Delivery Informaton</p>
        <div className='multi-fields'>
          <input required type="text" name="firstName" onChange={onChangevalue} value={data.firstName}placeholder='First name'/>
          <input required type="text" name="lastName" onChange={onChangevalue} value={data.lastName} placeholder='Second name' />
        </div>
        <div>
          <input required type="email" name='email' onChange={onChangevalue} value={data.email} placeholder='Email'/>
          <input required type="text" name='street' onChange={onChangevalue} value={data.street}  placeholder='Street' />
        </div>
        <div className='multi-fields'>
          <input required type="text" name='city' onChange={onChangevalue} value={data.city} placeholder='City'/>
          <input required type="text" name='state' onChange={onChangevalue} value={data.state} placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required type="text"  name='zipcode' onChange={onChangevalue} value={data.zipcode} placeholder='Pin code'/>
          <input required type="text" name='country' onChange={onChangevalue} value={data.country} placeholder='Country' />
        </div>
        <input required type="text" name='phone' onChange={onChangevalue} value={data.phone} placeholder='Phone' />
     </div>
     <div className="place-order-right">
     <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 :getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>Proceed to payment</button>
        </div>
     </div>
    </form>
  )
}

export default PlaceOrder
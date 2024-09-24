import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {

    const[data,setData] = useState([])
    const{url,token} = useContext(StoreContext)

    const fetchData =  async(req,res)=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
        console.log(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchData()
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item,index)=>{
                                    if(index == order.items.length-1 ){
                                        return item.name + " x " + item.quantity
                                    }else{
                                        return item.name+" x "+item.quantity+", "
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items : {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchData}>Track order</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrders
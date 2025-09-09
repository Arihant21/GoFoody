import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const MyOrder = () => {
  const [orderData, setOrderData] = useState(null)

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/myOrderData", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') })
    })
    const response = await res.json()
    console.log("MY ORDER DATA:", response)
    setOrderData(response.orderData)
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {orderData && orderData._id ? (
          <div>
            <h4 className="mb-4">Orders for {orderData.email}</h4>
            <p><strong>Order ID:</strong> {orderData._id}</p>
            <hr />

            {/* Render order_data */}
            {orderData.order_data && orderData.order_data.length > 0 ? (
              orderData.order_data.slice(0).reverse().map((order, idx) => (
                <div key={idx} className="mb-5">
                  {order.map((item, i) =>
                    item.Order_date ? (
                      <div key={`date-${i}`} className="mt-3">
                        <h5>{item.Order_date}</h5>
                        <hr />
                      </div>
                    ) : (
                      <div
                        key={i}
                        className="col-12 col-md-6 col-lg-3 mb-4 d-inline-block"
                      >
                        <div
                          className="card"
                          style={{ width: "16rem", maxHeight: "360px" }}
                        >
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: "120px", objectFit: "fill" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="container w-100 p-0">
                              <span className="m-1">Qty: {item.qty}</span>
                              <span className="m-1">Size: {item.size}</span>
                              <div className="d-inline ms-2 fs-5">
                                ₹{item.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))
            ) : (
              <p>No items found in this order.</p>
            )}
          </div>
        ) : (
          <p className="text-center mt-5">No orders found</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

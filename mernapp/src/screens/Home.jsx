import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
//import { data } from 'react-router-dom'

export const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0], response[1]);

  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div> <Navbar /> </div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>

            <div className='carousel-caption' style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>

            <div className="carousel-item active">
              <img src="/burger image 2.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="burger" />
            </div>
            <div className="carousel-item">
              <img src="/mink-mingle-qZ5lPCPvdXE-unsplash.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="pastry" />
            </div>
            <div className="carousel-item">
              <img src="/barbeque.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="barbeque" />
            </div>
            <div className="carousel-item">
              <img src="/chad-montano-MqT0asuoIcU-unsplash.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="pizza" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>{data.CategoryName}</div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {
                    foodItem.length > 0
                      ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card foodItem={filterItems}
                                options={filterItems.options[0]}
                                ImgSrc={filterItems.img} >
                              </Card>
                            </div>
                          )
                        }
                        ) : <div>No such data found</div>
                  }
                </div>
              )
            }) : <div>'''''</div>
        }
      </div>

      <div> <Footer /> </div>
    </div>
  )
}

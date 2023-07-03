import { Button } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const Content = ({reservations}) => {



  return (
    <main>
        {reservations.length ? (        
            <ul>
                {reservations.map((reservation) => (
                  
                      <li key={reservation.id}>
                          <Link to={`/reservation/${reservation.id}`} >
                              <p>{reservation.agency} - {reservation.consumer} - {reservation.hotel}</p>
                          </Link>
                      </li>
                    ))}
            </ul>) 
            :(<p>Reservation is empty</p>)
        
        }


    </main>
  )
}

export default Content
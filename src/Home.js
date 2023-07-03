import Content from "./Content"
import {Link } from "react-router-dom"

const Home = ({reservations}) => {
    return (
      <main>
          <h2><Link to="/reservation">Create Reservation</Link></h2>
          <h2>Reservation List</h2>
          {reservations.length ? 
                (<Content reservations={reservations}/>) 
                : (<p> No Reservations to display </p>)}
      </main>
    )
  }
  
  export default Home
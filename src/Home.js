import Content from "./Content"
import {Link } from "react-router-dom"

const Home = ({reservations, totalPages, pageNum, setPageNum, pageSize, handleNextPage, handlePreviousPage}) => {
    return (
      <main>
          <h2><Link to="/reservation">Create Reservation</Link></h2>
          <h2>Reservation List</h2>
          {reservations.length ? 
                (
                  <dev>
                    <Content reservations={reservations}/>
                    <p>Total {totalPages} pages; Yon are on page -- {pageNum+1} -- ; Page Size: {pageSize}</p>
                    {(pageNum > 0) && (<button onClick={handlePreviousPage}>Previous Page</button>)}
                    {(pageNum + 1 < totalPages) && (<button onClick={handleNextPage}>Next Page</button>)}
                  </dev>
                ) 
                : (<p> No Reservations to display </p>)}
      </main>
    )
  }
  
  export default Home
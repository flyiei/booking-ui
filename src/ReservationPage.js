import { useParams, Link } from "react-router-dom"


const ReservationPage = ({ reservations, handleDelete }) => {
  const { id } = useParams();
  // useParams can get the params of the url, it will get 1 if url is '/reservation/1'
  const reservation = reservations.find((reservation) => (reservation.id).toString() === id);
  return (
    <main>

        {reservation &&
          <>
            <h2> {reservation.agency} </h2>
            <p>{reservation.consumer}</p>
            <p>{reservation.hotel}</p>
            <Link to={`/edit/${reservation.id}`}>
                <button>Edit Reservation</button>
            </Link>
            <button onClick={() => handleDelete(reservation.id)}>
              Delete Reservation
            </button>
          </>
        }
        {!reservation &&
          <>
            <h2>Reservation Not Found</h2>
            <p>
              <Link to='/'>Back to Homepage</Link>
            </p>
          </>
        }

    </main>
  )
}

export default ReservationPage
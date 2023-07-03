import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
const EditReservation = ({ reservations, handleEdit, editAgency, editConsumer, editHotel, setEditAgency, setEditConsumer, setEditHotel
}) => {
    // useParams hook is a built-in hook provided by React Router. 
    // It allows you to access the parameters defined in the URL of your application.
    const { id } = useParams();

    const reservation = reservations.find(reservation => (reservation.id).toString() === id);
    console.log(reservation)
    // for pre-populating reservation info
    useEffect(() => {
        if (reservation) {
            setEditAgency(reservation.agency)
            setEditConsumer(reservation.consumer)
            setEditHotel(reservation.hotel)
        }
    }, [reservation, setEditAgency, setEditConsumer, setEditHotel])
    // why useEffect's dependency need setEditAgency setEditConsumer and setEditHotel ???
    // To prevent the default Form submission behavior (refresh the page upon form submission) 
    // and handle the form submission manually within your React component, you can use the e.preventDefault() method. 
    return (
        <main>
            {editAgency && editConsumer && editHotel &&
                <>
                    <h2>Edit Reservation</h2>
                    <form onSubmit={(e) => e.preventDefault()}>

                        <label htmlFor="agency">Agency:</label>
                        <input id="agency"
                            type="text"
                            required
                            value={editAgency}
                            onChange={(e) => setEditAgency(e.target.value)} />

                        <label htmlFor="consumer">Consumer:</label>
                        <input id="consumer"
                            type="text"
                            required
                            value={editConsumer}
                            onChange={(e) => setEditConsumer(e.target.value)} />

                        <label htmlFor="hotel">Hotel:</label>
                        <input id="hotel"
                            type="text"
                            required
                            value={editHotel}
                            onChange={(e) => setEditHotel(e.target.value)} />

                        <button type="submit" onClick={(e) => handleEdit(reservation.id)}>Submit</button>
                    </form>
                </>

            }
            {(!editAgency || !editConsumer || !editHotel) && 
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

export default EditReservation
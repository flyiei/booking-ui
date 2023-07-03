import Home from './Home';
import NewReservation from './NewReservation';
import EditReservation from './EditReservation';
import ReservationPage from './ReservationPage';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api/reservations';


function App() {

const [pageNum, setPageNum] = useState(0);
const [pageSize, setPageSize] = useState(5);

const [reservations, setReservations] = useState([]);
const [agency, setAgency] = useState('');
const [consumer, setConsumer] = useState('');
const [hotel, setHotel] = useState('');

const [editAgency, setEditAgency] = useState('');
const [editConsumer, setEditConsumer] = useState('');
const [editHotel, setEditHotel] = useState('');

const history = useHistory();

useEffect(()=>{
  const fetchReservations = async () => {
    try {
        const response = await api.get('/reservations', {
          params: {
            pageNum: pageNum,
            pageSize: pageSize
          }
        })
        setReservations(response.data);
    } catch (err) {
        if (err.response){
            // not in the 200 response range
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else {
            console.log(`Error: ${err.message}`)
        } 
    }
  }

  fetchReservations();
},[])


const handleSubmit = async (e) => {
  e.preventDefault();
  const newReservation = {agency: agency, consumer: consumer, hotel: hotel}
  
  try {

    const response = await api.post('/reservation', newReservation)

    const allReservations = [...reservations, response.data]
    setReservations(allReservations);
    setAgency('');
    setConsumer('');
    setHotel('');
    history.push('/');
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
  
}

const handleEdit = async (id) => {

  //format(new Date(), 'MMMM dd, yyyy pp');
  const updateReservation = {id, agency: editAgency, consumer: editConsumer, hotel: editHotel}

  try {

    const response = await api.put(`/reservations/${id}`, updateReservation)
    setReservations(reservations.map( reservation => reservation.id === id ? { ...response.data } : reservation))
    setEditAgency('')
    setEditConsumer('')
    setEditHotel('')
    history.push('/')
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}


const handleDelete = async (id) => {
  try {
    await api.delete(`/reservations/${id}`)
    const reservationsList = reservations.filter((reservation)=> reservation.id !== id);
    setReservations(reservationsList);
    // accessing the browser history with react router, it will route to the home page
    // this is not requesting anything from the server
    history.push('/')
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }


}

  return (
    <div className="App">
       <Switch>
            {/* without 'exact', '/reservation' and '/*' will also go to 'Home' component */}
            <Route exact path='/'>
                <Home reservations={reservations}/>
            </Route>
            <Route exact path='/reservation'>
                <NewReservation 
                    handleSubmit={handleSubmit}
                    agency={agency}
                    setAgency = {setAgency}
                    consumer = {consumer}
                    setConsumer = {setConsumer}
                    hotel = {hotel}
                    setHotel = {setHotel}
                />
            </Route>
            <Route path='/edit/:id'>
                <EditReservation 
                    reservations={reservations}
                    handleEdit={handleEdit}
                    editAgency={editAgency}
                    editConsumer = {editConsumer}
                    editHotel = {editHotel}
                    setEditAgency = {setEditAgency}
                    setEditConsumer = {setEditConsumer}
                    setEditHotel = {setEditHotel}
                />
            </Route>
            <Route path='/reservation/:id'>
                <ReservationPage reservations={reservations} handleDelete = {handleDelete}/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;

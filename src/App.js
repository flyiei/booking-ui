import Home from './Home';
import NewReservation from './NewReservation';
import EditReservation from './EditReservation';
import ReservationPage from './ReservationPage';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api/reservations';


function App() {

const [totalPages, setTotalPages] = useState(0);
const [pageNum, setPageNum] = useState(0);
const [pageSize, setPageSize] = useState(4);

const [reservations, setReservations] = useState([]);
const [agency, setAgency] = useState('');
const [consumer, setConsumer] = useState('');
const [hotel, setHotel] = useState('');

const [editAgency, setEditAgency] = useState('');
const [editConsumer, setEditConsumer] = useState('');
const [editHotel, setEditHotel] = useState('');

const history = useHistory();

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

const fetchTotalPages = async () => {
  try {
      const response = await api.get('/reservations/totalPages', {
        params: {
          pageSize: pageSize
        }
      })
      setTotalPages(response.data);
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

useEffect(()=>{
  fetchReservations();
  fetchTotalPages();
},[pageNum])

const handleNextPage = () => {
  setPageNum(pageNum + 1);
};

const handlePreviousPage = () => {
  setPageNum(pageNum - 1);
};

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
    fetchReservations();
    fetchTotalPages();
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
    if (reservationsList.length === 0 && pageNum > 0) {
      setPageNum(pageNum - 1) // pageNum update will trigger useEffect to fetch reservations from server
    }else {
      // fetching reservations from server to fill the empty slot 
      fetchReservations();
      fetchTotalPages();
    }
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
                <Home reservations={reservations} 
                    totalPages={totalPages} 
                    pageNum={pageNum} 
                    setPageNum={setPageNum}
                    pageSize={pageSize}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}/>
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

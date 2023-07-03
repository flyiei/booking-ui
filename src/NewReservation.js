const NewReservation = ({
    handleSubmit, agency, setAgency, consumer, setConsumer,hotel, setHotel }) => {
    return (
      <main >
        <h2>New Reservation</h2>
        <form onSubmit={handleSubmit}>
            
            <label htmlFor="agency">Agency</label>
            <input id="agency"
                type="text" 
                required
                value={agency}
                onChange={(e)=> setAgency(e.target.value)}/>
  
            <label htmlFor="consumer">Consumer:</label>
            <input 
                 id="consumer" 
                 type="text" 
                 required
                 value={consumer}
                 onChange={(e)=>setConsumer(e.target.value)}/>

            <label htmlFor="hotel">Hotel:</label>
            <input 
                 id="hotel" 
                 type="text" 
                 required
                 value={hotel}
                 onChange={(e)=>setHotel(e.target.value)}/>


            <button type="submit">Submit</button>
        </form>
      </main>
    )
  }
  
  export default NewReservation
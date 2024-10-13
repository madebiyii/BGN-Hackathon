function DestinationModal({data, status}){
    const style = {
      position: 'fixed',
      width: '60vw',
      height: '80vh',
      left: '20vw',
      top: '10vh',
      backgroundColor: '#DDDDDDAA',
      border: '3px solid black',
      zIndex: '1'
    }
    const regularData = status == 0 ? 
    
    (<div style={style}>
        <p style={{textAlign: 'center'}}>Loading...</p>
    </div>)
    : (
    <div style={style}>
      <InnerDest data={data} number={0}></InnerDest>
    </div>
    );
      
    
    return (
           regularData
    );
  }

  export default DestinationModal;

  function InnerDest({data, number}){
    console.log("DATA FOllows");
    console.log(data);
    var destination, budget, days;
    var tagline = null;
    if (data.itineraries){
        destination = data.itineraries[number].destination
        budget = data.itineraries[number].budget
        days =data.itineraries[number].days
        if (data.itineraries[number].tagline){
            tagline = data.itineraries[number].tagline;
        }
    } else {
        destination = data[number].destination
        budget =      data[number].budget
        
        tagline =     data[number].tagline
        if (data[number].days){
          days    =     data[number].days
        } else {
          days    =     data[number].day
        }
        }
    
    
    return (
        <>
        <h1  > {destination} </h1>
        <h2> ~{budget} </h2>
        <h2> {days.length} days </h2>
        </>
    )
  }
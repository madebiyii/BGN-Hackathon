import "./destination.css"

function DestinationModal({data, status, close}){
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
    const styleFull = {
      position: 'fixed',
      width: '60vw',
      height: '80vh',
      left: '20vw',
      top: '10vh',
      backgroundColor: '#DDDDDDFE',
      border: '3px solid black',
      zIndex: '1',
      overflow: 'auto'
    }
    const regularData = status == 0 ? 
    
    (<div style={style}>
        <p style={{textAlign: 'center'}}>Loading...</p>
    </div>)
    : (
    <div style={styleFull}>
      <InnerDest data={data} number={0}></InnerDest>
      <Rating rate={close}></Rating>
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
    
    console.log("days follow");
    console.log(days);
    
    return (
        <>
        <h1 class="title" > {destination} </h1>
        <h1 class="tagline"> {tagline}</h1>
        <h2 class="extra"> Cost: €{budget} </h2>
        <h2 class="extra"> {days.length} days </h2>
        {days.map((day, i) => {
         return ( <div style={{border: '1px grey solid'}}> 
          <h3 class="day"> Day {i+1}</h3>
            {day.activities.map((act, i) => {return <> 
         
               <p class="act">   {'\u2606' +" " + act}</p>
            </>})
            }
          <p class="cost"> estimated cost: €{day.estimated_cost}</p>
          </div>);
   } )}
        </>
    )
  }

  function Rating({rate}) {
    const stars = [1,2,3,4,5]
    return (
      <div style={{marginLeft: "100px"}}>
        {stars.map((star, i) => {
          return <span class="star" 
                       onClick={()=>{
                          rate(i+1);
                       }}> {'\u2606'} </span>
        })}
        <span style={{paddingLeft: "50px", textAlign: "right"}}> <i>This data will be used to train the model </i></span>
      </div>
    );
  }
import axios from "axios";

export default function Upload(){
    const apiBase = "";
    const uploadItin = (itin) => {
        const url1 = apiBase + "/itin/add";

        // Construct itinerary body from itin object
        const itineraryObj = {
            id: itin.id,
            name: itin.name,
            start_date: '2024-10-14',
            end_date: '2024-10-20' ,//YYYY-MM-DD
            holiday_type: itin.holiday_type,
            location: itin.location,
            accom: itin.accom,
            transport: itin.transport,
            rating: itin.rating,
            image: itin.image.textContent
        };

        axios.post(url1, itineraryObj).then((resp) => {
                if (resp.status != 200){
                    alert("Error: " + resp.statusText);
                }
            });

    }
    return (
        <h2> Upload Itinerary PlaceHolder</h2>
    );
}
import { useState } from "react";

const NewTrip = ({onNewTrip}) => {
    const [destination , setDestination] = useState("")
    const [tripDepDay , setTripDepDay] = useState("")
    const [tripDuration , setTripDuration] = useState()
    const [nbOfPersons , setNbOfPersons] = useState()

    const onSubmit = (e) => {
        e.preventDefault()

        if(!destination || !tripDepDay || !tripDuration || !nbOfPersons){
            alert("Please fill all lines in the form!");
            return;
        }

        onNewTrip({destination , tripDepDay , tripDuration , nbOfPersons})

        setDestination("")
        setTripDepDay("")
        setTripDuration()
        setNbOfPersons()

    }


    return (
        <form className = "trip-form" onSubmit={onSubmit}>
            <div className = "form-control">
                <label>Destination</label>
                <input 
                type="text"
                placeholder="Select destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value )}
                />
            </div>
            <div className = "form-control date">
                <label>Day of departure</label>
                <input 
                type="date"
                value={tripDepDay}
                onChange={(e) => setTripDepDay(e.target.value)}
                />

            </div>

            <div className = "form-control">
                <label>Duration of the trip in days</label>
                <input 
                type="number"
                placeholder = "Enter number of days 1 - 365"
                value={tripDuration}
                onChange={(e) => setTripDuration(e.target.value)}
                />

            </div>
            <div className = "form-control">
                <label>Number of persons</label>
                    <input 
                        type="number"
                        placeholder="Enter number between 1 - 30"
                        value={nbOfPersons}
                        onChange={(e) => setNbOfPersons(e.target.value)}
                    />

            </div>

            <input type="submit" value="Display items"  className = "submitBtn" />
        </form>
    )
}

export default NewTrip

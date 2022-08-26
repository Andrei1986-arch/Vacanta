import { useState } from "react";
import NewPack from "./NewPack";
import axios from 'axios';
import PageInfo from "./PageInfo";
import {Container ,Form , Button} from 'react-bootstrap'

const NewTrip = ({onNewTrip}) => {
    const [destination , setDestination] = useState("")
    const [tripDepDay , setTripDepDay] = useState("")
    const [tripDuration , setTripDuration] = useState("");
    const [nbOfPersons , setNbOfPersons] = useState("");
    const [tripData, setTripData] = useState({});
    const [receivedData, setReceivedData] = useState(false);
    const [downloadData , setDownloadData] = useState({});
   
    // destination it has to correspond to one of  the countries in database
    //tripDuration will act like a filter for items ex:weather hot or cold
    // tripDuration it will help us to calculate the number of item we need
    // number of persons it will be a multiplier of the items selected
    const onSubmit = (e) => {
        e.preventDefault()

        if(!destination || !tripDepDay || !tripDuration || !nbOfPersons){
            alert("Please fill all lines in the form!");
            return;
        }

       // onNewTrip({destination , tripDepDay , tripDuration , nbOfPersons})

        setDestination("")
        setTripDepDay("")
        setTripDuration(0)
        setNbOfPersons(0)
        setTripData({});
        setReceivedData(false);
        setDownloadData({});
    } // end of onSubmit

    const getData = async () => {
    
        let requestURL = "http://localhost:6005/plan_trip?destination=" + String(destination)
                                                                +"&departure=" + String(tripDepDay)
                                                                +"&duration=" + String(tripDuration)
                                                              +"&nrPeople=" + String(nbOfPersons);       
        axios.get(requestURL).then(response => {
            setTripData(response["data"]);
            setDownloadData(response["data"])
            setReceivedData(true);
        });
        //http://localhost/6000/plan_trip?dest=rom&date=2021-08-22&duration=5&nrPersons=3
    }

   

    return (
        <>
        <Container>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        </Container>
            <PageInfo />
        <form className = "trip-form" onSubmit={onSubmit}>
            <div className = "form-control">
                <label>Destination</label>
                <input 
                type="text"
                placeholder="Type destination country..."
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

            <input type="submit" value="Display items to pack"  className = "submitBtn" onClick={getData}/>
        </form>
        {
        receivedData ? <NewPack items={tripData} /> : null 
        // receivedData ? <Button  text="download list"  onClick={downloadFile}   /> : null
        }
        </>
    )
}

export default NewTrip

import {useState , useEffect} from "react"
import './index.css';
import Header from "./Components/Header"
import NewTrip from "./Components/NewTrip";
import UserLogin from"./Components/UserRegister"
import UserRegister from "./Components/UserLogin";


const  App = () => {
  const[items , setItems] = useState( [] );
  const [toggleRegister , setToggleRegister] = useState(false);
  const [toggleNewTrip , setToggleNewTrip] = useState(false);
  const [toggleLogin , setTogglelogin] = useState(false);



  useEffect(() => {
      const getItems = async() =>{
        const itemsFromServer = await fetchItems()
        setItems(itemsFromServer)
        }
        getItems()
    } , [] )


  const fetchItems = (destination, departure, duration, nrPeople) => {
    // const res = await fetch("http://localhost:6000/plan_trip?destination=${destination}&departure=${departure}&duration=${duration}&nrPeople=${nrPeople}")
    // const data = await res.json();
    console.log("http://localhost:6003/plan_trip?destination=${destination}&departure=${departure}&duration=${duration}&nrPeople=${nrPeople}");
    // return data
  }



  return (
    <div className="container">
      <Header 
        title = "Vacationey - Time to pack"
        onRegister = {() => {
          setToggleRegister(!toggleRegister);
          setToggleNewTrip(false);
          setTogglelogin(false);
        }}

        onLogin = { () => {
          setTogglelogin(!toggleLogin);
          setToggleRegister(false);
          setToggleNewTrip(false);
        }

        }

        onNewTrip = {() => {
          setToggleNewTrip(!toggleNewTrip);
          setToggleRegister(false);
          setTogglelogin(false);
        }}

      />
      {toggleNewTrip && <NewTrip />}
      {toggleLogin && <UserRegister/>}
      {toggleRegister &&  <UserLogin />}
    </div>
    
  );
}

export default App;

import {useState , useEffect} from "react"
import './index.css';
//import headerImage from "./Components/images/headerImage.jpg"
import Header from "./Components/Header"
import Items from "./Components/Items";
import NewTrip from "./Components/NewTrip";


const  App = () => {
  const[items , setItems] = useState( [] )


  useEffect(() => {
      const getItems = async() =>{
        const itemsFromServer = await fetchItems()
        setItems(itemsFromServer)
        }
        getItems()
    } , [] )


  const fetchItems = async() => {
    const res = await fetch("http://localhost/5000/items")
    const data = await res.json()
    return data
  }

  return (
    <div className="container">
    <Header 
    title = "Vacationey - Time to pack"
    
    />

    <NewTrip/>
    <Items items={items}/>
    </div>
  );
}

export default App;

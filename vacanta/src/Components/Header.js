import PropTypes from 'prop-types'
import  Button  from './Button'
import headerImage from "./images/headerImage.jpg"

const Header = ({title , onNewTrip }) => {
  
    <img src={ headerImage }></img>

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color="green" text="Set new trip" onClick={onNewTrip}/>
       
        </header>
    )

    Header.defaultProps = {
        title: "Vacationey",
    }

    Header.propTypes = {
        title:PropTypes.string
    }
}

export default Header

import PropTypes from 'prop-types'
import ButtonAdmin from './ButtonAdmin'
import  ButtonTrip  from './ButtonTrip'
import headerImage from "./images/headerImage.jpg"

const Header = ({title , onNewTrip ,  onAdminLogin}) => {
  
    <img src={ headerImage }></img>

    return (
        <header className="header">
            <h1>{title}</h1>
            <ButtonTrip color="green" text="Set new trip" onClick={onNewTrip}/>
            <ButtonAdmin color="red" text="Admin login" onClick={onAdminLogin}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Vacationey",
}

Header.propTypes = {
    title:PropTypes.string
}
export default Header

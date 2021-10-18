import PropTypes from 'prop-types'
import  Button  from './Button'
import headerImage from "./images/headerImage.jpg"


const Header = ({title , onLogin , onRegister , onNewTrip }) => {
  
    <img src={ headerImage }></img>

    return (
        <header className="header" >
            <h1>{title}</h1>
            <Button color="green" text="Set new trip" onClick={onNewTrip}/>
            <Button color="red" text="User Login" onClick={onLogin}/>
            <Button color="blue" text="Register" onClick={onRegister} />
        </header>
    )
}

Header.defaultProps = {
    title: "Vacationey",
}

Header.propTypes = {
    title:PropTypes.string,
    onClick:PropTypes.func
}
export default Header

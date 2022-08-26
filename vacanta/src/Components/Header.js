import PropTypes from 'prop-types'
import  Button  from './Button'
import headerImage from "./images/headerImage.jpg"


const Header = ({title , onLogin , onRegister , onNewTrip }) => {
  
    <img src={ headerImage }></img>

    return (
        <header className="header" >
            <div id="header-title">
                <h1>{title}</h1>
            </div>
            <div id="nav-bar">
                <div>
                <Button id="new-trip" text="Set new trip" onClick={onNewTrip}/>
                </div>
                <div>
                <Button  text="User Login" onClick={onLogin}/>
                <Button  text="Register" onClick={onRegister} />
                </div>
            </div>
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

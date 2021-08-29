
import PropTypes from 'prop-types'
// cand se apasa pe btn  "Set new trip" trebuie
// sa apara formularul pt o noua calatorie
const ButtonTrip = ({color , text , onNewTrip}) => {
    return (
       <button className="button"
        onClick = {onNewTrip}
        style = {{backgroundColor: color}}
       >
          {text} 
       </button>
    )
}

ButtonTrip.defaultProps = {
    color: "blue"
}

ButtonTrip.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default ButtonTrip

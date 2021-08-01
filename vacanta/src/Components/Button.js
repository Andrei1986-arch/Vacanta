
import PropTypes from 'prop-types'
const Button = ({color , text , onNewTrip}) => {
    return (
       <button className="button"
        onClick = {onNewTrip}
        style = {{backgroundColor: color}}
       >
          {text} 
       </button>
    )
}

Button.defaultProps = {
    color: "blue"
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

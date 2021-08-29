import propTypes from 'prop-types'


const ButtonAdmin = ({color , text ,onAdminLogin}) => {
    return (
       <button className = "button" 
        onClick = {onAdminLogin}
        style = {{backgroundColor: color}}
        >
            {text}
       </button>

    )
}

ButtonAdmin.defaultProps = {
    color:"black"
}

ButtonAdmin.propTypes = {
    text:propTypes.string,
    color:propTypes.string,
    onclick:propTypes.func
}


export default ButtonAdmin

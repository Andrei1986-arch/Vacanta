import React from 'react'
import propTypes from 'prop-types'
import {FaTimes} from "react-icons/fa"

const Button = ({color , text , onClick}) => {
    return (
        <button
            className="button"
            style={{backgroundColor:color , cursor:"pointer"}}
            onClick={onClick}

        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color:"black",
    text:"Enter text for button"
}

Button.propTypes = {
    text:propTypes.string,
    color:propTypes.string,
    onClick:propTypes.func
}

export default Button

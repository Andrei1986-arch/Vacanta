import React from 'react'
import propTypes from 'prop-types'


const Button = ({ text , onClick }) => {
    return (
        <button
            className="button"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    text:"Enter text for button"
}

Button.propTypes = {
    text:propTypes.string,
    onClick:propTypes.func
}

export default Button

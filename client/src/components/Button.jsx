import PropTypes from 'prop-types'

const Button = ({ handleClick, children, className='', type = 'button' }) => {
    return (
        <button 
            type={type}
            onClick={handleClick} 
            className={`px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button

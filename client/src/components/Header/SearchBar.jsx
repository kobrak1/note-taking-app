import React from "react"
import PropTypes from "prop-types"

const SearchBar = ({ placeholder = "Search...", value, onChange, className = '', ...props }) => {
    return (
        <div className={`search-bar ${className}`}>
            <input 
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...props}
            />
        </div>
    )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default SearchBar

const ErrorMessage = ({children}) => {
    return ( 
        <>
            {children}
        </>
    )
}

ErrorMessage.defaultProps = {
    children: 'An error has occured.'
}

export default ErrorMessage
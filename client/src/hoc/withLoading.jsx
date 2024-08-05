import { Skeleton } from '@mui/material'

function withLoading(Component) {
    return function LoadingComponent({ isLoading, isError, ...props }) {
        if (isLoading) {
            return <Skeleton variant='rectangular' width={300} height={200} animation="wave" />
        }
        
        if (isError) {
            return <p>Error fetching notes!</p>
        }

        return <Component {...props} />
    }
}

export default withLoading
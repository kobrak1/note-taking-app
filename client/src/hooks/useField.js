import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState(type === 'checkbox' ? false : '')

    const onChange = (e) => {
        setValue(type === 'checkbox' 
            ? e.target.checked 
            : e.target.value
        )
    }

    const onReset = () => {
        setValue(type === 'checkbox' 
            ? false 
            : ''
        )
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}
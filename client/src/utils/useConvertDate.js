export const useConvertDate = (date) => {
    //create a Date obj
    const dateObj = new Date(date)

    //Format the date
    const dateOptions = {year: "numeric", month: "numeric", day: "numeric"}
    const timeOptions = {hour: "2-digit", minute: "2-digit", hour12: false}

    const formattedDate = dateObj.toLocaleDateString(["tr-TR"], dateOptions)
    const formattedTime = dateObj.toLocaleTimeString(["tr-TR"], timeOptions)

    return {formattedDate, formattedTime}
}
import React from "react"
import Header from "../components/Header/Header"
import NotesContainer from "../components/Notes/NotesContainer"

const HomePage = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center mx-auto">
                <NotesContainer />
            </div>
        </>
    )
}

export default HomePage
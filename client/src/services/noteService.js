import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api/notes",
    timeout: 1000,
})

export const fetchNotes = async () => {
    const res = await api.get("/fetch-notes")
    return res.data
}
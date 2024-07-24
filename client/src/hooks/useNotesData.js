import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addNote, deleteNote, fetchNoteById, fetchNotes, updateNote } from "../services/noteServices"
import { message } from "antd"

// GET
export const useNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
        staleTime: 1000 * 60 * 5,  // data remains fresh for 5 minutes
        cacheTime: 1000 * 60 * 10, // cache data for 10 minutes
        onError: (error) => {
            console.error('Error fetching notes:', error);
            message.error('Failed to fetch notes.');
        },
    })
}

// GET/:id
export const useNote = (id) => {
    return useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        staleTime: 1000 * 60 * 5,  // data remains fresh for 5 minutes
        cacheTime: 1000 * 60 * 10, // cache data for 10 minutes
        onError: (error) => {
            console.error('Error fetching the note:', error);
            message.error('Failed to fetch the note.');
        },
    })
}

// POST
export const useCreateNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: data => addNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
            message.success('Created successfully')
        },
        onError: (error) => {
            console.error('Error creating note:', error)
            message.error('Error adding note')
        },
    })
}

// PUT
export const useUpdateNote = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, important }) => updateNote(id, {important}),
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
            message.success('Updated successfully')
        },
        onError: (error) => {
            console.error('Error updating note:', error)
            message.error('Error updating note')
        }
    })
}

// DELETE
export const useDeleteNote = () =>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: id => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
            message.success('Removed successfully')
        },
        onError: (error) => {
            console.error('Error deleting note:', error)
            message.error('Error deleting note')
        }
    })
}
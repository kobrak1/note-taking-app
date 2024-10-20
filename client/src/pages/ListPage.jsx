import React from 'react'
import NoteForm from '../components/NoteForm'
import NoteList from '../components/NoteList'

const ListPage = () => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <NoteForm />
      <NoteList />
    </div>
  )
}

export default ListPage

const baseUrl = 'http://localhost:3001/notes/'

const getAll = () => {
    fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      return response.json();
    })
}

const update = (id, newObject) => {
    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newObject)
      })
        .then((response) => {
          if(!response.ok) {
            throw new Error('Error updating note')
          }
          return response.json()
        })
}

export default {
    getAll: getAll,
    update: update,
}
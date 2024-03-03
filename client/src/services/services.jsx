const baseUrl = '/api/notes'; // relative url

const getAll = async () => {
  const request = await fetch(baseUrl);
  if (!request.ok) {
    throw new Error("Error while fetching data");
  }
  console.log('data fetched successfully');
  return request.json();
};

const post = (notes, noteObject,setNotes) => {
  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(noteObject.content && noteObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error while posting data!");
      }
      return response.json();
    })
    .then(noteObject.content && setNotes([...notes, noteObject]))
    .then((data) => console.log("Response data:", data))
    .catch((error) => {
      console.error("Error:", error);
    });
}

const update = async (id, newObject) => {
  const request = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newObject),
  });

  if (!request.ok) {
    throw new Error("Error while updating the data");
  }
  return request.json();
};

export default { getAll, update, post };

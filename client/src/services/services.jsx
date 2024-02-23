const baseUrl = 'https://note-taking-app-api-2h7s.onrender.com/api/notes';
// const baseUrl = process.env.BASE_URL;

const getAll = async () => {
  const request = await fetch(baseUrl);
  if (!request.ok) {
    throw new Error("Error while fetching data");
  }
  return request.json();
};

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

export default { getAll, update };

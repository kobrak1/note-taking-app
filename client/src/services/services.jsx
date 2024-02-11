const baseUrl = "http://localhost:3001/notes";

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

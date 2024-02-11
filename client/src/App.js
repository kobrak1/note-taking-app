import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import noteService from "./services/services.jsx";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if(!data) {
    return null
  }

  return (
    <>
      <Header />
      {isLoading ? <p>loading...</p> : <Content data={data} />}
      <Footer />
    </>
  );
}

export default App;

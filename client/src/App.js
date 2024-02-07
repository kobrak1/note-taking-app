import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoading);
  console.log('burak karhan');

  useEffect(() => {
    fetch("http://localhost:3001/notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
        setIsLoading(false)
      });
  }, []);
  
  console.log(isLoading);
  console.log(data);

  return (
    <>
      <Header />
      {isLoading ? <p>lading...</p> : <Content data={data} />}
      <Footer />
    </>
  );
}

export default App;

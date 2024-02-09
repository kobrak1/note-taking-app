import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import getAll from "./services/services.jsx";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {isLoading ? <p>lading...</p> : <Content data={data} />}
      <Footer />
    </>
  );
}

export default App;

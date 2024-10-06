import { Mosaic } from "react-loading-indicators";

const FallBackUI = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
    </div>
  );
};

export default FallBackUI;
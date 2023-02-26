import "./styles.css";
import React from "react";
import Alarm from "./assets/alarm-sound.wav";

export default function App() {
  const [etaData, setEtaData] = React.useState([]);
  const [min, setMin] = React.useState("");

  const getScheduledBusData = async () => {
    const apiRes = await fetch(
      "https://chalo.com/app/api/vasudha/track/route-live-info/mumbai/qjXVxjVU?stopIds=GFnCgIFr,ZEMcxhSC"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("api data", data);
        let storeConvertedData = [];
        console.log("object entries", Object.entries(data.stopsEta.ZEMcxhSC));
        let storeObjects = Object.entries(data.stopsEta.ZEMcxhSC);
        storeObjects.map((item) =>
          storeConvertedData.push(JSON.parse(item[1]))
        );
        console.log("converted JSON", storeConvertedData);
        setEtaData([...storeConvertedData]);
        const d = new Date();
        setMin(d.getMinutes());
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getScheduledBusData();
    setInterval(() => {
      getScheduledBusData();
    }, 60000);
  }, []);

  const play = () => {
    new Audio(Alarm).play();
  };

  // const handleMinutes = () => {

  //   return <>{minutes}</>;
  // };
  return (
    <div className="App">

      {/* <button style={{ marginTop: "32px" }} onClick={play}>
        Alarm
      </button> */}
      <br />
      Current min is : {min}

      {etaData.length > 0 && (
        <>
          {etaData.map((eta) => {
            return (
              <>
                {eta.eta / 60 > 0 && (
                  <>
                    <p>{Math.ceil(eta.eta / 60)}min</p>
                    {/* <p>{Math.ceil(eta.eta / 60) - 5 <= 5} true min</p> */}
                    {Math.ceil(eta.eta / 60) <= 45 && Math.ceil(eta.eta / 60) >= 40 && play()}
                    {Math.ceil(eta.eta / 60) <= 35 && Math.ceil(eta.eta / 60) >= 30 && play()}
                    {Math.ceil(eta.eta / 60) <= 20 && Math.ceil(eta.eta / 60) >= 15 && play()}

                  </>
                )}
              </>
            );
          })}
        </>
      )}
    </div>
  );
}

import { useFetch } from "../../../hooks/useFetch/useFetch";
import { useState, useEffect } from "react";
import PlanetCard from "./PlanetCard";
import PlanetsButton from "./PlanetsButton";
import "./solarsysteme.css";
import { planetsItemsList } from "./planetsItemsList";

const SolarSystem = () => {
  const [apiResp, errorResp, isLoading] = useFetch(
    "https://api.le-systeme-solaire.net/rest/bodies/"
  );

  const [solarSystemFiltered, setSolarSystemFiltered] = useState([]);
  const [detailPlanet, setDetailPlanet] = useState({});

  useEffect(() => {
    if (!isLoading && apiResp?.data) {
      setSolarSystemFiltered(
        apiResp.data.bodies.filter((element) => element.isPlanet === true)
      );
    }
  }, [apiResp, isLoading]);

  console.log("solarSystemFiltered:", solarSystemFiltered);

  useEffect(() => {
    if (solarSystemFiltered.length) {
      const image = planetsItemsList.find(
        (planet) => planet.title === "Neptune"
      ).img;
      const planet = { ...solarSystemFiltered[1], image };
      setDetailPlanet(planet);
    }
  }, [solarSystemFiltered]);

  if (errorResp) {
    console.log("error: ", errorResp);
    return <h2>an error has occurred, please contact the support</h2>;
  }

  return (
    <div className="solar-page">
      {isLoading ? (
        <h2>request is still in process, loading..</h2>
      ) : (
        <>
          <div className="solar-container">
            {solarSystemFiltered.map((planet, index) => {
              //console.log(element.isPlanet);
              return (
                <PlanetsButton
                  planetDetails={planet}
                  key={index}
                  setDetailPlanet={setDetailPlanet}
                />
              );
            })}
          </div>
          <PlanetCard data={detailPlanet} />
          <div>
            {/* <h2>No planet</h2>
            <PlanetsButton data={moon[0]} />
        <PlanetsButton data={sun[0]} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default SolarSystem;

//   const moon = solarSystem.filter((element) => element.englishName === "Moon");
//   const sun = solarSystem.filter((element) => element.englishName === "Sun");

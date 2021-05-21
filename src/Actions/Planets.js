import _ from "lodash";
export const getPlanets = (callback) => async (dispatch) => {
  let urls = [
    "https://swapi.dev/api/planets",
    "https://swapi.dev/api/people",
    "https://swapi.dev/api/species",
  ];
  let filteredPlanets = [];

  try {
    let [planetList, peopleList, speciesList] = await Promise.all([
      getAllPaginationReponse(urls[0]),
      getAllPaginationReponse(urls[1]),
      getAllPaginationReponse(urls[2]),
    ]);
    //planets with aleast 2 films
    let planetWithFilms = planetList.filter(
      (planet) => _.get(planet, "films", []).length >= 2
    );

    //species that has classification as reptile
    let reptileSpecies = speciesList.filter(
      (species) => _.get(species, "classification", "") === "reptile"
    );

    //planetWithFilms that has resident as reptile
    planetWithFilms.map((planets) => {
      reptileSpecies.map((species) => {
        if (_.get(planets, "residents", "").includes(species.people[0])) {
          filteredPlanets.push(planets);
        }
      });
    });
    if (filteredPlanets.length) {
      console.log(
        "planets who had been appeared in at least two movies and who residents (/people) have reptiles (/species) are",
        filteredPlanets
      );
    } else {
      console.log("No planets found that met the condition"); //output
    }
   callback(true)
   dispatch({ type: "SAVE", payload: filteredPlanets });
   // return filteredPlanets;
  } catch {
    throw Error("Promise failed");
  }
}

async function getAllPaginationReponse(url, pageNo = 1) {
  return fetch(`${url}?page=${pageNo}`)
    .then((response) => response.json())
    .then(async (data) => {
      pageNo++;
      return data.results.concat(data.next && (await getAllPaginationReponse(url, pageNo)));
    });
}

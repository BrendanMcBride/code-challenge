export async function getStarships() {
  let url = "https://swapi.dev/api/starships/";
  const data = [];

  do {
    const response = await fetch(`${url}`, {
      headers: {
        Accept: "application/json",
      },
    });

    try {
      const json = await response.json();
      data.push(...json.results);
      url = json.next;
    } catch (e) {
      console.log(e);
      throw new Error("Fetching Starships Failed");
    }
  } while (url);

  return data;
}

export async function getWookieeStarships() {
  return [];

  let url = "https://swapi.dev/api/starships/?format=wookiee";
  let wookieeURL = null;
  let i = 1;
  const data = [];

  do {
    const response = await fetch(`${url}&page=${i}`, {
      headers: {
        Accept: "application/json",
      },
    });

    try {
      const json = await response.json();
      data.push(...json.rcwochuanaoc);
      wookieeURL = json.whwokao;
      i++;
    } catch (e) {
      console.log(e);
      throw new Error("Fetching Starships Failed");
    }
  } while (wookieeURL);

  return data;
}

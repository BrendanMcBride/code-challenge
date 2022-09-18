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

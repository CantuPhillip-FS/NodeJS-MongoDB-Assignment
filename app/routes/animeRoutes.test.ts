// Import Jest
import { describe, expect, test } from "@jest/globals";
/*
 I have to declare a new function because if imported it wouldn't work
 due to the animeRoutes.ts function not defining the full url and
 requiring a res/req - so I just defined the same function here but to
 specifically fetch the localhost url and return its data
 purposely doing so without any try/catch to just "go for it" as I figured that's
 best for a test.
*/

// global variable, much easier this way
const BASE_URL = "http://localhost:5001/api/v1/anime";

async function getAllAnimes() {
  const res = await fetch(`${BASE_URL}`);
  return res.json();
}

describe("Anime API", () => {
  test("GET /anime returns successful", async () => {
    const data: any = await getAllAnimes();

    expect(data).toHaveProperty("status");
    expect(data.status).toBe("successful");

    expect(data).toHaveProperty("animes");
    expect(Array.isArray(data.animes)).toBe(true);
  });

  test("Anime list should contain at least one anime", async () => {
    const data: any = await getAllAnimes();
    expect(data.animes.length).toBeGreaterThan(0);
  });
});

async function getAnimeById(id: string) {
  const res = await fetch(`http://localhost:5001/api/v1/anime/${id}`);
  return res.json();
}

describe("Anime by Id API", () => {
  test("GET /anime/:id returns the correct properties", async () => {
    // call the funciton with a VALID id
    const data: any = await getAnimeById("691237c2a6bd1acf15b34d87");

    // "global" fields
    expect(data).toHaveProperty("message");
    expect(data.message).toBe("GET - Request made");

    expect(data).toHaveProperty("status");
    expect(data.status).toBe("successful");

    expect(data).toHaveProperty("anime");
    expect(typeof data.anime).toBe("object");

    // anime-secific fields
    const anime = data.anime;
    expect(anime).toHaveProperty("_id");
    expect(anime._id).toBe("691237c2a6bd1acf15b34d87");

    expect(anime).toHaveProperty("title");
    expect(anime.title).toBe("Howl's Moving Castle");

    expect(anime).toHaveProperty("year_released");
    expect(anime.year_released).toBe(2004);

    expect(anime).toHaveProperty("averageRating");
    expect(anime.averageRating).toBe(9);

    // plus the studio, tests that the .populate().select() works
    expect(anime).toHaveProperty("studio");
    const studio = anime.studio;

    expect(studio).toHaveProperty("name");
    expect(studio.name).toBe("Studio Ghibli");

    expect(studio).toHaveProperty("year_founded");
    expect(studio.year_founded).toBe(1985);

    expect(studio).toHaveProperty("headquarters");
    expect(studio.headquarters).toBe("Kajinocho, Koganei, Tokyo, Japan");

    expect(studio).toHaveProperty("website");
    expect(studio.website).toBe("ghibli.jp");
  });
});

/*

I WROTE THE TEST ABOVE PRIOR TO REALIZING THEY WERE NOT NEEDED
PER THE 3.6 ASIGNMENT I ONLY NEED TO TEST THE ENDPOINTS WITH QUERIES
THAT'S WHAT I'LL DO NOW AND FOR THE STUDIO I'LL ONLY DO THE QUERIED ENDPOINTS
SINCE I HAVE 5 ENDPOINTS WITH QUERIES I'LL HAVE 5 TEST SUITES BELOW

*/

// "global function" for the query tests
// the path variable is the query or id+query, e.g., '?sort=year_released'
async function getData(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  expect(res.status).toBe(200); // basic test to be used in tests below
  return res.json();
}

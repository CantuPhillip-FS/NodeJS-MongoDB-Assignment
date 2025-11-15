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

/* ------------------------------------------------------------------ */
/* 1) GET /anime?sort=year_released                                   */
/* ------------------------------------------------------------------ */
describe("GET /anime?sort=year_released", () => {
  test("returns animes sorted by year_released with default ascending order", async () => {
    const data: any = await getData("?sort=year_released");
    const years = data.animes.map((anime: any) => anime.year_released);
    // standard javascript spread operator with common way to sort
    const sortedYears = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sortedYears);
  });

  test("returns animes sorted by year_released descending", async () => {
    // just add a - to make it descending
    const data: any = await getData("?sort=-year_released");
    const years = data.animes.map((anime: any) => anime.year_released);
    const sortedYearsDesc = [...years].sort((a, b) => b - a);
    expect(years).toEqual(sortedYearsDesc);
  });
});

/* ------------------------------------------------------------------ */
/* 2) GET /anime?select=title                                         */
/* ------------------------------------------------------------------ */
describe("GET /anime?select=title", () => {
  test("each anime has only _id and title", async () => {
    // _id is automatically returned unless explicityly excluded
    const data: any = await getData("?select=title");

    // run a for each since it's an array of anime objects
    data.animes.forEach((anime: any) => {
      expect(anime).toHaveProperty("_id");
      expect(anime).toHaveProperty("title");
    });
  });

  // basically running the opposite test
  test("anime objects do NOT include year_released, averageRating, or studio", async () => {
    const data: any = await getData("?select=title");

    data.animes.forEach((anime: any) => {
      expect(anime.year_released).toBeUndefined();
      expect(anime.averageRating).toBeUndefined();
      expect(anime.studio).toBeUndefined();
    });
  });
});

/* ------------------------------------------------------------------ */
/* 3) GET /anime?limit=2                                              */
/* ------------------------------------------------------------------ */
describe("GET /anime?limit=2", () => {
  test("returns exactly 2 animes", async () => {
    const data: any = await getData("?limit=2");
    expect(Array.isArray(data.animes)).toBe(true);
    expect(data.animes.length).toBe(2);
  });

  test("changing limit changes number of returned animes", async () => {
    const data2: any = await getData("?limit=3");
    expect(data2.animes.length).toBe(3);
  });
});

/* ------------------------------------------------------------------ */
/* 4) GET /anime?page=2&limit=3                                       */
/* ------------------------------------------------------------------ */
describe("GET /anime?page=2&limit=3", () => {
  test("page 2 with limit=3 returns 3 animes", async () => {
    const data: any = await getData("?page=2&limit=3");
    expect(Array.isArray(data.animes)).toBe(true);
    expect(data.animes.length).toBe(3);
  });

  // test the skip by comparing two pages
  test("page 1 and page 2 return different animes (skip works)", async () => {
    const page1: any = await getData("?page=1&limit=3");
    const page2: any = await getData("?page=2&limit=3");

    // easier and faster to just extract and compare the ids by mapping the arrays
    const idsPage1 = page1.animes.map((anime: any) => anime._id);
    const idsPage2 = page2.animes.map((anime: any) => anime._id);

    idsPage2.forEach((id: string) => {
      expect(idsPage1).not.toContain(id);
    });
  });
});

/* ------------------------------------------------------------------ */
/* 5) GET /anime/:id?select=title                                     */
/* ------------------------------------------------------------------ */
describe("GET /anime/:id?select=title", () => {
  const animeId = "691237c2a6bd1acf15b34d87"; // Howl's Moving Castle

  test("returns only title (and _id) for given anime id", async () => {
    const data: any = await getData(`/${animeId}?select=title`);

    expect(data).toHaveProperty("anime");
    const anime = data.anime;

    expect(anime).toHaveProperty("_id", animeId);
    expect(anime).toHaveProperty("title", "Howl's Moving Castle");
  });

  test("does not include other fields like year_released, averageRating, or studio", async () => {
    const data: any = await getData(`/${animeId}?select=title`);
    const anime = data.anime;

    expect(anime.year_released).toBeUndefined();
    expect(anime.averageRating).toBeUndefined();
    expect(anime.studio).toBeUndefined();
  });
});

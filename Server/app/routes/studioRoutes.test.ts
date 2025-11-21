import { describe, expect, test } from "@jest/globals";

const BASE_URL = "http://localhost:5001/api/v1/studio";

// the path variable is the query, e.g., '?sort=year_founded'
async function getData(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  expect(res.status).toBe(200); // basic test to be used in test below
  return res.json();
}

/* ------------------------------------------------------------------ */
/* 1) GET /studio?sort=year_founded                                   */
/* ------------------------------------------------------------------ */
describe("GET /studio?sort=year_founded", () => {
  test("returns studios sorted by year_founded with default ascending order", async () => {
    const data: any = await getData("?sort=year_founded");
    const years = data.studios.map((studio: any) => studio.year_founded);
    // standard javascript spread operator with common way to sort
    const sortedYears = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sortedYears);
  });

  test("returns studios sorted by year_founded descending", async () => {
    // just add a - to make it descending
    const data: any = await getData("?sort=-year_founded");
    const years = data.studios.map((studio: any) => studio.year_founded);
    const sortedYearsDesc = [...years].sort((a, b) => b - a);
    expect(years).toEqual(sortedYearsDesc);
  });
});

/* ------------------------------------------------------------------ */
/* 2) GET /studio?select=name,year_founded                            */
/* ------------------------------------------------------------------ */
describe("GET /studio?select=name,year_founded", () => {
  test("each studio has only _id, name, and year_founded", async () => {
    // _id is automatically returned unless explicityly excluded
    const data: any = await getData("?select=name,year_founded");

    // run a for reach since it's an array of studio objects
    data.studios.forEach((studio: any) => {
      expect(studio).toHaveProperty("_id");
      expect(studio).toHaveProperty("name");
      expect(studio).toHaveProperty("year_founded");
    });
  });

  // basically running the opposite test
  test("studio objects do NOT include headquarters or website", async () => {
    const data: any = await getData("?select=name,year_founded");

    data.studios.forEach((studio: any) => {
      expect(studio.headquarters).toBeUndefined();
      expect(studio.website).toBeUndefined();
    });
  });
});

/* ------------------------------------------------------------------ */
/* 3) GET /studio?limit=2                                             */
/* ------------------------------------------------------------------ */
describe("GET /studio?limit=2", () => {
  test("returns exactly 2 studios", async () => {
    const data: any = await getData("?limit=2");
    expect(Array.isArray(data.studios)).toBe(true);
    expect(data.studios.length).toBe(2);
  });

  test("changing limit changes number of returned studios", async () => {
    const data2: any = await getData("?limit=3");
    expect(data2.studios.length).toBe(3);
  });
});

/* ------------------------------------------------------------------ */
/* 4) GET /studio?page=2&limit=3                                      */
/* ------------------------------------------------------------------ */
describe("GET /studio?page=2&limit=3", () => {
  test("page 2 with limit=3 returns 3 studios", async () => {
    const data: any = await getData("?page=2&limit=3");
    expect(Array.isArray(data.studios)).toBe(true);
    expect(data.studios.length).toBe(3);
  });

  // test the skip by comparing two pages
  test("page 1 and page 2 return different studios (skip works)", async () => {
    const page1: any = await getData("?page=1&limit=3");
    const page2: any = await getData("?page=2&limit=3");

    // easier and faster to just extract and compare the ids by mapping thea arrays
    const idsPage1 = page1.studios.map((studio: any) => studio._id);
    const idsPage2 = page2.studios.map((studio: any) => studio._id);

    idsPage2.forEach((id: string) => {
      expect(idsPage1).not.toContain(id);
    });
  });
});

/* ------------------------------------------------------------------ */
/* 5) GET /studio/:id?select=name                                     */
/* ------------------------------------------------------------------ */
describe("GET /studio/:id?select=name", () => {
  const studioId = "691237100b878e28a84b81f7"; // Studio Ghibli

  test("returns only name (and _id) for given studio id", async () => {
    const data: any = await getData(`/${studioId}?select=name`);

    expect(data).toHaveProperty("studio");
    const studio = data.studio;

    expect(studio).toHaveProperty("_id", studioId);
    expect(studio).toHaveProperty("name", "Studio Ghibli");
  });

  test("does not include other fields like year_founded or website", async () => {
    const data: any = await getData(`/${studioId}?select=name`);
    const studio = data.studio;

    expect(studio.year_founded).toBeUndefined();
    expect(studio.headquarters).toBeUndefined();
    expect(studio.website).toBeUndefined();
  });
});

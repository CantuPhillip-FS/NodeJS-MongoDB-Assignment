import { describe, expect, test } from "@jest/globals";
async function getAllAnimes() {
  const res = await fetch("http://localhost:5001/api/v1/anime");
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

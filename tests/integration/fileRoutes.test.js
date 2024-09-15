const request = require("supertest");
const app = require("../../app");

describe("File Routes", () => {
  it("should upload a file", async () => {
    const response = await request(app)
      .post("/files/upload")
      .attach("file", Buffer.from("test file content"), "test.txt");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "File uploaded successfully");
  });
});

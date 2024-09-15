const minioService = require("../../src/services/minioService");

jest.mock("minio");

describe("MinIO Service", () => {
  it("should upload a file", async () => {
    const result = await minioService.uploadFile("test.txt", Buffer.from("test content"), "text/plain");
    expect(result).toBeDefined();
  });
});

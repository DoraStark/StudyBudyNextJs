import handler from "../src/pages/api/profile";
import { createMocks } from "node-mocks-http";

describe("/api/profile", () => {
  it("returns profile data", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty("languages");
    expect(data).toHaveProperty("learn");
    expect(data).toHaveProperty("teach");
    expect(data).toHaveProperty("preferences");
  });
});


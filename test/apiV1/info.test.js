import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackInfo;

beforeAll(() => {
  talkbackInfo = talkbackStart();
});

afterAll(() => {
  talkbackInfo.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY
);

test("ApiV1Info details", async () => {
  const { status: status, body: responseBody } = await client.v1.info.details();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("api");
  expect(responseBody.api).toHaveProperty("version");
  expect(responseBody.settings).toHaveProperty("custom_templates");

  return responseBody;
});

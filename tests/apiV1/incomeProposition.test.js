import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackIncomeProposition;

beforeAll(() => {
  talkbackIncomeProposition = talkbackStart();
});

afterAll(() => {
  talkbackIncomeProposition.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY,
);

test("ApiV1Project all", async () => {
  const { status: status, body: responseBody } =
    await client.v1.incomeProposition.all();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  expect(responseBody).toHaveProperty("has_more");
  expect(responseBody).toHaveProperty("page");
  expect(responseBody).toHaveProperty("page_size");
  expect(responseBody).toHaveProperty("total_entries");
  expect(responseBody).toHaveProperty("total_pages");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody.entries.length).toBeGreaterThan(0);
  expect(responseBody.entries[0]).toHaveProperty("created_at");
  expect(responseBody.entries[0]).toHaveProperty("description");
  expect(responseBody.entries[0]).toHaveProperty("favorite");
  expect(responseBody.entries[0]).toHaveProperty("flagged");
  expect(responseBody.entries[0]).toHaveProperty("id");
  expect(responseBody.entries[0]).toHaveProperty("name");
  expect(responseBody.entries[0]).toHaveProperty("price");
  expect(responseBody.entries[0]).toHaveProperty("proposition_type");
  expect(responseBody.entries[0]).toHaveProperty("record_state");
  expect(responseBody.entries[0]).toHaveProperty("time_unit");
  expect(responseBody.entries[0]).toHaveProperty("type");
  expect(responseBody.entries[0]).toHaveProperty("unit_name_1");
  expect(responseBody.entries[0]).toHaveProperty("unit_name_n");
  expect(responseBody.entries[0]).toHaveProperty("updated_at");
  return responseBody;
});

test("ApiV1Project by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.incomeProposition.by({ id: 2 });

  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("id");
  return responseBody;
});

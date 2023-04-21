import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackIncomeEstimate;

beforeAll(() => {
  talkbackIncomeEstimate = talkbackStart();
});

afterAll(() => {
  talkbackIncomeEstimate.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY
);

test("IncomeEstimate by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.incomeEstimate.by({ id: 1 });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("billing");
  expect(responseBody.billing).toHaveProperty("city");
  expect(responseBody.billing).toHaveProperty("company");
  expect(responseBody.billing).toHaveProperty("contact_person");
  expect(responseBody.billing).toHaveProperty("country");
  expect(responseBody.billing).toHaveProperty("department");
  expect(responseBody.billing).toHaveProperty("email");
  expect(responseBody.billing).toHaveProperty("street");
  expect(responseBody.billing).toHaveProperty("ust_idnr");
  expect(responseBody.billing).toHaveProperty("zip");
  expect(responseBody).toHaveProperty("contact_person");
  expect(responseBody).toHaveProperty("custom_template");
  expect(responseBody).toHaveProperty("customer_no");
  expect(responseBody).toHaveProperty("description");
  expect(responseBody).toHaveProperty("document_date");
  expect(responseBody).toHaveProperty("estimate_no");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("line_items");
  expect(responseBody.line_items[0]).toHaveProperty("description");
  expect(responseBody.line_items[0]).toHaveProperty("line_item_type");
  expect(responseBody.line_items[0]).toHaveProperty("name");
  expect(responseBody.line_items[0]).toHaveProperty("position_in_group");
  expect(responseBody.line_items[1]).toHaveProperty("description");
  expect(responseBody.line_items[1]).toHaveProperty("line_item_type");
  expect(responseBody.line_items[1]).toHaveProperty("name");
  expect(responseBody.line_items[1]).toHaveProperty("position_in_group");
  expect(responseBody.line_items[1]).toHaveProperty("price");
  expect(responseBody.line_items[1]).toHaveProperty("proposition");
  expect(responseBody.line_items[1]).toHaveProperty("quantity");
  expect(responseBody.line_items[1]).toHaveProperty("total_net");
  expect(responseBody.line_items[1]).toHaveProperty("unit");
  expect(responseBody.line_items[1]).toHaveProperty("vat_rate");
  expect(responseBody).toHaveProperty("name");
  expect(responseBody).toHaveProperty("project");
  expect(responseBody.project).toHaveProperty("id");
  expect(responseBody.project).toHaveProperty("name");
  expect(responseBody.project).toHaveProperty("type");
  expect(responseBody).toHaveProperty("record_state");
  expect(responseBody).toHaveProperty("sent_on");
  expect(responseBody).toHaveProperty("sent_to");
  expect(responseBody).toHaveProperty("sent_via");
  expect(responseBody).toHaveProperty("state");
  expect(responseBody).toHaveProperty("total_gross");
  expect(responseBody).toHaveProperty("total_net");
  expect(responseBody).toHaveProperty("total_vat");
  expect(responseBody).toHaveProperty("type");
  return responseBody;
});

test("ApiV1IncomeEstimate all with orderBy", async () => {
  const { status: status, body: responseBody } =
    await client.v1.incomeEstimate.all({
      orderBy: "id",
      orderDirection: "desc",
    });
  expect(status).toBe(200);
  expect(responseBody.entries[0].id > responseBody.entries[1].id);
});

test("ApiV1IncomeEstimate all", async () => {
  const { status: status, body: responseBody } =
    await client.v1.incomeEstimate.all();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  expect(responseBody).toHaveProperty("has_more");
  expect(responseBody).toHaveProperty("page");
  expect(responseBody).toHaveProperty("page_size");
  expect(responseBody).toHaveProperty("total_entries");
  expect(responseBody).toHaveProperty("total_pages");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody.entries).toHaveLength(1);
  expect(responseBody.entries[0]).toHaveProperty("billing");
  expect(responseBody.entries[0].billing).toHaveProperty("city");
  expect(responseBody.entries[0].billing).toHaveProperty("company");
  expect(responseBody.entries[0].billing).toHaveProperty("contact_person");
  expect(responseBody.entries[0].billing).toHaveProperty("country");
  expect(responseBody.entries[0].billing).toHaveProperty("department");
  expect(responseBody.entries[0].billing).toHaveProperty("email");
  expect(responseBody.entries[0].billing).toHaveProperty("street");
  expect(responseBody.entries[0].billing).toHaveProperty("ust_idnr");
  expect(responseBody.entries[0].billing).toHaveProperty("zip");
  expect(responseBody.entries[0]).toHaveProperty("custom_template");
  expect(responseBody.entries[0]).toHaveProperty("customer_no");
  expect(responseBody.entries[0]).toHaveProperty("description");
  expect(responseBody.entries[0]).toHaveProperty("document_date");
  expect(responseBody.entries[0]).toHaveProperty("estimate_no");
  expect(responseBody.entries[0]).toHaveProperty("id");
  expect(responseBody.entries[0]).toHaveProperty("name");
  expect(responseBody.entries[0]).toHaveProperty("record_state");
  expect(responseBody.entries[0]).toHaveProperty("sent_on");
  expect(responseBody.entries[0]).toHaveProperty("sent_to");
  expect(responseBody.entries[0]).toHaveProperty("sent_via");
  expect(responseBody.entries[0]).toHaveProperty("state");
  expect(responseBody.entries[0]).toHaveProperty("total_gross");
  expect(responseBody.entries[0]).toHaveProperty("total_net");
  expect(responseBody.entries[0]).toHaveProperty("total_vat");
  expect(responseBody.entries[0]).toHaveProperty("type");
  return responseBody;
});

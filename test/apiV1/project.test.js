import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackProject;

beforeAll(() => {
  talkbackProject = talkbackStart();
});

afterAll(() => {
  talkbackProject.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY
);

test("ApiV1Project all", async () => {
  const { status: status, body: responseBody } = await client.v1.project.all();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  return responseBody;
});

test("ApiV1Project by id", async () => {
  const { status: status, body: responseBody } = await client.v1.project.by({
    id: 3,
  });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("budget_money");
  expect(responseBody).toHaveProperty("budget_time");
  expect(responseBody).toHaveProperty("budget_time_unit");
  expect(responseBody).toHaveProperty("budget_type");
  expect(responseBody).toHaveProperty("color");
  expect(responseBody).toHaveProperty("company_id");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("customer");
  expect(responseBody.customer).toHaveProperty("bank_account_no");
  expect(responseBody.customer).toHaveProperty("bank_bic");
  expect(responseBody.customer).toHaveProperty("bank_blz");
  expect(responseBody.customer).toHaveProperty("bank_iban");
  expect(responseBody.customer).toHaveProperty("bank_institute");
  expect(responseBody.customer).toHaveProperty("bank_sepa_mandate_accepted");
  expect(responseBody.customer).toHaveProperty("bank_sepa_mandate_reference");
  expect(responseBody.customer).toHaveProperty("color");
  expect(responseBody.customer).toHaveProperty("contact_type");
  expect(responseBody.customer).toHaveProperty("created_at");
  expect(responseBody.customer).toHaveProperty("customer_no");
  expect(responseBody.customer).toHaveProperty("delivery_method");
  expect(responseBody.customer).toHaveProperty("email");
  expect(responseBody.customer).toHaveProperty("fax");
  expect(responseBody.customer).toHaveProperty("flagged");
  expect(responseBody.customer).toHaveProperty("id");
  expect(responseBody.customer).toHaveProperty("inbound_address");
  expect(responseBody.customer).toHaveProperty("logo_content_type");
  expect(responseBody.customer).toHaveProperty("logo_file_name");
  expect(responseBody.customer).toHaveProperty("logo_file_size");
  expect(responseBody.customer).toHaveProperty("logo_updated_at");
  expect(responseBody.customer).toHaveProperty("name");
  expect(responseBody.customer).toHaveProperty("notes");
  expect(responseBody.customer).toHaveProperty("phone");
  expect(responseBody.customer).toHaveProperty("physical_city");
  expect(responseBody.customer).toHaveProperty("physical_country");
  expect(responseBody.customer).toHaveProperty("physical_street");
  expect(responseBody.customer).toHaveProperty("physical_zip");
  expect(responseBody.customer).toHaveProperty("postal_city");
  expect(responseBody.customer).toHaveProperty("postal_country");
  expect(responseBody.customer).toHaveProperty("postal_street");
  expect(responseBody.customer).toHaveProperty("postal_zip");
  expect(responseBody.customer).toHaveProperty("record_state");
  expect(responseBody.customer).toHaveProperty("supplier_no");
  expect(responseBody.customer).toHaveProperty("twitter");
  expect(responseBody.customer).toHaveProperty("type");
  expect(responseBody.customer).toHaveProperty("updated_at");
  expect(responseBody.customer).toHaveProperty("ust_idnr");
  expect(responseBody.customer).toHaveProperty("website");
  expect(responseBody).toHaveProperty("customer_default");
  expect(responseBody).toHaveProperty("default_proposition");
  expect(responseBody).toHaveProperty("description");
  expect(responseBody).toHaveProperty("end_date");
  expect(responseBody).toHaveProperty("flagged");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("invoices");
  expect(responseBody.invoices).toHaveProperty("entries");
  expect(responseBody.invoices.entries[0]).toHaveProperty("id");
  expect(responseBody.invoices.entries[0]).toHaveProperty("name");
  expect(responseBody.invoices.entries[0]).toHaveProperty("type");
  expect(responseBody.invoices).toHaveProperty("has_more");
  expect(responseBody.invoices).toHaveProperty("type");
  expect(responseBody.invoices).toHaveProperty("url");
  expect(responseBody).toHaveProperty("name");
  expect(responseBody).toHaveProperty("record_state");
  expect(responseBody).toHaveProperty("start_date");
  expect(responseBody).toHaveProperty("tasks");
  expect(responseBody.tasks).toHaveProperty("entries");
  expect(responseBody.tasks.entries[0]).toHaveProperty("id");
  expect(responseBody.tasks.entries[0]).toHaveProperty("name");
  expect(responseBody.tasks.entries[0]).toHaveProperty("project_id");
  expect(responseBody.tasks.entries[0]).toHaveProperty("type");
  expect(responseBody.tasks).toHaveProperty("has_more");
  expect(responseBody.tasks).toHaveProperty("type");
  expect(responseBody.tasks).toHaveProperty("url");
  expect(responseBody).toHaveProperty("team_members");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("vouchers");
  expect(responseBody.vouchers).toHaveProperty("entries");
  if (responseBody.vouchers.entries.length > 0) {
    expect(responseBody.vouchers.entries[0]).toHaveProperty("id");
    expect(responseBody.vouchers.entries[0]).toHaveProperty("name");
    expect(responseBody.vouchers.entries[0]).toHaveProperty("type");
  }
  expect(responseBody.vouchers).toHaveProperty("has_more");
  expect(responseBody.vouchers).toHaveProperty("type");
  expect(responseBody.vouchers).toHaveProperty("url");
  return responseBody;
});

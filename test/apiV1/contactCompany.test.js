import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start";
let talkbackContactCompany;

beforeAll(() => {
  talkbackContactCompany = talkbackStart();
});

afterAll(() => {
  talkbackContactCompany.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY
);

test("ContactCompany by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.contactCompany.by({
      id: 3,
    });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody).toHaveProperty("name");
  expect(responseBody).toHaveProperty("contact_type");
  expect(responseBody).toHaveProperty("supplier_no");
  expect(responseBody).toHaveProperty("customer_no");
  expect(responseBody).toHaveProperty("email");
  expect(responseBody).toHaveProperty("phone");
  expect(responseBody).toHaveProperty("website");
  expect(responseBody).toHaveProperty("twitter");
  expect(responseBody).toHaveProperty("fax");
  expect(responseBody).toHaveProperty("postal_street");
  expect(responseBody).toHaveProperty("postal_zip");
  expect(responseBody).toHaveProperty("postal_city");
  expect(responseBody).toHaveProperty("postal_country");
  expect(responseBody).toHaveProperty("physical_street");
  expect(responseBody).toHaveProperty("physical_zip");
  expect(responseBody).toHaveProperty("physical_city");
  expect(responseBody).toHaveProperty("physical_country");
  expect(responseBody).toHaveProperty("delivery_method");
  expect(responseBody).toHaveProperty("ust_idnr");
  expect(responseBody).toHaveProperty("logo_file_name");
  expect(responseBody).toHaveProperty("logo_content_type");
  expect(responseBody).toHaveProperty("logo_file_size");
  expect(responseBody).toHaveProperty("logo_updated_at");
  expect(responseBody).toHaveProperty("bank_blz");
  expect(responseBody).toHaveProperty("bank_institute");
  expect(responseBody).toHaveProperty("bank_account_no");
  expect(responseBody).toHaveProperty("bank_bic");
  expect(responseBody).toHaveProperty("bank_sepa_mandate_reference");
  expect(responseBody).toHaveProperty("bank_sepa_mandate_accepted");
  expect(responseBody).toHaveProperty("bank_iban");
  expect(responseBody).toHaveProperty("inbound_address");
  expect(responseBody).toHaveProperty("notes");
  expect(responseBody).toHaveProperty("record_state");
  expect(responseBody).toHaveProperty("flagged");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("color");
  expect(responseBody).toHaveProperty("people");
  expect(responseBody.people).toHaveProperty("type");
  expect(responseBody.people).toHaveProperty("has_more");
  expect(responseBody.people).toHaveProperty("url");
  expect(responseBody.people.entries).toHaveLength(1);
  expect(responseBody.people.entries[0]).toHaveProperty("type");
  expect(responseBody.people.entries[0]).toHaveProperty("id");
  expect(responseBody.people.entries[0]).toHaveProperty("first_name");
  expect(responseBody.people.entries[0]).toHaveProperty("last_name");

  expect(responseBody).toHaveProperty("projects");
  expect(responseBody.projects).toHaveProperty("type");
  expect(responseBody.projects).toHaveProperty("has_more");
  expect(responseBody.projects).toHaveProperty("url");
  expect(responseBody.projects.entries).toHaveLength(3);
  expect(responseBody.projects.entries[0]).toHaveProperty("type");
  expect(responseBody.projects.entries[0]).toHaveProperty("id");
  expect(responseBody.projects.entries[0]).toHaveProperty("name");

  expect(responseBody).toHaveProperty("invoices");
  expect(responseBody.invoices).toHaveProperty("type");
  expect(responseBody.invoices).toHaveProperty("has_more");
  expect(responseBody.invoices).toHaveProperty("url");
  expect(responseBody.invoices.entries).toHaveLength(10);
  expect(responseBody.invoices.entries[0]).toHaveProperty("type");
  expect(responseBody.invoices.entries[0]).toHaveProperty("id");
  expect(responseBody.invoices.entries[0]).toHaveProperty("name");

  expect(responseBody).toHaveProperty("vouchers");
  expect(responseBody.vouchers).toHaveProperty("type");
  expect(responseBody.vouchers).toHaveProperty("has_more");
  expect(responseBody.vouchers).toHaveProperty("url");
  expect(responseBody.vouchers.entries).toHaveLength(0);

  return responseBody;
});

test("ContactCompany all", async () => {
  const {
    status: status,
    body: responseBody,
    remainingQuota,
  } = await client.v1.contactCompany.all();
  expect(responseBody).toBeDefined();
  expect(status).toBe(200);
  expect(remainingQuota > 0).toBe(true);
  expect(typeof remainingQuota).toBe("number");
  expect(responseBody).toHaveProperty("entries");
  expect(responseBody).toHaveProperty("has_more");
  expect(responseBody).toHaveProperty("page");
  expect(responseBody).toHaveProperty("page_size");
  expect(responseBody).toHaveProperty("total_entries");
  expect(responseBody).toHaveProperty("total_pages");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody.entries).toHaveLength(1);
  expect(responseBody.entries[0]).toHaveProperty("id");
  expect(responseBody.entries[0]).toHaveProperty("name");
  expect(responseBody.entries[0]).toHaveProperty("type");
  expect(responseBody.entries[0].id).toBe(3);
  expect(responseBody.entries[0].name).toBe("Büffelranch Johnny");
  expect(responseBody.entries[0].type).toBe("company");
  expect(responseBody.has_more).toBe(false);
  expect(responseBody.page).toBe(1);
  expect(responseBody.page_size).toBe(100);
  expect(responseBody.total_entries).toBe(1);
  expect(responseBody.total_pages).toBe(1);
  expect(responseBody.type).toBe("list");
  return responseBody;
});

test("ApiV1BankConnection all with orderBy, orderDirection and dateRange", async () => {
  const { status: status, body: responseBody } =
    await client.v1.contactCompany.all({
      orderBy: "created_at",
      orderDirection: "desc",
    });

  expect(status).toBe(200);
});

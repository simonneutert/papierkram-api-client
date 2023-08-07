import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start";
let talkbackContactCompanyPerson;

beforeAll(() => {
  talkbackContactCompanyPerson = talkbackStart();
});

afterAll(() => {
  talkbackContactCompanyPerson.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY,
);

test("ContactCompanyPerson by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.contactCompanyPerson.by({
      contactCompanyId: 3,
      id: 3,
    });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody.type).toBe("person");

  expect(responseBody).toHaveProperty("first_name");
  expect(responseBody).toHaveProperty("last_name");
  expect(responseBody).toHaveProperty("title");
  expect(responseBody).toHaveProperty("salutation");
  expect(responseBody).toHaveProperty("position");
  expect(responseBody).toHaveProperty("department");
  expect(responseBody).toHaveProperty("phone");
  expect(responseBody).toHaveProperty("skype");
  expect(responseBody).toHaveProperty("fax");
  expect(responseBody).toHaveProperty("email");
  expect(responseBody).toHaveProperty("flagged");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("mobile");
  expect(responseBody).toHaveProperty("comment");
  expect(responseBody).toHaveProperty("default");
  expect(responseBody).toHaveProperty("company");
  expect(responseBody.company).toHaveProperty("type");
  expect(responseBody.company.type).toBe("company");
  expect(responseBody.company).toHaveProperty("id");
  expect(responseBody.company).toHaveProperty("name");
  expect(responseBody.company).toHaveProperty("contact_type");
  expect(responseBody.company).toHaveProperty("supplier_no");
  expect(responseBody.company).toHaveProperty("customer_no");
  expect(responseBody.company).toHaveProperty("email");
  expect(responseBody.company).toHaveProperty("phone");
  expect(responseBody.company).toHaveProperty("website");
  expect(responseBody.company).toHaveProperty("twitter");
  expect(responseBody.company).toHaveProperty("fax");
  expect(responseBody.company).toHaveProperty("postal_street");
  expect(responseBody.company).toHaveProperty("postal_zip");
  expect(responseBody.company).toHaveProperty("postal_city");
  expect(responseBody.company).toHaveProperty("postal_country");
  expect(responseBody.company).toHaveProperty("physical_street");
  expect(responseBody.company).toHaveProperty("physical_zip");
  expect(responseBody.company).toHaveProperty("physical_city");
  expect(responseBody.company).toHaveProperty("physical_country");
  expect(responseBody.company).toHaveProperty("delivery_method");
  expect(responseBody.company).toHaveProperty("ust_idnr");
  expect(responseBody.company).toHaveProperty("logo_file_name");
  expect(responseBody.company).toHaveProperty("logo_content_type");
  expect(responseBody.company).toHaveProperty("logo_file_size");
  expect(responseBody.company).toHaveProperty("logo_updated_at");
  expect(responseBody.company).toHaveProperty("bank_blz");
  expect(responseBody.company).toHaveProperty("bank_institute");
  expect(responseBody.company).toHaveProperty("bank_account_no");
  expect(responseBody.company).toHaveProperty("bank_bic");
  expect(responseBody.company).toHaveProperty("bank_sepa_mandate_reference");
  expect(responseBody.company).toHaveProperty("bank_sepa_mandate_accepted");
  expect(responseBody.company).toHaveProperty("bank_iban");
  expect(responseBody.company).toHaveProperty("inbound_address");
  expect(responseBody.company).toHaveProperty("notes");
  expect(responseBody.company).toHaveProperty("record_state");
  expect(responseBody.company).toHaveProperty("flagged");
  expect(responseBody.company).toHaveProperty("created_at");
  expect(responseBody.company).toHaveProperty("updated_at");
  expect(responseBody.company).toHaveProperty("color");

  return responseBody;
});

test("ContactCompanyPerson all", async () => {
  const {
    status: status,
    body: responseBody,
    remainingQuota,
  } = await client.v1.contactCompanyPerson.all({ contactCompanyId: 3 });
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
  expect(responseBody.entries[0]).toHaveProperty("type");
  expect(responseBody.entries[0].id).toBe(3);
  expect(responseBody.entries[0].type).toBe("person");
  expect(responseBody.has_more).toBe(false);
  expect(responseBody.page).toBe(1);
  expect(responseBody.page_size).toBe(100);
  expect(responseBody.total_entries).toBe(1);
  expect(responseBody.total_pages).toBe(1);
  expect(responseBody.type).toBe("list");
  return responseBody;
});

test("BankConnectionPerson all with orderBy, orderDirection and dateRange", async () => {
  const { status: status, body: responseBody } =
    await client.v1.contactCompany.all({
      orderBy: "created_at",
      orderDirection: "desc",
    });

  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
});

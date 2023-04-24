import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start";
let talkbackBankConnection;

beforeAll(() => {
  talkbackBankConnection = talkbackStart();
});

afterAll(() => {
  talkbackBankConnection.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY
);

test("BankConnection by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.bankConnection.by({
      id: 4,
    });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("account_no");
  expect(responseBody).toHaveProperty("account_type");
  expect(responseBody).toHaveProperty("bic");
  expect(responseBody).toHaveProperty("blz");
  expect(responseBody).toHaveProperty("connection_type");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("customer_id");
  expect(responseBody).toHaveProperty("hbci");
  expect(responseBody).toHaveProperty("hbci_host_url");
  expect(responseBody).toHaveProperty("hbci_version");
  expect(responseBody).toHaveProperty("iban");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("primary");
  expect(responseBody).toHaveProperty("title");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("user_id");
  // expect(responseBody.account_no).toBe("123456789");
  expect(responseBody.account_type).toBe("default");
  // expect(responseBody.bic).toBe("ABCDEFGH");
  // expect(responseBody.blz).toBe("12345678");
  expect(responseBody.connection_type).toBe("default");
  return responseBody;
});

test("ApiV1BankConnection all", async () => {
  const {
    status: status,
    body: responseBody,
    remainingQuota,
  } = await client.v1.bankConnection.all();
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
  expect(responseBody.entries[0].id).toBe(4);
  expect(responseBody.entries[0].name).toBe("Standard");
  expect(responseBody.entries[0].type).toBe("bank_connection");
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
    await client.v1.bankConnection.all({
      orderBy: "created_at",
      orderDirection: "desc",
    });

  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
});

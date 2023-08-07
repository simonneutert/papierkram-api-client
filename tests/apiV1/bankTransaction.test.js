import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start";
let talkbackBankTransaction;

beforeAll(() => {
  talkbackBankTransaction = talkbackStart();
});

afterAll(() => {
  talkbackBankTransaction.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY,
);

test("BankConnection by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.bankTransaction.by({
      id: 4,
    });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();

  expect(responseBody).toHaveProperty("bank_connection");
  expect(responseBody).toHaveProperty("bdate");
  expect(responseBody).toHaveProperty("categories");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("currency");
  expect(responseBody).toHaveProperty("customerref");
  expect(responseBody).toHaveProperty("fintecapi_turnover_id");
  expect(responseBody).toHaveProperty("from");
  expect(responseBody.from).toHaveProperty("account_no");
  expect(responseBody.from).toHaveProperty("bic");
  expect(responseBody.from).toHaveProperty("blz");
  expect(responseBody.from).toHaveProperty("currency");
  expect(responseBody.from).toHaveProperty("iban");
  expect(responseBody.from).toHaveProperty("name");
  expect(responseBody).toHaveProperty("gvcode");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("imported_at");
  expect(responseBody).toHaveProperty("instref");
  expect(responseBody).toHaveProperty("primanota");
  expect(responseBody).toHaveProperty("saldo");
  expect(responseBody.saldo).toHaveProperty("currency");
  expect(responseBody.saldo).toHaveProperty("timestamp");
  expect(responseBody.saldo).toHaveProperty("value");
  expect(responseBody).toHaveProperty("seen");
  expect(responseBody).toHaveProperty("sepa");
  expect(responseBody).toHaveProperty("state");
  expect(responseBody).toHaveProperty("storno");
  expect(responseBody).toHaveProperty("tags");
  expect(responseBody).toHaveProperty("text");
  expect(responseBody).toHaveProperty("transaction_type");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("usage");
  expect(responseBody).toHaveProperty("value");

  return responseBody;
});

test("BankTransaction all", async () => {
  const {
    status: status,
    body: responseBody,
    remainingQuota,
  } = await client.v1.bankTransaction.all({ page: 1, pageSize: 2 });
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

  return responseBody;
});

test("BankTransaction all with orderBy, orderDirection and dateRange", async () => {
  const { status: status, body: responseBody } =
    await client.v1.bankTransaction.all({
      page: 1,
      pageSize: 2,
      orderBy: "created_at",
      orderDirection: "desc",
    });

  expect(status).toBe(200);

  expect(responseBody).toBeDefined();

  expect(responseBody).toHaveProperty("entries");
  expect(responseBody).toHaveProperty("has_more");
  expect(responseBody).toHaveProperty("page");
  expect(responseBody).toHaveProperty("page_size");
  expect(responseBody).toHaveProperty("total_entries");
  expect(responseBody).toHaveProperty("total_pages");
  expect(responseBody).toHaveProperty("type");

  expect(responseBody.entries[0]).toHaveProperty("bank_connection");
  expect(responseBody.entries[0].bank_connection).toHaveProperty("id");
  expect(responseBody.entries[0].bank_connection).toHaveProperty("name");
  expect(responseBody.entries[0].bank_connection).toHaveProperty("type");
  expect(responseBody.entries[0]).toHaveProperty("bdate");
  expect(responseBody.entries[0]).toHaveProperty("categories");
  expect(responseBody.entries[0]).toHaveProperty("created_at");
  expect(responseBody.entries[0]).toHaveProperty("currency");
  expect(responseBody.entries[0]).toHaveProperty("customerref");
  expect(responseBody.entries[0]).toHaveProperty("fintecapi_turnover_id");
  expect(responseBody.entries[0]).toHaveProperty("from");
  expect(responseBody.entries[0].from).toHaveProperty("account_no");
  expect(responseBody.entries[0].from).toHaveProperty("bic");
  expect(responseBody.entries[0].from).toHaveProperty("blz");
  expect(responseBody.entries[0].from).toHaveProperty("currency");
  expect(responseBody.entries[0].from).toHaveProperty("iban");
  expect(responseBody.entries[0].from).toHaveProperty("name");
  expect(responseBody.entries[0]).toHaveProperty("gvcode");
  expect(responseBody.entries[0]).toHaveProperty("id");
  expect(responseBody.entries[0]).toHaveProperty("imported_at");
  expect(responseBody.entries[0]).toHaveProperty("instref");
  expect(responseBody.entries[0]).toHaveProperty("primanota");
  expect(responseBody.entries[0]).toHaveProperty("saldo");
  expect(responseBody.entries[0].saldo).toHaveProperty("currency");
  expect(responseBody.entries[0].saldo).toHaveProperty("timestamp");
  expect(responseBody.entries[0].saldo).toHaveProperty("value");
  expect(responseBody.entries[0]).toHaveProperty("seen");
  expect(responseBody.entries[0]).toHaveProperty("sepa");
  expect(responseBody.entries[0]).toHaveProperty("state");
  expect(responseBody.entries[0]).toHaveProperty("storno");
  expect(responseBody.entries[0]).toHaveProperty("tags");
  expect(responseBody.entries[0]).toHaveProperty("text");
  expect(responseBody.entries[0]).toHaveProperty("transaction_type");
  expect(responseBody.entries[0]).toHaveProperty("type");
  expect(responseBody.entries[0]).toHaveProperty("updated_at");
  expect(responseBody.entries[0]).toHaveProperty("usage");
  expect(responseBody.entries[0]).toHaveProperty("value");
  expect(responseBody.entries[0]).toHaveProperty("valuta");
  expect(responseBody).toHaveProperty("has_more");
  expect(responseBody).toHaveProperty("page");
  expect(responseBody).toHaveProperty("page_size");
  expect(responseBody).toHaveProperty("total_entries");
  expect(responseBody).toHaveProperty("total_pages");
  expect(responseBody).toHaveProperty("type");
});

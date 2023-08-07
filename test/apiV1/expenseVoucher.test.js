import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackExpenseVoucher;

beforeAll(() => {
  talkbackExpenseVoucher = talkbackStart();
});

afterAll(() => {
  talkbackExpenseVoucher.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY,
);

test("ExpenseVoucher by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.expenseVoucher.by({ id: 7 });

  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("amount");
  expect(responseBody).toHaveProperty("creditor");
  expect(responseBody).toHaveProperty("description");
  expect(responseBody).toHaveProperty("document_date");
  expect(responseBody).toHaveProperty("documents");
  expect(responseBody).toHaveProperty("due_date");
  expect(responseBody).toHaveProperty("entertainment_persons");
  expect(responseBody).toHaveProperty("entertainment_reason");
  expect(responseBody).toHaveProperty("flagged");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("invoice_amount");
  expect(responseBody).toHaveProperty("line_items");
  expect(responseBody.line_items).toHaveLength(1);
  expect(responseBody.line_items[0]).toHaveProperty("amount");
  expect(responseBody.line_items[0]).toHaveProperty("billing");
  expect(responseBody.line_items[0]).toHaveProperty("depreciation");
  expect(responseBody.line_items[0]).toHaveProperty("name");
  expect(responseBody.line_items[0]).toHaveProperty("vat_rate");
  expect(responseBody).toHaveProperty("name");
  expect(responseBody).toHaveProperty("provenance");
  expect(responseBody).toHaveProperty("record_state");
  expect(responseBody).toHaveProperty("state");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody).toHaveProperty("voucher_no");
  return responseBody;
});

test("ApiV1ExpenseVoucher all", async () => {
  const { status: status, body: responseBody } =
    await client.v1.expenseVoucher.all();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  expect(responseBody).toHaveProperty("has_more");
  expect(responseBody).toHaveProperty("page");
  expect(responseBody).toHaveProperty("page_size");
  expect(responseBody).toHaveProperty("total_entries");
  expect(responseBody).toHaveProperty("total_pages");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody.entries).toHaveLength(100);
  expect(responseBody.entries[0]).toHaveProperty("amount");
  expect(responseBody.entries[0]).toHaveProperty("description");
  expect(responseBody.entries[0]).toHaveProperty("document_date");
  expect(responseBody.entries[0]).toHaveProperty("due_date");
  expect(responseBody.entries[0]).toHaveProperty("entertainment_persons");
  expect(responseBody.entries[0]).toHaveProperty("entertainment_reason");
  expect(responseBody.entries[0]).toHaveProperty("flagged");
  expect(responseBody.entries[0]).toHaveProperty("id");
  expect(responseBody.entries[0]).toHaveProperty("invoice_amount");
  expect(responseBody.entries[0]).toHaveProperty("name");
  expect(responseBody.entries[0]).toHaveProperty("provenance");
  expect(responseBody.entries[0]).toHaveProperty("record_state");
  expect(responseBody.entries[0]).toHaveProperty("state");
  expect(responseBody.entries[0]).toHaveProperty("type");
  expect(responseBody.entries[0]).toHaveProperty("voucher_no");
  return responseBody;
});

test("ApiV1ExpenseVoucher all with orderBy, orderDirection and dateRange", async () => {
  const dateString = "2020-01-07";
  const { status: status, body: responseBody } =
    await client.v1.expenseVoucher.all({
      orderBy: "amount",
      orderDirection: "desc",
      documentDateRangeStart: dateString,
      documentDateRangeEnd: dateString,
    });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  expect(responseBody.entries.map((voucher) => voucher.document_date)).toEqual([
    dateString,
  ]);
  return responseBody;
});

test("ApiV1ExpenseVoucher all with orderBy, orderDirection by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.expenseVoucher.all({
      orderBy: "id",
      orderDirection: "desc",
    });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  expect(responseBody.entries[0].id > responseBody.entries[1].id).toBe(true);
  return responseBody;
});

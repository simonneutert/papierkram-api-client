import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackTrackerTask;

beforeAll(() => {
  talkbackTrackerTask = talkbackStart();
});

afterAll(() => {
  talkbackTrackerTask.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY,
);

test("ApiV1TrackerTask all", async () => {
  const { status: status, body: responseBody } =
    await client.v1.trackerTask.all();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  return responseBody;
});

test("ApiV1TrackerTask by id", async () => {
  const { status: status, body: responseBody } = await client.v1.trackerTask.by(
    { id: 1 },
  );
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("complete");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("deadline");
  expect(responseBody).toHaveProperty("flagged");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("name");
  expect(responseBody).toHaveProperty("project");
  expect(responseBody.project).toHaveProperty("budget_money");
  expect(responseBody.project).toHaveProperty("budget_time");
  expect(responseBody.project).toHaveProperty("budget_time_unit");
  expect(responseBody.project).toHaveProperty("budget_type");
  expect(responseBody.project).toHaveProperty("color");
  expect(responseBody.project).toHaveProperty("company_id");
  expect(responseBody.project).toHaveProperty("created_at");
  expect(responseBody.project).toHaveProperty("customer_default");
  expect(responseBody.project).toHaveProperty("description");
  expect(responseBody.project).toHaveProperty("end_date");
  expect(responseBody.project).toHaveProperty("flagged");
  expect(responseBody.project).toHaveProperty("id");
  expect(responseBody.project).toHaveProperty("name");
  expect(responseBody.project).toHaveProperty("record_state");
  expect(responseBody.project).toHaveProperty("start_date");
  expect(responseBody.project).toHaveProperty("type");
  expect(responseBody.project).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("project_id");
  expect(responseBody.project.id).toBe(responseBody.project_id);
  expect(responseBody).toHaveProperty("proposition");
  expect(responseBody.proposition).toHaveProperty("created_at");
  expect(responseBody.proposition).toHaveProperty("description");
  expect(responseBody.proposition).toHaveProperty("favorite");
  expect(responseBody.proposition).toHaveProperty("flagged");
  expect(responseBody.proposition).toHaveProperty("id");
  expect(responseBody.proposition).toHaveProperty("name");
  expect(responseBody.proposition).toHaveProperty("price");
  expect(responseBody.proposition).toHaveProperty("proposition_type");
  expect(responseBody.proposition).toHaveProperty("record_state");
  expect(responseBody.proposition).toHaveProperty("time_unit");
  expect(responseBody.proposition).toHaveProperty("type");
  expect(responseBody.proposition).toHaveProperty("unit_name_1");
  expect(responseBody.proposition).toHaveProperty("unit_name_n");
  expect(responseBody.proposition).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("record_state");
  expect(responseBody).toHaveProperty("relative_costs");
  expect(responseBody).toHaveProperty("type");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("user");
  expect(responseBody.user).toHaveProperty("email");
  expect(responseBody.user).toHaveProperty("first_name");
  expect(responseBody.user).toHaveProperty("full_name");
  expect(responseBody.user).toHaveProperty("id");
  expect(responseBody.user).toHaveProperty("last_name");
  expect(responseBody.user).toHaveProperty("role_f");
  expect(responseBody.user).toHaveProperty("type");
  expect(responseBody.user.type).toBe("user");

  return responseBody;
});

import PapierkramApiClientV1 from "../../index";
import talkbackStart from "../talkback-start.js";

let talkbackTrackerTimeEntry;

beforeAll(() => {
  talkbackTrackerTimeEntry = talkbackStart();
});

afterAll(() => {
  talkbackTrackerTimeEntry.close();
});

const client = new PapierkramApiClientV1(
  process.env.PAPIERKRAM_API_SUBDOMAIN,
  process.env.PAPIERKRAM_API_KEY
);

test("ApiV1TrackerTimeEntry all", async () => {
  const { status: status, body: responseBody } =
    await client.v1.trackerTimeEntry.all();
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("entries");
  return responseBody;
});

test("ApiV1TrackerTimeEntry by id", async () => {
  const { status: status, body: responseBody } =
    await client.v1.trackerTimeEntry.by({ id: 1 });
  expect(status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("billable_duration");
  expect(responseBody).toHaveProperty("comments");
  expect(responseBody).toHaveProperty("created_at");
  expect(responseBody).toHaveProperty("duration");
  expect(responseBody).toHaveProperty("ended_at");
  expect(responseBody).toHaveProperty("fingerprint");
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("invoice");
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
  expect(responseBody).toHaveProperty("started_at");
  expect(responseBody).toHaveProperty("task");
  expect(responseBody.task).toHaveProperty("complete");
  expect(responseBody.task).toHaveProperty("created_at");
  expect(responseBody.task).toHaveProperty("deadline");
  expect(responseBody.task).toHaveProperty("flagged");
  expect(responseBody.task).toHaveProperty("id");
  expect(responseBody.task).toHaveProperty("name");
  expect(responseBody.task).toHaveProperty("project_id");
  expect(responseBody.task).toHaveProperty("record_state");
  expect(responseBody.task).toHaveProperty("relative_costs");
  expect(responseBody.task).toHaveProperty("type");
  expect(responseBody.task).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("task_id");
  expect(responseBody.task.id).toBe(responseBody.task_id);
  expect(responseBody).toHaveProperty("type");
  expect(responseBody.type).toBe("time_entry");
  expect(responseBody).toHaveProperty("unbillable");
  expect(responseBody).toHaveProperty("updated_at");
  expect(responseBody).toHaveProperty("user");
  expect(responseBody.user).toHaveProperty("email");
  expect(responseBody.user).toHaveProperty("first_name");
  expect(responseBody.user).toHaveProperty("full_name");
  expect(responseBody.user).toHaveProperty("id");
  expect(responseBody.user).toHaveProperty("last_name");
  expect(responseBody.user).toHaveProperty("role_f");
  expect(responseBody.user).toHaveProperty("type");
  expect(responseBody).toHaveProperty("user_id");
  return responseBody;
});

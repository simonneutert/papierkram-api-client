import ApiV1Client from "./apiV1Client";
import fetch from "node-fetch";

class TrackerTimeEntry extends ApiV1Client {
  constructor(client) {
    super(client);
  }

  async by({ id }) {
    const url = this.buildBaseUri(`/tracker/time_entries/${id}`);
    const response = await fetch(url, {
      headers: {
        method: "GET",
        Accept: "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
    });
    return await this.richResponse(response);
  }

  async all(config = {}) {
    const params = {
      page: config.page || 1,
      page_size: config.pageSize || 100,
    };
    if (config.orderBy) {
      params.orderDirection = config.orderDirection || "asc";
      params.order_by = config.orderBy;
    }
    if (config.orderDirection) {
      this.paramValidator.orderDirection(config.orderDirection);
      params.order_direction = config.orderDirection;
    }
    if (config.projectId) {
      params.project_id = config.projectId;
    }
    if (config.taskId) {
      params.task_id = config.taskId;
    }
    if (config.invoiceId) {
      params.invoice_id = config.invoiceId;
    }
    if (config.userId) {
      params.user_id = config.userId;
    }
    if (config.billingState) {
      this.paramValidator.billingState(config.billingState);
      params.billing_state = config.billingState;
    }
    if (config.startTimeRangeStart) {
      params.start_time_range_start = config.startTimeRangeStart;
    }
    if (config.startTimeRangeEnd) {
      params.start_time_range_end = config.startTimeRangeEnd;
    }

    const url = this.buildBaseUri(`/tracker/time_entries`, params);
    const response = await fetch(url, {
      headers: {
        method: "GET",
        Accept: "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
    });
    return await this.richResponse(response);
  }
}

export default TrackerTimeEntry;

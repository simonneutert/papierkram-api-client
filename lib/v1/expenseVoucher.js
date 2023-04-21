import ApiV1Client from "./apiV1Client";
import ParamValidator from "./paramValidator";
import fetch from "node-fetch";

class ExpenseVoucher extends ApiV1Client {
  constructor(client) {
    super(client);
    this.paramValidator = new ParamValidator();
  }

  async by({ id }) {
    const url = this.buildBaseUri(`/expense/vouchers/${id}`);
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
    if (config.creditorId) {
      params.creditor_id = config.creditorId;
    }
    if (config.projectId) {
      params.project_id = config.projectId;
    }
    if (config.documentDateRangeStart) {
      params.document_date_range_start = config.documentDateRangeStart;
    }
    if (config.documentDateRangeEnd) {
      params.document_date_range_end = config.documentDateRangeEnd;
    }

    const url = this.buildBaseUri(`/expense/vouchers`, params);
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

export default ExpenseVoucher;

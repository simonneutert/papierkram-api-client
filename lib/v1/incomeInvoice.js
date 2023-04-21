import ApiV1Client from "./apiV1Client";
import fetch from "node-fetch";

class IncomeInvoices extends ApiV1Client {
  constructor(client) {
    super(client);
  }

  async by({ id }) {
    const url = this.buildBaseUri(`/income/invoices/${id}`);
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
      params.order_direction = config.orderDirection;
    }
    if (config.companyId) {
      params.company_id = config.companyId;
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

    const url = this.buildBaseUri(`/income/invoices`, params);
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

export default IncomeInvoices;

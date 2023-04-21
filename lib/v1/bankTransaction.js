import ApiV1Client from "./apiV1Client";
import fetch from "node-fetch";

class BankTransaction extends ApiV1Client {
  constructor(client) {
    super(client);
  }

  async by({ id }) {
    const url = this.buildBaseUri(`/banking/transactions/${id}`);
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
    if (config.bankConnectionId) {
      params.bank_connection_id = config.bankConnectionId;
    }
    if (config.orderBy) {
      params.order_direction = config.orderDirection || "asc";
      params.order_by = config.orderBy;
    }
    if (config.orderDirection) {
      this.paramValidator.orderDirection(config.orderDirection);
      params.order_direction = config.orderDirection;
    }
    const url = this.buildBaseUri(`/banking/transactions`, params);
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

export default BankTransaction;

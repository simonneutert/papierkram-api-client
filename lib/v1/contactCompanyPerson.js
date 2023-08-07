import ApiV1Client from "./apiV1Client";
import fetch from "node-fetch";

class ContactCompanyPerson extends ApiV1Client {
  constructor(client) {
    super(client);
  }

  async by({ contactCompanyId, id }) {
    const url = this.buildBaseUri(
      `/contact/companies/${contactCompanyId}/persons/${id}`,
    );
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
    if (!config.contactCompanyId) {
      throw new Error("Not implemented");
    }
    const params = {
      page: config.page || 1,
      page_size: config.pageSize || 100,
    };
    if (config.orderBy) {
      params.order_direction = config.orderDirection || "asc";
      params.order_by = config.orderBy;
    }
    if (config.orderDirection) {
      this.paramValidator.orderDirection(config.orderDirection);
      params.order_direction = config.orderDirection;
    }
    const url = this.buildBaseUri(
      `/contact/companies/${config.contactCompanyId}/persons/`,
      params,
    );
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

export default ContactCompanyPerson;

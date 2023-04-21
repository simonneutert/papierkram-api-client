import ApiV1Client from "./apiV1Client";
import fetch from "node-fetch";

class Info extends ApiV1Client {
  constructor(client) {
    super(client);
  }

  async details() {
    const url = this.buildBaseUri(`/info`);
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

export default Info;

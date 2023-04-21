import ParamValidator from "./paramValidator";

class ApiV1Client {
  constructor(client) {
    this.client = client;
    this.paramValidator = new ParamValidator();
  }
  buildBaseUri(path, params = {}) {
    let url = new URL(this.client.v1.buildBaseUri(path));
    url.search = new URLSearchParams(params).toString();
    return url;
  }
  async richResponse(response) {
    await response;
    const headers = {};
    for (const pair of response.headers.entries()) {
      headers[pair[0]] = pair[1];
    }
    const jsonData = await response.json();
    const remainingQuota = parseInt(headers["x-remaining-quota"]);
    return {
      body: jsonData,
      headers: headers,
      status: response.status,
      remainingQuota: remainingQuota,
    };
  }
}

export default ApiV1Client;

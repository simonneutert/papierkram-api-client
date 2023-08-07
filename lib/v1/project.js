import ApiV1Client from "./apiV1Client";
import fetch from "node-fetch";

class Project extends ApiV1Client {
  constructor(client) {
    super(client);
  }
  async by({ id }) {
    const url = this.buildBaseUri(`/projects/${id}`);
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
      params.order_direction = config.orderDirection || "asc";
      params.order_by = config.orderBy;
    }
    if (config.orderDirection) {
      this.paramValidator.orderDirection(config.orderDirection);
      params.order_direction = config.orderDirection;
    }

    const url = this.buildBaseUri(`/projects`, params);
    const response = await fetch(url, {
      headers: {
        method: "GET",
        Accept: "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
    });
    return await this.richResponse(response);
  }

  async create(customerId, project) {
    const params = {
      customer: { id: customerId },
      name: project.name,
    };
    if (project.description) {
      params.description = project.description;
    }
    if (project.startDate) {
      params.start_date = project.startDate;
    }
    if (project.endDate) {
      params.end_date = project.endDate;
    }
    if (project.flagged) {
      params.flagged = project.flagged;
    }
    if (project.budgetType) {
      params.budget_type = project.budgetType;
    }
    if (project.budgetMoney) {
      params.budget_money = project.budgetMoney;
    }
    if (project.budgetTime) {
      params.budget_time = project.budgetTime;
    }
    if (project.budgetTimeUnit) {
      params.budget_time_unit = project.budgetTimeUnit;
    }
    if (project.color) {
      params.color = project.color;
    }
    if (project.defaultPropositionId) {
      params.default_proposition = { id: project.defaultPropositionId };
    }
    if (project.teamMembers) {
      params.team_members = project.teamMembers;
    }

    const url = this.buildBaseUri(`/projects`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
      body: JSON.stringify(params),
    });
    return await this.richResponse(response);
  }

  async update(projectId, projectAttributes) {
    const url = this.buildBaseUri(`/projects/${projectId}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },

      body: JSON.stringify(projectAttributes),
    });
    return await this.richResponse(response);
  }

  async archive(projectId) {
    const url = this.buildBaseUri(`/projects/${projectId}/archive`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
    });
    return await this.richResponse(response);
  }

  async unarchive(projectId) {
    const url = this.buildBaseUri(`/projects/${projectId}/unarchive`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
    });
    return await this.richResponse(response);
  }

  async delete(projectId) {
    const url = this.buildBaseUri(`/projects/${projectId}`);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.client.token}`,
      },
    });
    return await this.richResponse(response);
  }
}

export default Project;

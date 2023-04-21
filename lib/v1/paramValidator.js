class ParamValidator {
  orderDirection(orderDirection) {
    if (
      orderDirection &&
      orderDirection !== "asc" &&
      orderDirection !== "desc"
    ) {
      throw new Error("orderDirection must be 'asc' or 'desc'");
    }
  }

  billingState(billingState) {
    const allowedStates = [
      "billed",
      "unbilled",
      "billable",
      "unbillable",
      "archived",
    ];
    if (
      ["billed", "unbilled", "billable", "unbillable", "archived"].includes(
        billingState
      )
    ) {
      return;
    }

    throw new Error("orderDirection must be: " + allowedStates.join(", "));
  }
}

export default ParamValidator;

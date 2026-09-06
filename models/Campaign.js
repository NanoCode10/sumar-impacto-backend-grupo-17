class Campaign {
  constructor(id, organizationId, title, description, targetAmount, status) {
    this.id = id;
    this.organizationId = organizationId;
    this.title = title;
    this.description = description;
    this.targetAmount = targetAmount;
    this.status = status;
  }
}

module.exports = Campaign;

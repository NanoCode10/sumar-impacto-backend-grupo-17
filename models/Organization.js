const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "organizations.json");

class Organization {
  constructor(id, name, type, email, status) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.email = email;
    this.status = status;
  }

  static findById(id) {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const organizations = JSON.parse(rawData);

    const found = organizations.find((org) => org.id === id);

    if (!found) {
      return null;
    }

    return new Organization(found.id, found.name, found.type, found.email, found.status);
  }
}

module.exports = Organization;

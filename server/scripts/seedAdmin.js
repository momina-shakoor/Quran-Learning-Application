require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminModel = require("../models/Admin/admin");

const mongoUri =
  process.env.NODE_ENV === "production"
    ? process.env.ATLAS_DB_URI
    : process.env.LOCAL_DB_URI;

const firstName = process.env.ADMIN_FIRST_NAME?.trim();
const lastName = process.env.ADMIN_LAST_NAME?.trim();
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_INITIAL_PASSWORD;

async function seedAdmin() {
  if (!mongoUri) {
    throw new Error("Database URI is missing from server/.env.");
  }

  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "Add ADMIN_FIRST_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL, and ADMIN_INITIAL_PASSWORD to server/.env.",
    );
  }

  if (password.length < 8) {
    throw new Error(
      "The initial admin password must be at least 8 characters.",
    );
  }

  await mongoose.connect(mongoUri);

  try {
    const existingAdmin = await AdminModel.findOne({ email });

    if (existingAdmin) {
      console.log(
        "An admin with this email already exists. Nothing was changed.",
      );
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await AdminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Initial admin created for ${email}.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin().catch((error) => {
  console.error("Admin seed failed:", error.message);
  process.exitCode = 1;
});

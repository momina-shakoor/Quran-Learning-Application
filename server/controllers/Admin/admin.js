const AdminModel = require("../../models/Admin/admin");
const bcrypt = require("bcrypt");

exports.AdminSignup = async (req, res) => {
  return res.status(403).json({
    success: false,
    message: "Admin self-registration is disabled.",
  });
};

exports.AdminLogin = async (req, res) => {
  const email =
    typeof req.body.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const password = req.body.password;

  if (!email || typeof password !== "string" || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const user = await AdminModel.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Await the bcrypt result so the actual password comparison is checked.
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Send only the account fields the frontend needs.
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully.",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

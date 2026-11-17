const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const AuthModel = require("../../models/Auth/auth");

// Generate a six-digit OTP.
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const safeUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  education: user.education,
  score: user.score,
  dateOfBirth: user.dateOfBirth,
});

exports.AuthSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      education,
      score,
      cnicNo,
      dateOfBirth,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await AuthModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthModel.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone,
      // This controller is also used by the admin to create teachers.
      // Do not let public signups choose privileged roles.
      role: role === "teacher" ? "teacher" : "student",
      education,
      score,
      cnicNo,
      dateOfBirth,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: safeUser(user),
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not create the account",
    });
  }
};

exports.AuthLogin = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await AuthModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: safeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.GetSingleAuth = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await AuthModel.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not retrieve user",
    });
  }
};

exports.updateAuth = async (req, res) => {
  try {
    const id = req.params.id || req.body._id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Only update fields this profile form is allowed to change.
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "education",
      "dateOfBirth",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];
      }
    }

    if (updates.email) {
      updates.email = updates.email.toLowerCase();
      const duplicate = await AuthModel.findOne({
        email: updates.email,
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Password changes should use a dedicated password flow.
    const user = await AuthModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not update user",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await AuthModel.findOne({ email });

    // Same response whether or not the email exists, to avoid account discovery.
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If the account exists, reset instructions will be sent",
      });
    }

    /*
      Email delivery is not implemented in the pasted controller.
      Do not return or log the OTP. Add your email service here before enabling
      password reset in the UI.
    */
    const otp = generateOtp();
    user.forgetPasswordOtp = await bcrypt.hash(otp, 10);
    user.forgetPasswordOtpExpiry = Date.now() + 2 * 60 * 1000;
    await user.save();

    return res.status(501).json({
      success: false,
      message: "Password reset email delivery is not configured yet",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not start password reset",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = String(req.body.otp || "");

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await AuthModel.findOne({ email });

    if (!user?.forgetPasswordOtp || !user.forgetPasswordOtpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or does not exist",
      });
    }

    if (user.forgetPasswordOtpExpiry < Date.now()) {
      user.forgetPasswordOtp = undefined;
      user.forgetPasswordOtpExpiry = undefined;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP expired or does not exist",
      });
    }

    const otpMatches = await bcrypt.compare(otp, user.forgetPasswordOtp);

    if (!otpMatches) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not verify OTP",
    });
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    // Supports the request shape used by the old frontend and a flat shape.
    const newPassword = req.body.newPassword || req.body.userdata?.password;
    const emailValue =
      typeof req.body.email === "string"
        ? req.body.email
        : req.body.email?.email;
    const email = emailValue?.trim().toLowerCase();

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.forgetPasswordOtp = undefined;
    user.forgetPasswordOtpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not change password",
    });
  }
};

exports.AllAuths = async (req, res) => {
  try {
    const allAuths = await AuthModel.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "All users retrieved",
      AllAuths: allAuths,
    });
  } catch (error) {
    console.error("Get users error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not retrieve users",
    });
  }
};

exports.DeleteAuth = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await AuthModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not delete user",
    });
  }
};

const AuthModel = require("../../models/Autrh/auth");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await AuthModel.find({ role: "student" }) // Filter by role 'student'
      .sort({ score: -1 }) // Sort by score in descending order
      .select("firstName lastName score") // Select only the relevant fields
      .limit(10); // Limit the results to top 10

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};

module.exports = { getLeaderboard };

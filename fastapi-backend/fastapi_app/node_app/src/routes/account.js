const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const router = express.Router();

// Mock accounts data (for demo)
const linkedAccounts = {
  "test@example.com": ["Facebook", "Instagram", "Twitter"],
  "9876543210": ["Paytm", "TrueCaller", "UPI"],
};

// Utility → create MD5 hash (for Gravatar)
function md5(string) {
  return crypto.createHash("md5").update(string.trim().toLowerCase()).digest("hex");
}

// POST /api/accounts/lookup
router.post("/lookup", async (req, res) => {
  const { identifier } = req.body;
  let accounts = linkedAccounts[identifier] || [];

  let externalData = {};

  try {
    // If input is an email
    if (identifier.includes("@")) {
      const hash = md5(identifier);

      // Gravatar avatar
      externalData.gravatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

      // Gravatar profile JSON
      try {
        const profileRes = await axios.get(`https://www.gravatar.com/${hash}.json`);
        if (profileRes.data.entry && profileRes.data.entry.length > 0) {
          externalData.gravatarProfile = profileRes.data.entry[0];
        }
      } catch (err) {
        console.warn("No Gravatar profile found for this email");
      }

      // Free email validation API
      const emailRes = await axios.get(`https://api.eva.pingutil.com/email?email=${identifier}`);
      externalData.emailInfo = emailRes.data;
    }

    // If input looks like a GitHub username
    if (!identifier.includes("@") && isNaN(identifier)) {
      const ghRes = await axios.get(`https://api.github.com/users/${identifier}`);
      externalData.github = ghRes.data;
    }
  } catch (err) {
    console.error("API fetch error:", err.message);
  }

  res.json({ identifier, accounts, externalData });
});

module.exports = router;

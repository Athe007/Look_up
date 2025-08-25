const axios = require("axios");

async function fetchTwitterProfile(username) {
  const res = await axios.get(
    `https://api.twitter.com/2/users/by/username/${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );
  return res.data;
}

module.exports = { fetchTwitterProfile };

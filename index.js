const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { msisdn } = req.query;

    if (!msisdn) {
      return res.status(400).json({ error: 'msisdn parameter is required' });
    }

    const url = `https://app.mynagad.com:20002/api/user/check-user-status-for-log-in?msisdn=${msisdn}`;

    const headers = {
      "X-KM-User-AspId": "100012345612345",
      "X-KM-User-Agent": "ANDROID/1152",
      "X-KM-DEVICE-FGP": "19DC58E052A91F5B2EB59399AABB2B898CA68CFE780878C0DB69EAAB0553C3C6",
      "X-KM-Accept-language": "bn",
      "X-KM-AppCode": "01"
    };

    // Make the API request
    const response = await fetch(url, { headers });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch user status' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error); // Log the error to the server logs
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

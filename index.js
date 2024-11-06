// index.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // Get the 'msisdn' (phone number) from the query parameters
    const { msisdn } = req.query;

    // If no msisdn is provided, send an error response
    if (!msisdn) {
      return res.status(400).json({ error: 'msisdn parameter is required' });
    }

    // Define the URL with the provided number
    const url = `https://app.mynagad.com:20002/api/user/check-user-status-for-log-in?msisdn=${msisdn}`;

    // Define the headers
    const headers = {
      "X-KM-User-AspId": "100012345612345",
      "X-KM-User-Agent": "ANDROID/1152",
      "X-KM-DEVICE-FGP": "19DC58E052A91F5B2EB59399AABB2B898CA68CFE780878C0DB69EAAB0553C3C6",
      "X-KM-Accept-language": "bn",
      "X-KM-AppCode": "01"
    };

    // Make the GET request to the URL
    const response = await fetch(url, { headers });

    // If the request was successful, send back the response
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    }

    // If the response is not ok, return an error message
    return res.status(response.status).json({ error: 'Failed to fetch user status' });
  } catch (error) {
    // Catch any errors and send a generic error response
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

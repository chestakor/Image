const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { msisdn } = req.query;

    if (!msisdn) {
      return res.status(400).json({ error: 'msisdn parameter is required' });
    }

    // Updated URL
    const url = `https://api.pikaapis.my.id/nagad.php?msisdn=${msisdn}`;

    // Send GET request
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch user status from API' });
    }

    // Parse the JSON response
    const data = await response.json();

    // Send back the data from the API response
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error); // Log the error to the server logs
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

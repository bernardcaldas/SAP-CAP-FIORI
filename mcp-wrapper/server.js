
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const ODATA_SERVICE_URL = 'http://localhost:4004/odata/v4/service/Orders';

app.get('/mcp/maintenance-orders', async (req, res) => {
  const { priority, status } = req.query;

  let filter = '';
  if (priority || status) {
    const filters = [];
    if (priority) {
      filters.push(`priority eq '${priority}'`);
    }
    if (status) {
      filters.push(`status eq '${status}'`);
    }
    filter = `?$filter=${filters.join(' and ')}`;
  }

  const requestUrl = `${ODATA_SERVICE_URL}${filter}`;

  console.log(`[MCP Server] Fetching data from: ${requestUrl}`);

  try {
    const response = await axios.get(requestUrl);
    const orders = response.data.value;

    const mcpResponse = {
      model: 'maintenance-orders',
      context: {
        filters: {
          priority: priority || null,
          status: status || null,
        },
      },
      data: orders,
    };

    res.json(mcpResponse);
  } catch (error) {
    console.error('[MCP Server] Error fetching data from OData service:', error.message);
    res.status(500).json({
      error: 'Failed to fetch maintenance orders',
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`[MCP Server] Listening at http://localhost:${port}`);
});

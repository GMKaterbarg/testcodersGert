import { test, expect, request } from '@playwright/test';

test('POST /smoketest/ with API Program payload', async ({ request }) => {
  // Step 1: Get the Bearer token via login API
  const authResponse = await request.post('http://localhost:8080/realms/AMTRealm/protocol/openid-connect/token', {
    ignoreHTTPSErrors: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },

    form: {
      client_id: 'AMT', // or your actual client ID
      grant_type: 'password',
      username: 'testuser',   // Incase you test on locally, replace with your actual username
      password: 'amt',        // Incase you test on locally,replace with your actual password
    },
  });

  // Log the response status and body for debugging
  console.log('Status:', authResponse.status());
  console.log('Body:', await authResponse.text());

  // Assert the response is OK (status code 200)
  expect(authResponse.ok()).toBeTruthy();

  const authData = await authResponse.json();
  const token = authData.access_token;




  /**
   * Create a basepath using the function below.
   * Fields in `data` include:
   * - id: A numeric identifier for the config (example: 0 for new entry).
   * - name: Label for the configuration (e.g., "Test").
   * - scriptPath, extractPath, printPath, logPath: Absolute paths to local directories.
   * - callPath, helpPath: Placeholder string paths for future use or optional values.
   * - configurations & applications: Arrays of strings representing related metadata.
   */
  const response = await request.post('https://localhost:9001/api/v1/config/basepath', {
    ignoreHTTPSErrors: true,

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Use the token obtained from the login API

    },
    data: {
      id: 0,
      name: "Test",
      scriptPath: "C:\\amt\working\scripts",
      extractPath: "C:\\amt\working\extracts",
      printPath: "C:\\amt\working\prints",
      callPath: "string",
      helpPath: "string",
      logPath: "C:\\amt\working\logs",
      configurations: [
        "string"
      ],
      "applications": [
        "string"
      ]
    }
  });



  // Assert the response status is 200
  expect(response.status()).toBe(200);


  // Optional: log response body
  const body = await response.json();
  console.log('Response:', body);
});

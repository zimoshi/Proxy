export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url"); 
    
    // Check if the parameter is present
    if (!targetUrl) {
      return new Response("Missing url parameter", { 
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" } 
      });
    }

    try {
      // Handle browser preflight checks
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*"
          }
        });
      }

      // Fetch the binary file server-to-server
      const response = await fetch(targetUrl);
      
      // Send the file back to the browser with relaxed CORS rules
      return new Response(response.body, {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Content-Type": response.headers.get("Content-Type") || "application/zip"
        }
      });
    } catch (error) {
      return new Response(`Proxy Error: ${error.message}`, { 
        status: 500, 
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};

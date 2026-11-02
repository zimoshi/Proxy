export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url"); 
    
    if (!targetUrl) return new Response("Missing url parameter", { status: 400 });

    const response = await fetch(targetUrl);
    
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Content-Type": response.headers.get("Content-Type") || "application/zip"
      }
    });
  }
};

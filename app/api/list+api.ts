export async function GET(request: Request) {
  const API_BASE_URL = 'http://192.168.0.139/PersonsAPI/api/person';
  const response = await fetch(`${API_BASE_URL}/list`);
  if (!response.ok) {
    return new Response('Failed to fetch persons', { status: 500 });
  }
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

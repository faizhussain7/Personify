export async function PUT(request: Request) {
  const API_BASE_URL = 'http://192.168.0.139/PersonsAPI/api/person';

  try {
    const { id, name, email, age } = await request.json();
    const personData = { name, email, age: age || null };

    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });

    const responseText = await response.text();

    try {
      const responseData = JSON.parse(responseText);
      return new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(responseText, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const API_BASE_URL = 'http://192.168.0.139/PersonsAPI/api/person';
  try {
    const data = await request.json();

    const personList = data.map((person: { name: any; email: any; age: any }) => ({
      name: person.name,
      email: person.email,
      age: person.age || null,
    }));

    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personList),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return new Response('Failed to create person', { status: 500 });
    }
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

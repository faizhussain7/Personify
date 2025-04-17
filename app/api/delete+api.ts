export async function DELETE(request: Request) {
  const API_BASE_URL = 'http://192.168.0.139/PersonsAPI/api/person';
  try {
    const { id } = await request.json();
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      return new Response(`Failed to delete person. Status: ${response.status}`, {
        status: response.status,
      });
    }
    const responseText = await response.text();
    return new Response(responseText, { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

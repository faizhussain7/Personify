import { Person } from '~/types/person';

const API_BASE_URL = 'http://192.168.0.139/PersonsAPI/api/person';

const personApi = {
  list: async (): Promise<Person[]> => {
    const response = await fetch(`${API_BASE_URL}/list`);
    if (!response.ok) throw new Error('Failed to fetch persons');
    return response.json();
  },

  create: async (persons: Omit<Person, 'id' | 'createdAT'>[]): Promise<Person[]> => {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(persons),
    });
    if (!response.ok) throw new Error('Failed to create person');
    return response.json();
  },

  update: async (id: number, person: Partial<Person>): Promise<Person> => {
    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    });
    if (!response.ok) throw new Error('Failed to update person');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete person');
  },
};

export default personApi;

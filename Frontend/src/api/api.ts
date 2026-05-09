const API_URL = "http://127.0.0.1:8000";

export async function fetchTables() {
  const res = await fetch(`${API_URL}/tables`);
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
}

// You can add more API functions here as needed
export const getHostels = () => fetch(`${API_URL}/hostels`).then(res => res.json());
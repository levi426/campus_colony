export const API_URL = "http://localhost:8000";

type JsonBody = Record<string, unknown>;

function authHeaders() {
  const token = localStorage.getItem("cc_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

function jsonRequest(path: string, method: string, body: JsonBody, authenticated = false) {
  return request(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authenticated ? authHeaders() : {}),
    },
    body: JSON.stringify(body),
  });
}

export async function fetchTables() {
  const res = await fetch(`${API_URL}/tables`);
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
}

export const loginUser = (email: string, password: string) =>
  jsonRequest("/auth/login", "POST", { email, password });

export const signupUser = (name: string, email: string, password: string, institution?: string) =>
  jsonRequest("/auth/signup", "POST", { name, email, password, institution });

export const getLandlords = () => request("/landlords/");
export const createLandlord = (data: JsonBody) => jsonRequest("/landlords/", "POST", data, true);
export const deleteLandlord = (id: number) =>
  request(`/landlords/${id}`, { method: "DELETE", headers: authHeaders() });

export const getListings = () => request("/listings/", { headers: authHeaders() });
export const createListing = (data: FormData) =>
  request("/listings/", { method: "POST", headers: authHeaders(), body: data });
export const deleteListing = (id: number) =>
  request(`/listings/${id}`, { method: "DELETE", headers: authHeaders() });

export const getAreas = () => request("/areas/");
export const getUsers = () => request("/users/", { headers: authHeaders() });
export const createReview = (listingId: number, content: string, rating: number) =>
  jsonRequest(`/reviews/reviews/${listingId}`, "POST", { content, rating }, true);
export const getListingReviews = (listingId: number) => request(`/reviews/reviews/listing/${listingId}`);
export const deleteReview = (reviewId: number) =>
  request(`/reviews/reviews/${reviewId}`, { method: "DELETE", headers: authHeaders() });

export function resolveImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  return `${API_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

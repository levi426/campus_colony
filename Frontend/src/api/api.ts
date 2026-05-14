const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://campus-colony.onrender.com";

type JsonBody = Record<string, unknown>;
export type AuthRole = "USER" | "ADMIN";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: AuthRole;
  is_active: boolean;
  institution?: string | null;
}

export function clearStoredAuth() {
  localStorage.removeItem("cc_token");
  localStorage.removeItem("cc_role");
  localStorage.removeItem("cc_email");
  localStorage.removeItem("cc_name");
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("cc_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 401 || res.status === 403) {
      clearStoredAuth();
    }
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
  const res = await fetch(`${API_BASE_URL}/tables`, { credentials: "include", headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
}

export const loginUser = (email: string, password: string) =>
  jsonRequest("/auth/login", "POST", { email, password });

export const getCurrentUser = (): Promise<AuthUser> =>
  request("/auth/me", { headers: authHeaders() });

export const logoutUser = () =>
  request("/auth/logout", { method: "POST", headers: authHeaders() });

export const signupUser = (name: string, email: string, password: string, institution?: string) =>
  jsonRequest("/auth/signup", "POST", { name, email, password, institution });

export const getLandlords = () => request("/landlords/");
export const createLandlord = (data: JsonBody) => jsonRequest("/landlords/", "POST", data, true);
export const deleteLandlord = (id: number) =>
  request(`/landlords/${id}`, { method: "DELETE", headers: authHeaders() });

export const getListings = () => request("/listings/", { headers: authHeaders() });
export const searchListings = (query: string) => request(`/listings/?search=${encodeURIComponent(query)}`, { headers: authHeaders() });
export const createListing = (data: FormData) =>
  request("/listings/", { method: "POST", headers: authHeaders(), body: data });
export const deleteListing = (id: number) =>
  request(`/listings/${id}`, { method: "DELETE", headers: authHeaders() });

export const getAreas = () => request("/areas/");
export const createArea = (data: JsonBody) => jsonRequest("/areas/", "POST", data, true);
export const deleteArea = (id: number) =>
  request(`/areas/${id}`, { method: "DELETE", headers: authHeaders() });
export const getUsers = () => request("/users/", { headers: authHeaders() });
export const getAdminDashboard = () => request("/admin/dashboard", { headers: authHeaders() });
export const getAdminUserManagement = () => request("/admin/User_Management", { headers: authHeaders() });
export const createReview = (listingId: number, content: string, rating: number) =>
  jsonRequest(`/reviews/${listingId}`, "POST", { content, rating }, true);
export const getListingReviews = (listingId: number) => request(`/reviews/listing/${listingId}`);
export const deleteReview = (reviewId: number) =>
  request(`/reviews/${reviewId}`, { method: "DELETE", headers: authHeaders() });

export const getFavourites = () => request("/favourites/", { headers: authHeaders() });
export const addFavourite = (listingId: number) =>
  request(`/favourites/${listingId}`, { method: "POST", headers: authHeaders() });
export const removeFavourite = (listingId: number) =>
  request(`/favourites/${listingId}`, { method: "DELETE", headers: authHeaders() });

export const getListingDetails = (listingId: number) => request(`/listings/${listingId}`, { headers: authHeaders() });

export const predictRent = (data: any) => jsonRequest("/ai/predict-rent", "POST", data);
export const chatbotSearch = (query: string) => jsonRequest("/ai/chatbot", "POST", { query });

export function resolveImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  return `${API_BASE_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

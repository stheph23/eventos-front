import http from "../index";

export type User = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
};

export type LoginPayload = { email: string; password: string };
export type LoginResult = { token: string; user: User | null };

/** POST /api/auth/login → { access, user } */
export async function loginApi(payload: LoginPayload): Promise<LoginResult> {
  const { data } = await http.post("auth/login", payload); // sin barra final
  if (!data?.access) throw new Error("No se recibió el token de acceso.");
  return { token: data.access as string, user: (data.user ?? null) as User | null };
}

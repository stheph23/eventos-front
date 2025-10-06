import http from "../index";

export type RegisterPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
};

export type RegisterResult = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
};

// POST /api/auth/register → crea usuario
export async function registerApi(payload: RegisterPayload): Promise<RegisterResult> {
  const { data } = await http.post<RegisterResult>("auth/register", payload);
  return data;
}

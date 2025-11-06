import { getCookie } from "@/commons/helpers/cookie-helper";
import { redirect } from "next/navigation";

export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
};

type ApiClientOptions = {
  onUnauthorized?: () => void;
};

class ApiClient {
  private baseUrl: string;
  private onUnauthorized?: () => void;

  constructor(baseUrl: string, options?: ApiClientOptions) {
    this.baseUrl = baseUrl;
    this.onUnauthorized = options?.onUnauthorized;
  }

  private async getHeaders(
    extraHeaders?: RequestInit["headers"]
  ): Promise<HeadersInit> {
    const token = await getCookie("token");
    const headers = new Headers(
      extraHeaders as Record<string, string> | undefined
    );

    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  private async handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
    const status = res.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = null;

    try {
      data = await res.json();
    } catch (e) {
      console.error("Failed to parse JSON:", e);
    }

    if (status === 401 && this.onUnauthorized) {
      this.onUnauthorized();
    }

    return {
      success: res.ok,
      status,
      message:
        data?.message || (res.ok ? "Successful" : "Something went wrong"),
      data: data?.data ?? data,
    };
  }

  async get<T>(
    endpoint: string,
    query?: Record<string, string | number | boolean>,
    headers?: RequestInit["headers"]
  ): Promise<ApiResponse<T>> {
    let url = `${this.baseUrl}${endpoint}`;
    if (query) {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        params.append(key, String(value));
      });
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: await this.getHeaders(headers),
      credentials: "include",
    });

    return this.handleResponse<T>(res);
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    headers?: RequestInit["headers"]
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: await this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    return this.handleResponse<T>(res);
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    headers?: RequestInit["headers"]
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: await this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    return this.handleResponse<T>(res);
  }

  async delete<T>(
    endpoint: string,
    headers?: RequestInit["headers"]
  ): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: await this.getHeaders(headers),
      credentials: "include",
    });

    return this.handleResponse<T>(res);
  }
}

const api = new ApiClient(process.env.NEXT_PUBLIC_BASE_API_URL!, {
  onUnauthorized: () => redirect("/admin/unauthorized"),
});

export { ApiClient };
export default api;

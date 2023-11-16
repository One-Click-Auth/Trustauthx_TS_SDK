interface FetchOptions<T> {
  method?: string;
  headers?: { [key: string]: string };
  body?: T;
}

export const makeRequest = async <T>(
  url: string,
  options: FetchOptions<T>
): Promise<Response> => {
  // Use fetch or any other HTTP library to make the actual request
  try {
    const response = await fetch(url, options as RequestInit);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // return await (response.json() as Promise<T>);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const handleResponse = async (action: Promise<any>) => {
	const response = await action;
  if (response.ok) return response;
  const err = new Error("HTTP status code: " + response.status);
  throw err;
};
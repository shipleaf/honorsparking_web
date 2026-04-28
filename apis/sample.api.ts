import apiClient from "./apiClient";

export const exampleApi = async (hi:string) => {
    const response = await apiClient.get('/example', {
        params: { hi },
    });
    return response.data;
}
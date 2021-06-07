import axios from "axios";

export function getEmployees(query: string, skip: number, limit: number) {
  return axios.get(`/employees?q=${query}&skip=${skip}&limit=${limit}`);
}

export function deleteEmployee(id: string) {
  return axios.delete("/employees", { data: { _id: id } });
}

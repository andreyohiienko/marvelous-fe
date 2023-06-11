import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { AxiosError } from "axios";

type TodoListItem = {
  id: number;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export const useTodoListQuery = () =>
  useQuery<TodoListItem[], AxiosError>(["todo-list"], async ({ signal }) => {
    const { data } = await api.get("/todo-list", { signal });
    return data;
  });

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "api";
import { AxiosError } from "axios";

type TodoListItem = {
  id: number;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export const useTodoListQuery = (
  options?: {
    status: "done" | "undone";
    limit?: number;
    search?: string;
  } & UseQueryOptions<TodoListItem[], AxiosError, TodoListItem[]>
) => {
  const { status, limit, search, ...rest } = options || {};
  return useQuery<TodoListItem[], AxiosError, TodoListItem[]>(
    ["todo-list", status, search],
    async ({ signal }) => {
      const { data } = await api.get("/todo-list", {
        signal,
        params: { status, limit, search },
      });
      return data;
    },
    { ...rest }
  );
};

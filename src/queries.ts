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
  options?: { status: "done" | "undone"; limit?: number } & UseQueryOptions<
    TodoListItem[],
    AxiosError,
    TodoListItem[]
  >
) => {
  const { status, limit, ...rest } = options || {};
  return useQuery<TodoListItem[], AxiosError, TodoListItem[]>(
    ["todo-list-" + status],
    async ({ signal }) => {
      const { data } = await api.get("/todo-list", {
        signal,
        params: { status, limit },
      });
      return data;
    },
    { ...rest }
  );
};

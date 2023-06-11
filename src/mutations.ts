import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "api";
import { AxiosError } from "axios";

type Params = {
  description: string;
};

type TodoListItem = {
  status: boolean;
  id: number | string;
  description: string;
  updatedAt?: string;
  createdAt?: string;
};

export const useAddNewListItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<TodoListItem, AxiosError, Params, TodoListItem[]>(
    async (params: Params) => {
      const { data } = await api.post("/todo-list", { ...params });
      return data;
    },
    {
      onMutate: async (newTodo) => {
        await queryClient.cancelQueries({ queryKey: ["todo-list"] });

        const previousTodos = queryClient.getQueryData<TodoListItem[]>([
          "todo-list",
        ]);
        queryClient.setQueryData<TodoListItem[]>(["todo-list"], (old) =>
          [
            ...(old || []),
            { id: Math.random(), status: false, ...newTodo },
          ].sort((a, b) => a.description?.localeCompare(b.description))
        );

        return previousTodos;
      },
      onError: (_err, _variables, context) => {
        if (context)
          queryClient.setQueryData<TodoListItem[]>(["todo-list"], context);
      },
      // onSettled: () => {
      //   queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      // },
    }
  );
};

export const useDeleteAllTodosMutation = (
  options?: UseMutationOptions<TodoListItem[], AxiosError, void, TodoListItem[]>
) => {
  const queryClient = useQueryClient();

  return useMutation<TodoListItem[], AxiosError, void, TodoListItem[]>(
    async () => {
      const { data } = await api.delete("/todo-list/all");
      return data;
    },
    {
      onMutate: () => {
        const previousTodos = queryClient.getQueryData<TodoListItem[]>([
          "todo-list",
        ]);
        queryClient.setQueryData<TodoListItem[]>(["todo-list"], () => []);
        return previousTodos;
      },
      onError: (_err, _variables, context) => {
        queryClient.setQueryData<TodoListItem[]>(["todo-list"], context);
      },
      ...options,
    }
  );
};

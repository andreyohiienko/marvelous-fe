import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  return useMutation<TodoListItem, AxiosError, Params>(
    async (params: Params) => {
      const { data } = await api.post("/todo-list", { ...params });
      return data;
    },
    {
      onMutate: async (newTodo) => {
        await queryClient.cancelQueries({ queryKey: ["todo-list"] });

        const previousTodos = queryClient.getQueryData(["todo-list"]);
        queryClient.setQueryData<TodoListItem[]>(["todo-list"], (old) => [
          ...(old || []),
          { id: Math.random(), status: false, ...newTodo },
        ]);

        return previousTodos;
      },
      onError: (_err, _variables, context) => {
        if (context)
          queryClient.setQueryData<TodoListItem[]>(
            ["todo-list"],
            context as TodoListItem[]
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      },
    }
  );
};

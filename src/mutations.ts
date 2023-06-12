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

export const useAddNewListItemMutation = (
  options?: UseMutationOptions<
    TodoListItem[],
    AxiosError,
    Params,
    TodoListItem[]
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<TodoListItem[], AxiosError, Params, TodoListItem[]>(
    async (params: Params) => {
      const { data } = await api.post("/todo-list", { ...params });
      return data;
    },
    {
      onMutate: (newTodo) => {
        const previousTodos = queryClient.getQueryData<TodoListItem[]>([
          "todo-list-undone",
        ]);
        queryClient.setQueryData<TodoListItem[]>(["todo-list-undone"], (old) =>
          [
            ...(old || []),
            { id: Math.random(), status: false, ...newTodo },
          ].sort((a, b) => a.description?.localeCompare(b.description))
        );

        return previousTodos;
      },
      onError: (_err, _variables, context) => {
        if (context)
          queryClient.setQueryData<TodoListItem[]>(
            ["todo-list-undone"],
            context
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todo-list"] });
      },
      ...options,
    }
  );
};

export const useDeleteAllTodosMutation = (
  options?: UseMutationOptions<
    TodoListItem[],
    AxiosError,
    void,
    {
      prevDone?: TodoListItem[];
      prevUndone?: TodoListItem[];
    }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<
    TodoListItem[],
    AxiosError,
    void,
    {
      prevDone?: TodoListItem[];
      prevUndone?: TodoListItem[];
    }
  >(
    async () => {
      const { data } = await api.delete("/todo-list/all");
      return data;
    },
    {
      onMutate: () => {
        const prevUndone = queryClient.getQueryData<TodoListItem[]>([
          "todo-list-undone",
        ]);

        const prevDone = queryClient.getQueryData<TodoListItem[]>([
          "todo-list-done",
        ]);
        queryClient.setQueryData<TodoListItem[]>(
          ["todo-list-undone"],
          () => []
        );

        queryClient.setQueryData<TodoListItem[]>(["todo-list-done"], () => []);
        return { prevDone, prevUndone };
      },
      onError: (_err, _variables, context) => {
        queryClient.setQueryData<TodoListItem[]>(
          ["todo-list-undone"],
          context?.prevUndone
        );
        queryClient.setQueryData<TodoListItem[]>(
          ["todo-list-done"],
          context?.prevDone
        );
      },
      ...options,
    }
  );
};

type VariablesUpdate = {
  id: number;
  status: boolean;
};

export const useTodoUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TodoListItem[],
    AxiosError,
    VariablesUpdate,
    {
      prevDone?: TodoListItem[];
      prevUndone?: TodoListItem[];
    }
  >(
    async ({ id, status }: VariablesUpdate) => {
      const { data } = await api.patch(`/todo-list/${id}`, { status });
      return data;
    },
    {
      onMutate: ({ id, status }) => {
        const prevUndone = queryClient.getQueryData<TodoListItem[]>([
          `todo-list-undone`,
        ]);

        const prevDone = queryClient.getQueryData<TodoListItem[]>([
          `todo-list-done`,
        ]);

        if (status) {
          const doneTodo = prevUndone?.find((todo) => todo.id === id);
          const newUndoneTodos = prevUndone?.filter((todo) => todo.id !== id);
          queryClient.setQueryData<TodoListItem[]>(
            [`todo-list-undone`],
            newUndoneTodos
          );

          if (doneTodo)
            queryClient.setQueryData<TodoListItem[]>(
              [`todo-list-done`],
              [{ ...doneTodo, status: true }, ...(prevDone || [])].sort(
                (a, b) => a.description?.localeCompare(b.description)
              )
            );

          return { prevDone, prevUndone };
        }

        const undoneTodo = prevDone?.find((todo) => todo.id === id);
        const newDoneTodos = prevDone?.filter((todo) => todo.id !== id);
        queryClient.setQueryData<TodoListItem[]>(
          [`todo-list-done`],
          newDoneTodos
        );

        if (undoneTodo)
          queryClient.setQueryData<TodoListItem[]>(
            [`todo-list-undone`],
            [{ ...undoneTodo, status: false }, ...(prevUndone || [])].sort(
              (a, b) => a.description?.localeCompare(b.description)
            )
          );

        return { prevDone, prevUndone };
      },
      onError: (_err, _variables, context) => {
        queryClient.setQueryData<TodoListItem[]>(
          ["todo-list-undone"],
          context?.prevUndone
        );
        queryClient.setQueryData<TodoListItem[]>(
          ["todo-list-done"],
          context?.prevDone
        );
      },
    }
  );
};

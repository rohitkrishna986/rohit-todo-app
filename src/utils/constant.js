export const HOST = import.meta.env.VITE_BACKEND_URL;

export const TASK_ROUTES = "api/task";
export const CREATE_TASK_ROUTES = `${TASK_ROUTES}/create-task`;
export const GET_ALL_TASKS = `${TASK_ROUTES}/get-tasks`;
export const DELETE_TASKS = `${TASK_ROUTES}/delete-task`;
export const UPDATE_TASKS = `${TASK_ROUTES}/update-task`;
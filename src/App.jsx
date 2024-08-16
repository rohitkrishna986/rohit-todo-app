import { useEffect, useState } from "react";
import apiClient from "./lib/api-frontend";
import {
  CREATE_TASK_ROUTES,
  DELETE_TASKS,
  GET_ALL_TASKS,
  UPDATE_TASKS,
} from "./utils/constant";
import { toast } from "sonner";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  const [taskName, setTaskName] = useState("");
  const [allData, setAllData] = useState([]);
  const [openUpdateMenu, setOpenUpdateMenu] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({ id: "", name: "" });

  useEffect(() => {
    fetchAllTask();
  }, []);

  const fetchAllTask = async () => {
    const response = await apiClient.get(GET_ALL_TASKS);
    if (response.status === 200 && response.data) {
      setAllData(response.data.tasks);
    }
  };

  const handleCreate = async () => {
    const response = await apiClient.post(CREATE_TASK_ROUTES, { taskName });
    if (response.status === 200 && response.data) {
      toast.success("New task created");
      setTaskName("");
      fetchAllTask();
    }
  };

  const handleDelete = async (id) => {
    const response = await apiClient.delete(`${DELETE_TASKS}/${id}`);
    if (response.status === 200) {
      toast.success("Task deleted.");
      fetchAllTask();
    }
  };

  const handleUpdate = async (task) => {
    const { id, name } = task;

    const response = await apiClient.put(`${UPDATE_TASKS}/${id}`, { name });
    if (response.status === 200) {
      toast.success("Task updated successfully.");
      fetchAllTask();
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-slate-100">
        <div className="container h-[80vh]">
          <div className="flex flex-col md:flex-row w-full items-center justify-center border-2 border-gray-400">
            <h2 className="font-bold text-3xl p-4 md:p-8">To-Do List</h2>
            <input
              type="text"
              className="p-2 min-w-[70vw] md:min-w-[20vw] rounded-md border border-gray-400 outline-none"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
              placeholder="New task"
            />
            <button
              onClick={handleCreate}
              className="py-2 px-6 bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 text-white my-2 md:ml-4"
            >
              Add
            </button>
          </div>
          <div className="mt-5">
            <table className="w-full userTable">
              <thead>
                <tr>
                  <th className="w-[10vw]">S.No</th>
                  <th className="">Task Name</th>
                  <th className="w-[10vw]">Edit</th>
                  <th className="w-[10vw]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(allData) && allData.length > 0 ? (
                  allData.map((task, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{task.taskName}</td>
                      <td>
                        <button
                          onClick={() => {
                            setOpenUpdateMenu(true),
                              setUpdateDetails({
                                id: task._id,
                                name: task.taskName,
                              });
                          }}
                          className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-all duration-300 text-white"
                        >
                          <MdEdit />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-300 text-white"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No tasks available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {openUpdateMenu && (
          <Dialog open={openUpdateMenu} onOpenChange={setOpenUpdateMenu}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Task Name</DialogTitle>
                <DialogDescription>
                  <div className="grid mt-4 gap-2">
                    <label htmlFor="name" className="text-black font-medium">
                      Name :
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={updateDetails.name}
                      onChange={(e) =>
                        setUpdateDetails({
                          ...updateDetails,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter task name"
                      className="bg-slate-100 p-2 rounded-lg border border-gray-400 outline-none text-black"
                    />
                  </div>
                  <button
                    onClick={() => {
                      handleUpdate({
                        id: updateDetails.id,
                        name: updateDetails.name,
                      }),
                        setOpenUpdateMenu(false);
                    }}
                    className="p-2 bg-purple-500 text-white w-full mt-4 rounded-md hover:bg-purple-600 transition-all duration-300"
                  >
                    Update
                  </button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import useAuthContext from "../hooks/useAuthContext";
import axios from "axios";
import Spinner from "../components/Spinner"

const Tasks = () => {
  const { user } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5555/api/tasks", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const openAddModal = () => {
    setModalMode("add");
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setModalMode("edit");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setModalMode("delete");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onToggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    console.log(task);
    if (!task) return;

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5555/api/tasks/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(res);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
      setError(null);
      // console.log(tasks);
      setLoading(false);
    } catch (err) {
      setError("Failed to update task status.");
    }
  };

  return (
    <div>
      {loading && (
      <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
        <Spinner />
      </div>
  
)}
      <Modal
        isOpen={isModalOpen}
        title={
          modalMode === "add"
            ? "Add New Task"
            : modalMode === "edit"
            ? "Edit Task"
            : "Delete Task?"
        }
        onClose={closeModal}
      >
        {modalMode === "delete" ? (
          <div>
            <p>Are you sure you want to delete this task?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    await axios.delete(
                      `http://localhost:5555/api/tasks/${selectedTask._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${user.token}`,
                        },
                      }
                    );
                    setTasks((prev) =>
                      prev.filter((task) => task._id !== selectedTask._id)
                    );
                    closeModal();
                    setError(null);
                    setLoading(false);
                  } catch (err) {
                    setLoading(false);
                    console.error("Delete Task Error:", err);
                    setError("Failed to delete task.");
                  }
                }}
                className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const title = form.title.value;
              const deadline = form.deadline.value;

              if (modalMode === "add") {
                const newTask = { title, deadline };
                try {
                  setLoading(true);
                  const res = await axios.post(
                    "http://localhost:5555/api/tasks",
                    newTask,
                    {
                      headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                    }
                  );
                  setTasks((prev) => [...prev, res.data.newTask]);
                  setError(null);
                  setLoading(false);
                } catch (err) {
                  console.error("Add Task Error:", err);
                  setError("Failed to add task. Please try again.");
                  setLoading(false);
                }
              } else if (modalMode === "edit") {
                const updatedTask = { title, deadline };

                try {
                  setLoading(true)
                  const res = await axios.put(
                    `http://localhost:5555/api/tasks/${selectedTask._id}`,
                    updatedTask,
                    {
                      headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                    }
                  );
                  setTasks((prev) =>
                    prev.map((task) =>
                      task._id === selectedTask._id ? res.data.data : task
                    )
                  );
                  setLoading(false);
                  setError(null);
                } catch (err) {
                  setLoading(false);
                  console.error("Edit Task Error:", err);
                  setError("Failed to update task.");
                }
              }
              closeModal();
            }}
          >
            <div className="space-y-4">
              <input
                name="title"
                defaultValue={selectedTask?.title || ""}
                placeholder="Title"
                required
                className="w-full border p-2 rounded"
              />
              <input
                name="deadline"
                type="date"
                defaultValue={selectedTask?.deadline?.split("T")[0] || ""}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {modalMode === "add" ? "Add Task" : "Update Task"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Navbar />

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center px-4 py-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Tasks</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition"
          onClick={openAddModal}
        >
          + Add Task
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks || []}
          onToggleComplete={onToggleComplete}
          onDelete={openDeleteModal}
          onEdit={openEditModal}
        />
      )}
    </div>
  );
};

export default Tasks;

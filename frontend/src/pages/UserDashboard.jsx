import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import Navbar from "../components/Navbar";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5555/api/tasks/history", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const fetchedTasks = res.data.tasks;
        setTasks(fetchedTasks);

        const map = new Map();

        fetchedTasks.forEach((task) => {
          const createdDay = new Date(task.createdAt).toISOString().split("T")[0];
          const completedDay = task.completedAt
            ? new Date(task.completedAt).toISOString().split("T")[0]
            : null;

          if (!map.has(createdDay)) {
            map.set(createdDay, { day: createdDay, added: 0, completed: 0 });
          }
          map.get(createdDay).added++;

          if (completedDay) {
            if (!map.has(completedDay)) {
              map.set(completedDay, { day: completedDay, added: 0, completed: 0 });
            }
            map.get(completedDay).completed++;
          }
        });

        setChartData(Array.from(map.values()).sort((a, b) => a.day.localeCompare(b.day)));

        console.log(chartData);
      } catch (error) {
        setError("Failed to load tasks.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
      <Navbar />
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-blue-700">Your dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">Weekly Stats</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="added" fill="#6366f1" name="Added" />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">Your numbers</h2>
            <div className="grid grid-cols-2 gap-6">
              <StatBox title="Tasks Added" value={tasks.length} color="indigo" />
              <StatBox
                title="Tasks Completed"
                value={tasks.filter((t) => t.isCompleted).length}
                color="green"
              />
              <StatBox
                title="Efficiency"
                value={
                  tasks.length
                    ? `${Math.round((tasks.filter((t) => t.isCompleted).length / tasks.length) * 100)}%`
                    : "0%"
                }
                color="yellow"
              />
              <StatBox title="Avg. Completion Time" value="2d" color="blue" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Task History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th className="px-4 py-2 text-left">Deadline</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-100">
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{new Date(task.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}
                    </td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        task.isCompleted ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {task.isCompleted ? "Completed" : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ title, value, color }) => (
  <div
    className={`flex flex-col items-center border-2 border-gray-200 dark:border-gray-700 rounded-2xl justify-center p-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-${color}-500 dark:hover:border-${color}-400`}
  >
    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-600 text-center">{title}</h3>
    <p className={`mt-1 text-3xl font-semibold text-${color}-600 dark:text-${color}-400`}>{value}</p>
  </div>
);

export default Dashboard;

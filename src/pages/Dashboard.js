import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Error fetching tasks");
    }
  };

  // 🔥 CREATE TASK
  const createTask = async () => {
    if (!title) return alert("Enter title");

    try {
      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert("Error creating task");
    }
  };

  // 🔥 UPDATE TASK
  const updateTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: "Done",
      });
      fetchTasks();
    } catch (err) {
      alert("Update failed");
    }
  };

  // 🔥 DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Delete failed");
    }
  };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Dashboard</h2>

//       {/* ADD TASK FORM */}
//       <input
//         placeholder="Task title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <button onClick={createTask}>Add Task</button>

//       <hr />

//       {/* TASK LIST */}
//       {tasks.length === 0 ? (
//         <p>No tasks found</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task._id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               margin: "10px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>

//             <p>
//               Status: <b>{task.status}</b>
//             </p>

//             <button onClick={() => updateTask(task._id)}>
//               Mark Done
//             </button>

//             <button onClick={() => deleteTask(task._id)}>
//               Delete
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
return (
  <div
    style={{
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial",
    }}
  >
    <h2 style={{ textAlign: "center" }}>Task Manager</h2>

    {/* FORM */}
    <div
      style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <button
        onClick={createTask}
        style={{
          width: "100%",
          padding: "10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Task
      </button>
    </div>

    {/* TASK LIST */}
    <div style={{ marginTop: "20px" }}>
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            background: "#fff",
            padding: "15px",
            margin: "10px auto",
            borderRadius: "10px",
            maxWidth: "400px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <p>
            Status:{" "}
            <b style={{ color: task.status === "Done" ? "green" : "orange" }}>
              {task.status}
            </b>
          </p>

          <button onClick={() => updateTask(task._id)}>
            Mark Done
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Dashboard;
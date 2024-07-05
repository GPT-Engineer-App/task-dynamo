import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InboxPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Inbox</h2>
      <div className="mb-4">
        <Input
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask} className="ml-2">Add</Button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex items-center mb-2">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} />
            <span className={`ml-2 ${task.completed ? "line-through" : ""}`} onClick={() => setSelectedTask(task)}>
              {task.name}
            </span>
            <Button variant="destructive" size="sm" className="ml-auto" onClick={() => deleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={selectedTask.name}
                onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
              />
              {/* Add more fields for due date, priority, project, etc. */}
              <Button onClick={() => setSelectedTask(null)}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InboxPage;
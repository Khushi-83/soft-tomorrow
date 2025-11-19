import { useState } from 'react';
import { Task, calculatePriority } from '@/types/task';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskButton } from '@/components/AddTaskButton';
import { toast } from 'sonner';

const Index = () => {
  const [defaultRoutine, setDefaultRoutine] = useState<Task[]>([
    {
      id: '1',
      title: 'Morning Yoga',
      duration: '30 mins',
      urgency: 4,
      importance: 4,
      completed: false,
      priority: calculatePriority(4, 4),
    },
    {
      id: '2',
      title: 'DSA Practice',
      duration: '1 hour',
      urgency: 5,
      importance: 5,
      completed: false,
      priority: calculatePriority(5, 5),
    },
    {
      id: '3',
      title: 'Learning Session',
      duration: '45 mins',
      urgency: 4,
      importance: 5,
      completed: false,
      priority: calculatePriority(4, 5),
    },
    {
      id: '4',
      title: 'Reading Time',
      duration: '30 mins',
      urgency: 3,
      importance: 4,
      completed: false,
      priority: calculatePriority(3, 4),
    },
  ]);

  const [tomorrowTasks, setTomorrowTasks] = useState<Task[]>([]);

  const createNewTask = (): Task => ({
    id: Date.now().toString(),
    title: 'New Task',
    duration: '',
    urgency: 3,
    importance: 3,
    completed: false,
    priority: calculatePriority(3, 3),
  });

  const handleUpdateRoutine = (updatedTask: Task) => {
    setDefaultRoutine((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleUpdateTomorrow = (updatedTask: Task) => {
    setTomorrowTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteRoutine = (id: string) => {
    setDefaultRoutine((prev) => prev.filter((task) => task.id !== id));
    toast.success('Task removed from routine');
  };

  const handleDeleteTomorrow = (id: string) => {
    setTomorrowTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success('Task deleted');
  };

  const handleAddRoutine = () => {
    setDefaultRoutine((prev) => [...prev, createNewTask()]);
    toast.success('New routine task added');
  };

  const handleAddTomorrow = () => {
    setTomorrowTasks((prev) => [...prev, createNewTask()]);
    toast.success('New task added for tomorrow');
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Tomorrow Planner
          </h1>
          <p className="text-muted-foreground text-lg">
            Plan your day with clarity and purpose
          </p>
        </div>

        {/* Default Daily Routine Section */}
        <section className="space-y-6">
          <h2 className="section-header">Default Daily Routine</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {defaultRoutine.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdateRoutine}
                onDelete={handleDeleteRoutine}
              />
            ))}
          </div>
          <AddTaskButton onClick={handleAddRoutine} />
        </section>

        {/* Tomorrow's Tasks Section */}
        <section className="space-y-6">
          <h2 className="section-header">Tomorrow's Tasks</h2>
          {tomorrowTasks.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {tomorrowTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTomorrow}
                  onDelete={handleDeleteTomorrow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No tasks planned for tomorrow yet</p>
              <p className="text-sm mt-2">Add tasks to get started</p>
            </div>
          )}
          <AddTaskButton onClick={handleAddTomorrow} />
        </section>
      </div>
    </div>
  );
};

export default Index;

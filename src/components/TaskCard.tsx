import { useState } from 'react';
import { Task, calculatePriority, Priority } from '@/types/task';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const getPriorityClasses = (priority: Priority) => {
  switch (priority) {
    case 'Do First':
      return 'priority-do-first';
    case 'Do Next':
      return 'priority-do-next';
    case 'Do Later':
      return 'priority-do-later';
    case 'Skip Today':
      return 'priority-skip';
  }
};

export const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (value: string) => {
    onUpdate({ ...task, title: value });
  };

  const handleDurationChange = (value: string) => {
    onUpdate({ ...task, duration: value });
  };

  const handleUrgencyChange = (value: number[]) => {
    const newUrgency = value[0];
    const newPriority = calculatePriority(newUrgency, task.importance);
    onUpdate({ ...task, urgency: newUrgency, priority: newPriority });
  };

  const handleImportanceChange = (value: number[]) => {
    const newImportance = value[0];
    const newPriority = calculatePriority(task.urgency, newImportance);
    onUpdate({ ...task, importance: newImportance, priority: newPriority });
  };

  const handleCompletedChange = (checked: boolean) => {
    onUpdate({ ...task, completed: checked });
  };

  return (
    <div className={cn("task-card", task.completed && "opacity-50")}>
      <div className="flex items-start gap-3 mb-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleCompletedChange}
          className="mt-0.5"
        />
        <div className="flex-1 space-y-2">
          <Input
            value={task.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            className="text-base font-medium border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-0"
            placeholder="Task title..."
          />
          <Input
            value={task.duration || ''}
            onChange={(e) => handleDurationChange(e.target.value)}
            className="text-xs border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-ring h-7 px-2"
            placeholder="Duration (optional)"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-muted-foreground">
              Urgency
            </label>
            <span className="text-xs font-semibold text-foreground">
              {task.urgency}
            </span>
          </div>
          <Slider
            value={[task.urgency]}
            onValueChange={handleUrgencyChange}
            min={1}
            max={5}
            step={1}
            className="py-1"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-muted-foreground">
              Importance
            </label>
            <span className="text-xs font-semibold text-foreground">
              {task.importance}
            </span>
          </div>
          <Slider
            value={[task.importance]}
            onValueChange={handleImportanceChange}
            min={1}
            max={5}
            step={1}
            className="py-1"
          />
        </div>

        <div className="pt-1">
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-md text-xs font-medium',
              getPriorityClasses(task.priority)
            )}
          >
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

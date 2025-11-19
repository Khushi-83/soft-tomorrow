import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddTaskButtonProps {
  onClick: () => void;
}

export const AddTaskButton = ({ onClick }: AddTaskButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full task-card border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all h-auto py-3"
    >
      <Plus className="h-4 w-4 mr-2" />
      <span className="text-sm">Add New Task</span>
    </Button>
  );
};

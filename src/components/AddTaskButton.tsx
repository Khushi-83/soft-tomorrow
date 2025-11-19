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
      className="w-full task-card border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all"
    >
      <Plus className="h-5 w-5 mr-2" />
      Add New Task
    </Button>
  );
};

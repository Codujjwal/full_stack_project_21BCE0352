import { Task } from "@shared/schema";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const updateMutation = useMutation({
    mutationFn: async (completed: boolean) => {
      await apiRequest("PATCH", `/api/tasks/${task.id}`, { completed });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tasks/${task.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={task.completed}
            disabled={updateMutation.isPending}
            onCheckedChange={(checked) => {
              updateMutation.mutate(checked as boolean);
            }}
          />
          <div className="flex-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-xs text-muted-foreground">
          Created {format(new Date(task.createdAt), 'PP')}
        </span>
        <Button
          variant="ghost"
          size="icon"
          disabled={deleteMutation.isPending}
          onClick={() => deleteMutation.mutate()}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

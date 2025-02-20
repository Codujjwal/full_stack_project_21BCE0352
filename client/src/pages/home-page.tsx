import { TaskCard } from "@/components/task-card";
import { TaskForm } from "@/components/task-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useWebSocket } from "@/lib/useWebSocket";
import { Task } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  useWebSocket(); // Setup WebSocket connection

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.username}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <TaskForm />
          </div>

          <div className="space-y-4">
            {tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasks?.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No tasks yet. Create one to get started!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

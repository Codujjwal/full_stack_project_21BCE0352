import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { queryClient } from './queryClient';
import { Task } from '@shared/schema';

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ type: 'auth', userId: user.id }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'taskCreated':
          case 'taskUpdated':
            queryClient.setQueryData<Task[]>(['/api/tasks'], (old) => {
              if (!old) return [data.task];
              const index = old.findIndex(t => t.id === data.task.id);
              if (index === -1) return [...old, data.task];
              return [...old.slice(0, index), data.task, ...old.slice(index + 1)];
            });
            break;
          case 'taskDeleted':
            queryClient.setQueryData<Task[]>(['/api/tasks'], (old) => {
              if (!old) return [];
              return old.filter(t => t.id !== data.taskId);
            });
            break;
        }
      } catch (e) {
        console.error('WebSocket message processing error:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current = ws;
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [user]);

  return wsRef.current;
}
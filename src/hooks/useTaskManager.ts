
import { useState, useEffect, useCallback } from 'react';
import { taskManager, Task, TaskType } from '@/utils/taskHandler';
import { taskExecutor } from '@/utils/taskExecutor';

export function useTaskManager() {
  const [tasks, setTasks] = useState<Map<string, Task>>(new Map());
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Subscribe to task updates
  useEffect(() => {
    const unsubscribe = taskManager.onUpdate((updatedTasks) => {
      setTasks(new Map(updatedTasks));
      
      // Check if currently active task is completed or failed
      if (activeTaskId) {
        const activeTask = updatedTasks.get(activeTaskId);
        if (activeTask && (activeTask.status === 'completed' || activeTask.status === 'failed')) {
          setIsProcessing(false);
        }
      }
    });
    
    return unsubscribe;
  }, [activeTaskId]);
  
  // Execute a natural language request
  const executeRequest = useCallback(async (request: string) => {
    setIsProcessing(true);
    
    // Create a compound task from the request
    const taskId = taskManager.createCompoundTask(request);
    setActiveTaskId(taskId);
    
    // Execute the task
    await taskExecutor.executeTask(taskId);
    
    return taskId;
  }, []);
  
  // Get all tasks
  const getAllTasks = useCallback(() => {
    return taskManager.getAllTasks();
  }, []);
  
  // Get a specific task
  const getTask = useCallback((taskId: string) => {
    return taskManager.getTask(taskId);
  }, []);
  
  // Get all active tasks
  const getActiveTasks = useCallback(() => {
    return getAllTasks().filter(task => 
      task.status === 'pending' || task.status === 'in-progress'
    );
  }, [getAllTasks]);
  
  // Get completed tasks
  const getCompletedTasks = useCallback(() => {
    return getAllTasks().filter(task => task.status === 'completed');
  }, [getAllTasks]);
  
  // Get task history
  const getTaskHistory = useCallback(() => {
    return taskManager.getTaskHistory();
  }, []);
  
  // Clear completed tasks
  const clearCompletedTasks = useCallback(() => {
    taskManager.clearCompletedTasks();
  }, []);
  
  return {
    tasks,
    activeTaskId,
    isProcessing,
    executeRequest,
    getAllTasks,
    getActiveTasks,
    getCompletedTasks,
    getTask,
    getTaskHistory,
    clearCompletedTasks,
  };
}

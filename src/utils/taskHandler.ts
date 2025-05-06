import { v4 as uuidv4 } from 'uuid';

// Define types for our task system
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface Task {
  id: string;
  type: TaskType;
  description: string;
  status: TaskStatus;
  created: Date;
  updated: Date;
  result?: any;
  error?: string;
  subtasks?: Task[];
  parentId?: string;
}

export type TaskType = 
  | 'search' 
  | 'select' 
  | 'contact' 
  | 'analyze' 
  | 'recommend' 
  | 'filter'
  | 'compound';

export interface TaskContext {
  userId?: string;
  userRole?: string;
  hasPremium?: boolean;
  searchParams?: Record<string, any>;
  selectedItems?: any[];
  actionParams?: Record<string, any>;
}

// Task Manager Class
export class TaskManager {
  private static instance: TaskManager;
  private tasks: Map<string, Task> = new Map();
  private taskHistory: Task[] = [];
  private onUpdateCallbacks: ((tasks: Map<string, Task>) => void)[] = [];

  private constructor() {}

  public static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  // Create a new task
  public createTask(
    type: TaskType, 
    description: string, 
    parentId?: string
  ): Task {
    const id = uuidv4();
    const now = new Date();
    
    const task: Task = {
      id,
      type,
      description,
      status: 'pending',
      created: now,
      updated: now,
      subtasks: [],
      parentId
    };
    
    this.tasks.set(id, task);
    
    // If this is a subtask, add it to the parent
    if (parentId) {
      const parentTask = this.tasks.get(parentId);
      if (parentTask) {
        if (!parentTask.subtasks) {
          parentTask.subtasks = [];
        }
        parentTask.subtasks.push(task);
        this.tasks.set(parentId, parentTask);
      }
    }
    
    this.notifyUpdate();
    return task;
  }

  // Create a compound task from natural language
  public createCompoundTask(request: string): string {
    // Create the parent task
    const task = this.createTask('compound', request);
    
    // Parse the request to determine what subtasks are needed
    const subtasks = this.parseRequestIntoSubtasks(request);
    
    // Create subtasks
    subtasks.forEach(st => {
      this.createTask(st.type, st.description, task.id);
    });
    
    return task.id;
  }

  // Start a task
  public startTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'in-progress';
      task.updated = new Date();
      this.tasks.set(taskId, task);
      this.notifyUpdate();
    }
  }

  // Complete a task with result
  public completeTask(taskId: string, result?: any): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'completed';
      task.result = result;
      task.updated = new Date();
      this.tasks.set(taskId, task);
      
      // Archive completed task to history
      this.taskHistory.push({...task});
      
      // Check if parent task can be completed
      if (task.parentId) {
        const parentTask = this.tasks.get(task.parentId);
        if (parentTask && this.areAllSubtasksComplete(parentTask.id)) {
          this.completeTask(parentTask.id, this.gatherSubtaskResults(parentTask.id));
        }
      }
      
      this.notifyUpdate();
    }
  }

  // Fail a task with error
  public failTask(taskId: string, error: string): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'failed';
      task.error = error;
      task.updated = new Date();
      this.tasks.set(taskId, task);
      
      // Archive failed task to history
      this.taskHistory.push({...task});
      
      // If a task fails, mark its parent as failed too
      if (task.parentId) {
        this.failTask(task.parentId, `Subtask failed: ${error}`);
      }
      
      this.notifyUpdate();
    }
  }

  // Get a task by ID
  public getTask(taskId: string): Task | undefined {
    return this.tasks.get(taskId);
  }

  // Get all active tasks
  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  // Get task history
  public getTaskHistory(): Task[] {
    return [...this.taskHistory];
  }

  // Subscribe to task updates
  public onUpdate(callback: (tasks: Map<string, Task>) => void): () => void {
    this.onUpdateCallbacks.push(callback);
    return () => {
      this.onUpdateCallbacks = this.onUpdateCallbacks.filter(cb => cb !== callback);
    };
  }

  // Clear completed tasks
  public clearCompletedTasks(): void {
    // Keep only pending and in-progress tasks
    const activeTasks = new Map<string, Task>();
    this.tasks.forEach((task, id) => {
      if (task.status === 'pending' || task.status === 'in-progress') {
        activeTasks.set(id, task);
      }
    });
    this.tasks = activeTasks;
    this.notifyUpdate();
  }

  // Helper function to check if all subtasks are complete
  private areAllSubtasksComplete(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || !task.subtasks || task.subtasks.length === 0) return false;
    
    return task.subtasks.every(subtask => 
      this.tasks.get(subtask.id)?.status === 'completed'
    );
  }

  // Helper function to gather results from all subtasks
  private gatherSubtaskResults(taskId: string): any[] {
    const task = this.tasks.get(taskId);
    if (!task || !task.subtasks) return [];
    
    return task.subtasks
      .map(subtask => this.tasks.get(subtask.id)?.result)
      .filter(result => result !== undefined);
  }

  // Helper to notify all subscribers of updates
  private notifyUpdate(): void {
    this.onUpdateCallbacks.forEach(callback => callback(this.tasks));
  }

  // Parse a natural language request into subtasks
  private parseRequestIntoSubtasks(request: string): { type: TaskType; description: string }[] {
    const subtasks: { type: TaskType; description: string }[] = [];
    const lowerRequest = request.toLowerCase();
    
    // Search-related keywords
    if (
      lowerRequest.includes('find') || 
      lowerRequest.includes('search') || 
      lowerRequest.includes('look for') ||
      lowerRequest.includes('discover')
    ) {
      subtasks.push({ 
        type: 'search', 
        description: 'Search for relevant items based on criteria' 
      });
      
      // Add filter subtask if specific criteria mentioned
      if (
        lowerRequest.includes('best') || 
        lowerRequest.includes('top') || 
        lowerRequest.includes('popular') ||
        lowerRequest.includes('with') ||
        lowerRequest.includes('high')
      ) {
        subtasks.push({ 
          type: 'filter', 
          description: 'Filter results based on quality criteria' 
        });
      }
    }
    
    // Analysis/recommendation
    if (
      lowerRequest.includes('recommend') || 
      lowerRequest.includes('suggest') || 
      lowerRequest.includes('best fit')
    ) {
      subtasks.push({ 
        type: 'recommend', 
        description: 'Generate recommendations based on criteria' 
      });
    }
    
    // Contact/action-related
    if (
      lowerRequest.includes('contact') || 
      lowerRequest.includes('send') || 
      lowerRequest.includes('message') ||
      lowerRequest.includes('reach out')
    ) {
      subtasks.push({ 
        type: 'contact', 
        description: 'Prepare contact requests for selected items' 
      });
    }
    
    // If no specific tasks detected, create a generic search subtask
    if (subtasks.length === 0) {
      subtasks.push({ 
        type: 'search', 
        description: 'Process general query' 
      });
    }
    
    return subtasks;
  }
}

// Export singleton instance
export const taskManager = TaskManager.getInstance();

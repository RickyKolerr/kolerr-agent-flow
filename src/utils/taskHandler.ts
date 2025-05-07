
import { v4 as uuidv4 } from 'uuid';

// Task Types
export type TaskType = 'search' | 'filter' | 'contact' | 'general';

// Task Status
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Task Definition
export interface Task {
  id: string;
  type: TaskType;
  input: string;
  status: TaskStatus;
  result?: any;
  error?: string;
  timestamp: string;
  priority: number;
}

// Search Parameters
export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

// Filter Parameters
export interface FilterParams {
  field: string;
  value: any;
  operator?: 'eq' | 'gt' | 'lt' | 'contains' | 'in';
}

// Contact Parameters
export interface ContactParams {
  kolId: string;
  message?: string;
  campaignId?: string;
}

export class TaskHandler {
  private tasks: Task[] = [];
  private maxConcurrentTasks: number = 3;
  private runningTasks: number = 0;
  private taskQueue: Task[] = [];

  // Create a new task
  createTask(type: TaskType, input: string, priority: number = 1): string {
    const taskId = uuidv4();
    const task: Task = {
      id: taskId,
      type,
      input,
      status: 'pending',
      timestamp: new Date().toISOString(),
      priority
    };

    this.tasks.push(task);
    this.taskQueue.push(task);
    
    // Sort queue by priority
    this.taskQueue.sort((a, b) => b.priority - a.priority);
    
    // Process tasks if possible
    this.processTasks();
    
    return taskId;
  }

  // Process tasks in queue
  private processTasks(): void {
    while (this.runningTasks < this.maxConcurrentTasks && this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (task) {
        this.runTask(task);
      }
    }
  }

  // Execute a specific task
  private async runTask(task: Task): Promise<void> {
    this.runningTasks++;
    this.updateTaskStatus(task.id, 'processing');

    try {
      let result;
      
      switch (task.type) {
        case 'search':
          result = await this.handleSearchTask(task.input);
          break;
        case 'filter':
          result = await this.handleFilterTask(task.input);
          break;
        case 'contact':
          result = await this.handleContactTask(task.input);
          break;
        case 'general':
          result = await this.handleGeneralTask(task.input);
          break;
        default:
          throw new Error('Unknown task type');
      }

      this.updateTaskResult(task.id, result);
      this.updateTaskStatus(task.id, 'completed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.updateTaskError(task.id, errorMessage);
      this.updateTaskStatus(task.id, 'failed');
    } finally {
      this.runningTasks--;
      this.processTasks();
    }
  }

  // Update task status
  private updateTaskStatus(taskId: string, status: TaskStatus): void {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = status;
    }
  }

  // Update task result
  private updateTaskResult(taskId: string, result: any): void {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].result = result;
    }
  }

  // Update task error
  private updateTaskError(taskId: string, error: string): void {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].error = error;
    }
  }

  // Get task by ID
  getTask(taskId: string): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  // Get all tasks
  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  // Search task handler
  private async handleSearchTask(input: string): Promise<any> {
    // Parse input as JSON if it's a string
    const params: SearchParams = typeof input === 'string' ? 
      this.parseInputAsSearchParams(input) : 
      input as SearchParams;
    
    // This is a mock implementation - in a real app, this would call your API
    console.log('Executing search task with params:', params);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          results: [
            { id: '1', name: 'Creator 1', followers: 10000 },
            { id: '2', name: 'Creator 2', followers: 20000 }
          ],
          totalResults: 2,
          query: params.query
        });
      }, 1000);
    });
  }

  // Filter task handler
  private async handleFilterTask(input: string): Promise<any> {
    // Parse input as FilterParams
    const filterParams: FilterParams = typeof input === 'string' ? 
      JSON.parse(input) : 
      input as FilterParams;
    
    console.log('Executing filter task with params:', filterParams);
    
    // Simulate filtering
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          filtered: true,
          field: filterParams.field,
          value: filterParams.value
        });
      }, 500);
    });
  }

  // Contact task handler
  private async handleContactTask(input: string): Promise<any> {
    // Parse input as ContactParams
    const contactParams: ContactParams = typeof input === 'string' ? 
      JSON.parse(input) : 
      input as ContactParams;
    
    console.log('Executing contact task with params:', contactParams);
    
    // Simulate contact preparation
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          contacted: true,
          kolId: contactParams.kolId,
          message: contactParams.message || 'Default message',
          timestamp: new Date().toISOString()
        });
      }, 800);
    });
  }

  // General task handler
  private async handleGeneralTask(input: string): Promise<any> {
    console.log('Executing general task with input:', input);
    
    // Simulate general task
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          completed: true,
          input,
          notes: 'General task completed'
        });
      }, 300);
    });
  }

  // Parse string input as SearchParams
  private parseInputAsSearchParams(input: string): SearchParams {
    try {
      return JSON.parse(input);
    } catch {
      // If not valid JSON, treat as a simple query string
      return { query: input };
    }
  }
}

// Create a singleton instance
const taskHandler = new TaskHandler();
export default taskHandler;

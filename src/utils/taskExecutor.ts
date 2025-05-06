import { mockCreatorData } from "@/data/mockCreators";
import { taskManager, TaskType, Task } from "./taskHandler";
import { toast } from "sonner";

export class TaskExecutor {
  private static instance: TaskExecutor;
  
  private constructor() {}
  
  public static getInstance(): TaskExecutor {
    if (!TaskExecutor.instance) {
      TaskExecutor.instance = new TaskExecutor();
    }
    return TaskExecutor.instance;
  }
  
  // Execute a task based on its type
  public async executeTask(taskId: string): Promise<void> {
    const task = taskManager.getTask(taskId);
    if (!task) {
      console.error("Task not found:", taskId);
      return;
    }
    
    taskManager.startTask(taskId);
    
    try {
      switch (task.type) {
        case 'compound':
          await this.executeCompoundTask(task);
          break;
        case 'search':
          await this.executeSearchTask(task);
          break;
        case 'filter':
          await this.executeFilterTask(task);
          break;
        case 'contact':
          await this.executeContactTask(task);
          break;
        case 'recommend':
          await this.executeRecommendTask(task);
          break;
        case 'analyze':
          await this.executeAnalyzeTask(task);
          break;
        case 'select':
          await this.executeSelectTask(task);
          break;
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }
    } catch (error) {
      console.error(`Error executing task ${task.id}:`, error);
      taskManager.failTask(taskId, error instanceof Error ? error.message : String(error));
    }
  }
  
  // Execute a compound task by executing all its subtasks
  private async executeCompoundTask(task: Task): Promise<void> {
    if (!task.subtasks || task.subtasks.length === 0) {
      taskManager.completeTask(task.id, []);
      return;
    }
    
    for (const subtask of task.subtasks) {
      await this.executeTask(subtask.id);
      
      // If any subtask failed, stop execution
      const updatedSubtask = taskManager.getTask(subtask.id);
      if (updatedSubtask?.status === 'failed') {
        break;
      }
    }
    
    // The parent task completion will be handled by the TaskManager
    // when all subtasks complete
  }
  
  // Execute a search task
  private async executeSearchTask(task: Task): Promise<void> {
    // Extract search parameters from task description
    const searchParams = this.extractSearchParams(task.description);
    
    // Simulate API delay
    await this.simulateDelay(1000);
    
    // Perform search on mock data
    const results = this.searchCreators(searchParams);
    
    taskManager.completeTask(task.id, results);
  }
  
  // Execute a filter task
  private async executeFilterTask(task: Task): Promise<void> {
    // Get search results from parent task
    const parentResults = this.getParentTaskResults(task);
    if (!parentResults || !Array.isArray(parentResults)) {
      throw new Error("No valid search results found from previous task");
    }
    
    // Extract filter parameters from task description
    const filterParams = this.extractFilterParams(task.description);
    
    // Simulate API delay
    await this.simulateDelay(800);
    
    // Apply filters
    const filteredResults = this.applyFilters(parentResults, filterParams);
    
    taskManager.completeTask(task.id, filteredResults);
  }
  
  // Execute a contact task
  private async executeContactTask(task: Task): Promise<void> {
    // Get filtered results from previous tasks
    const targetCreators = this.getParentTaskResults(task);
    if (!targetCreators || !Array.isArray(targetCreators) || targetCreators.length === 0) {
      throw new Error("No creators to contact from previous tasks");
    }
    
    // Simulate API delay
    await this.simulateDelay(1500);
    
    // Mock contact request preparation
    const contactRequests = targetCreators.map(creator => ({
      creatorId: creator.id,
      creatorName: creator.fullName,
      requestStatus: 'prepared',
      message: `Hi ${creator.fullName}, I'd like to collaborate with you on a campaign.`
    }));
    
    taskManager.completeTask(task.id, contactRequests);
    
    // Show toast notification about premium feature
    toast.info("Premium feature required", {
      description: "Upgrade to premium to send contact requests to creators",
      action: {
        label: "Upgrade",
        onClick: () => window.location.href = "/pricing"
      }
    });
  }
  
  // Execute a recommendation task
  private async executeRecommendTask(task: Task): Promise<void> {
    // Get filtered results from previous tasks
    const candidates = this.getParentTaskResults(task);
    if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
      throw new Error("No candidates for recommendations from previous tasks");
    }
    
    // Simulate API delay
    await this.simulateDelay(1200);
    
    // Sort by engagement rate and add recommendation score
    const recommendations = candidates
      .map(creator => ({
        ...creator,
        recommendationScore: Math.round(creator.engagementRate * 100) + Math.random() * 10
      }))
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);
    
    taskManager.completeTask(task.id, recommendations);
  }
  
  // Execute an analyze task
  private async executeAnalyzeTask(task: Task): Promise<void> {
    // Get data to analyze from parent task
    const dataToAnalyze = this.getParentTaskResults(task);
    
    // Simulate API delay
    await this.simulateDelay(1000);
    
    // Mock analysis results
    const analysisResult = {
      totalCount: Array.isArray(dataToAnalyze) ? dataToAnalyze.length : 0,
      averageEngagement: Array.isArray(dataToAnalyze) 
        ? dataToAnalyze.reduce((sum, item) => sum + (item.engagementRate || 0), 0) / dataToAnalyze.length 
        : 0,
      topCategory: "Tech",
      potentialReach: "500K-1.5M",
      estimatedCost: "$2,500-5,000"
    };
    
    taskManager.completeTask(task.id, analysisResult);
  }
  
  // Execute a select task
  private async executeSelectTask(task: Task): Promise<void> {
    // Get options to select from
    const options = this.getParentTaskResults(task);
    if (!options || !Array.isArray(options) || options.length === 0) {
      throw new Error("No options available for selection");
    }
    
    // Simulate selection algorithm with delay
    await this.simulateDelay(700);
    
    // Select top 3 options
    const selected = options.slice(0, 3);
    
    taskManager.completeTask(task.id, selected);
  }
  
  // Helper: Extract search parameters from a task description
  private extractSearchParams(description: string): Record<string, any> {
    const params: Record<string, any> = {};
    const lowerDesc = description.toLowerCase();
    
    // Extract niche/category
    const niches = ['tech', 'beauty', 'fashion', 'gaming', 'travel', 'fitness', 'food'];
    for (const niche of niches) {
      if (lowerDesc.includes(niche)) {
        params.niche = niche;
        break;
      }
    }
    
    // Extract follower count requirements
    if (lowerDesc.includes('1m') || lowerDesc.includes('1 million')) {
      params.minFollowers = 1000000;
    } else if (lowerDesc.includes('500k')) {
      params.minFollowers = 500000;
    } else if (lowerDesc.includes('100k')) {
      params.minFollowers = 100000;
    }
    
    // Extract engagement requirements
    if (lowerDesc.includes('high engagement')) {
      params.minEngagement = 0.05; // 5%
    }
    
    return params;
  }
  
  // Helper: Extract filter parameters from a task description
  private extractFilterParams(description: string): Record<string, any> {
    const params: Record<string, any> = {};
    const lowerDesc = description.toLowerCase();
    
    // Extract quality indicators
    if (lowerDesc.includes('best') || lowerDesc.includes('top')) {
      params.sortBy = 'quality';
    }
    
    // Extract engagement filters
    if (lowerDesc.includes('high engagement')) {
      params.minEngagement = 0.05; // 5%
    }
    
    // Extract follower count filters
    if (lowerDesc.includes('popular')) {
      params.minFollowers = 500000;
    }
    
    return params;
  }
  
  // Helper: Search mock creator data
  private searchCreators(params: Record<string, any>): any[] {
    let results = [...mockCreatorData];
    
    // Filter by niche if specified
    if (params.niche) {
      results = results.filter(creator => 
        creator.niche.some(n => n.toLowerCase() === params.niche.toLowerCase())
      );
    }
    
    // Filter by minimum followers if specified
    if (params.minFollowers) {
      results = results.filter(creator => creator.followers >= params.minFollowers);
    }
    
    // Filter by minimum engagement if specified
    if (params.minEngagement) {
      results = results.filter(creator => creator.engagementRate >= params.minEngagement);
    }
    
    return results;
  }
  
  // Helper: Apply filters to results
  private applyFilters(items: any[], filterParams: Record<string, any>): any[] {
    let results = [...items];
    
    // Apply minimum engagement filter
    if (filterParams.minEngagement) {
      results = results.filter(item => item.engagementRate >= filterParams.minEngagement);
    }
    
    // Apply minimum followers filter
    if (filterParams.minFollowers) {
      results = results.filter(item => item.followers >= filterParams.minFollowers);
    }
    
    // Sort by quality (engagement rate) if specified
    if (filterParams.sortBy === 'quality') {
      results.sort((a, b) => b.engagementRate - a.engagementRate);
    }
    
    return results;
  }
  
  // Helper: Get results from parent task
  private getParentTaskResults(task: Task): any {
    if (!task.parentId) return null;
    
    const parentTask = taskManager.getTask(task.parentId);
    if (!parentTask) return null;
    
    // If direct parent has results, use those
    if (parentTask.result) return parentTask.result;
    
    // Otherwise, find the closest sibling with results
    if (parentTask.subtasks && parentTask.subtasks.length > 0) {
      for (const sibling of parentTask.subtasks) {
        if (sibling.id !== task.id) {
          const siblingTask = taskManager.getTask(sibling.id);
          if (siblingTask && siblingTask.status === 'completed' && siblingTask.result) {
            return siblingTask.result;
          }
        }
      }
    }
    
    return null;
  }
  
  // Helper: Simulate API delay
  private async simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const taskExecutor = TaskExecutor.getInstance();

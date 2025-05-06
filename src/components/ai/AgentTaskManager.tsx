
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, ArrowRight, Search } from 'lucide-react';
import { useTaskManager } from '@/hooks/useTaskManager';
import { TaskProgressIndicator } from './TaskProgressIndicator';
import { TaskResultsDisplay } from './TaskResultsDisplay';

interface AgentTaskManagerProps {
  className?: string;
}

export const AgentTaskManager: React.FC<AgentTaskManagerProps> = ({ className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const { 
    isProcessing, 
    activeTaskId, 
    executeRequest, 
    getTask,
    getCompletedTasks
  } = useTaskManager();
  
  const activeTask = activeTaskId ? getTask(activeTaskId) : null;
  const completedTasks = getCompletedTasks();
  const latestCompletedTask = completedTasks.length > 0 
    ? completedTasks[completedTasks.length - 1] 
    : null;
  
  const handleExecuteRequest = async () => {
    if (inputValue.trim() && !isProcessing) {
      await executeRequest(inputValue);
      setInputValue('');
    }
  };
  
  const suggestedQueries = [
    "Find me top tech KOLs with high engagement",
    "Find beauty influencers and send collaboration requests",
    "Search for gaming creators with over 500K followers",
  ];
  
  return (
    <div className={`bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden ${className}`}>
      <div className="bg-black/40 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-brand-pink flex items-center justify-center mr-3">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Advanced AI Agent</h1>
            <p className="text-xs text-gray-400">
              Ask for complex tasks like search and outreach
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Active task progress */}
        {isProcessing && activeTask && (
          <TaskProgressIndicator task={activeTask} />
        )}
        
        {/* Task results */}
        {!isProcessing && latestCompletedTask && (
          <TaskResultsDisplay task={latestCompletedTask} />
        )}
        
        {/* Empty state */}
        {!isProcessing && !latestCompletedTask && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Bot className="h-12 w-12 text-brand-pink mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Enhanced AI Agent</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              I can now handle complex tasks like finding creators and preparing outreach messages in a single request.
            </p>
            <div className="grid gap-2 w-full max-w-md">
              {suggestedQueries.map((query, i) => (
                <Button 
                  key={i}
                  variant="outline"
                  className="justify-start text-left border-white/10 hover:bg-white/5"
                  onClick={() => {
                    setInputValue(query);
                    executeRequest(query);
                  }}
                >
                  <Search className="h-3 w-3 mr-2 text-brand-pink" />
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex gap-2">
          <Input 
            placeholder="Try: Find me tech KOLs and prepare collaboration messages..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleExecuteRequest()}
            disabled={isProcessing}
            className="bg-black/60 border-white/10"
          />
          <Button 
            onClick={handleExecuteRequest} 
            disabled={isProcessing || !inputValue.trim()}
            className="bg-brand-pink hover:bg-brand-pink/90"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

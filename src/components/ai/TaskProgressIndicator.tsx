
import React from 'react';
import { Task } from '@/utils/taskHandler';
import { Loader2, Check, X, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TaskProgressIndicatorProps {
  task: Task;
}

export const TaskProgressIndicator: React.FC<TaskProgressIndicatorProps> = ({ task }) => {
  const getCompletionPercentage = () => {
    if (!task.subtasks || task.subtasks.length === 0) {
      switch (task.status) {
        case 'pending': return 0;
        case 'in-progress': return 50;
        case 'completed': return 100;
        case 'failed': return 100;
        default: return 0;
      }
    }
    
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter(
      st => st.status === 'completed' || st.status === 'failed'
    ).length;
    
    return Math.floor((completedSubtasks / totalSubtasks) * 100);
  };
  
  const renderStatusIcon = () => {
    switch (task.status) {
      case 'pending':
        return null;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 animate-spin text-brand-pink" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const renderSubtasks = () => {
    if (!task.subtasks || task.subtasks.length === 0) {
      return null;
    }
    
    return (
      <div className="mt-2 space-y-1">
        {task.subtasks.map(subtask => (
          <div key={subtask.id} className="flex items-center text-xs">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              {subtask.status === 'pending' && <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
              {subtask.status === 'in-progress' && <Loader2 className="h-3 w-3 animate-spin text-brand-pink" />}
              {subtask.status === 'completed' && <Check className="h-3 w-3 text-green-500" />}
              {subtask.status === 'failed' && <X className="h-3 w-3 text-red-500" />}
            </div>
            <span className="text-gray-400">{subtask.description}</span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="p-3 bg-black/20 border border-white/10 rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium flex items-center">
          {renderStatusIcon()}
          <span className={`ml-1 ${task.status === 'failed' ? 'text-red-400' : ''}`}>
            {task.description}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          {getCompletionPercentage()}%
        </div>
      </div>
      
      <Progress value={getCompletionPercentage()} className="h-1" />
      
      {task.status === 'failed' && (
        <div className="mt-2 text-xs text-red-400 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {task.error}
        </div>
      )}
      
      {renderSubtasks()}
    </div>
  );
};

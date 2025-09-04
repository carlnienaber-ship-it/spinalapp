import React, { useMemo } from 'react';
import { Task } from '../../types';
import Button from '../ui/Button';
import Header from '../ui/Header';
import Toggle from '../ui/Toggle';

interface TasksScreenProps {
  title: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onComplete: () => void;
  buttonText: string;
  isSubmitting?: boolean;
  submitError?: string | null;
}

const TasksScreen: React.FC<TasksScreenProps> = ({ title, tasks, setTasks, onComplete, buttonText, isSubmitting = false, submitError = null }) => {

  const handleToggleChange = (taskId: number, completed: boolean) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  const handleRadioChange = (taskId: number, value: string) => {
    setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId ? { ...task, selectedValue: value, completed: true } : task
    ));
  };

  const handleNotesChange = (taskId: number, notes: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, notes } : task
    ));
  };

  const allTasksCompleted = useMemo(() => {
    return tasks.every(task => task.isOptional || task.completed);
  }, [tasks]);

  return (
    <div className="animate-fade-in">
      <Header title={title} subtitle="Complete all tasks to proceed." />
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold" style={{ fontFamily: '"Avenir Next Bold", sans-serif' }}>{task.name}</h3>
                {task.description && <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: '"Avenir Next", sans-serif' }}>{task.description}</p>}
              </div>
              {task.type === 'toggle' && (
                <Toggle checked={task.completed} onChange={(checked) => handleToggleChange(task.id, checked)} />
              )}
            </div>
            {task.type === 'radio' && (
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                {task.options?.map(option => (
                  <button
                    key={option}
                    onClick={() => handleRadioChange(task.id, option)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      task.selectedValue === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {task.name === 'Check beer quality' && task.selectedValue === 'Other' && (
              <textarea
                placeholder="Note which beer was swapped..."
                value={task.notes || ''}
                onChange={(e) => handleNotesChange(task.id, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {task.name === 'Close all outstanding bar tabs' && (
               <textarea
                placeholder="Optional: Note any unclosed tabs and why."
                value={task.notes || ''}
                onChange={(e) => handleNotesChange(task.id, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>
      {submitError && (
        <div className="mt-4 text-center p-3 bg-red-900 border border-red-700 text-red-200 rounded-lg">
          {submitError}
        </div>
      )}
      <div className="mt-8">
        <Button onClick={onComplete} disabled={!allTasksCompleted || isSubmitting}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TasksScreen;

import { Task, TaskStatus, TaskPriority } from '../../../types';

export interface TaskService {
    getTasks(projectId: string): Promise<Task[]>;
    createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
    updateTask(id: string, task: Partial<Task>): Promise<Task>;
    deleteTask(id: string): Promise<void>;
}

export class TaskServiceImpl implements TaskService {
    async getTasks(projectId: string): Promise<Task[]> {
        throw new Error('Not implemented');
    }

    async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        throw new Error('Not implemented');
    }

    async updateTask(id: string, task: Partial<Task>): Promise<Task> {
        throw new Error('Not implemented');
    }

    async deleteTask(id: string): Promise<void> {
        throw new Error('Not implemented');
    }
}
export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    IN_REVIEW = 'IN_REVIEW',
    DONE = 'DONE'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'MEMBER';
    avatarUrl?: string;
    teams?: string[]; // Array of team IDs
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId: string;
    creatorId: string;
    projectId: string;
    dueDate?: Date;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    parentTaskId?: string; // For subtasks
}

export interface Project {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    members: string[]; // Array of user IDs
    createdAt: Date;
    updatedAt: Date;
    status: 'ACTIVE' | 'ARCHIVED';
}

export interface Comment {
    id: string;
    taskId: string;
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    parentCommentId?: string; // For threaded comments
}
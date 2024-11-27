import React from 'react';
import { Task, TaskStatus, TaskPriority } from "../../../types";
import { TaskList } from "./TaskList";

export const TaskManagement = () => {
    const mockTasks: Task[] = [
        {
            id: '1',
            title: 'Implement user authentication',
            description: 'Set up JWT authentication for the API',
            status: TaskStatus.IN_PROGRESS,
            priority: TaskPriority.HIGH,
            assigneeId: 'user1',
            creatorId: 'user1',
            projectId: 'project1',
            tags: ['backend', 'security'],
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
        },
        {
            id: '2',
            title: 'Create Login Page',
            description: 'Set up JWT authentication for the UI',
            status: TaskStatus.IN_PROGRESS,
            priority: TaskPriority.HIGH,
            assigneeId: 'user1',
            creatorId: 'user1',
            projectId: 'project1',
            tags: ['frontend', 'security'],
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
        },
    ];

    const handleTaskSelect = (task: Task) => {
        console.log('Selected task:', task);
    };

    return (
        <div>
            <header>
                <h1>Task Management</h1>
                <button>Create New Task</button>
            </header>

            <main>
                <aside>
                    {/* Project navigation will go here */}
                </aside>

                <section>
                    <TaskList
                        tasks={mockTasks}
                        onTaskSelect={handleTaskSelect}
                    />
                </section>
            </main>
        </div>
    );
};
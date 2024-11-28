import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority, User } from '../../../types';
import { TaskList } from './TaskList';
import { CreateTaskModal } from './CreateTaskModal';

export const TaskManagement = () => {
    const MOCK_USER: User = {
      id: 'user1',
      name: 'John Doe',
      email: 'JohnDoe@yahoo.com',
      role: 'MEMBER'
    };

    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const handleTaskSelect = (task: Task) => {
        console.log('Selected task:', task);
    };

    const handleTaskCreate = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, {
            ...newTask,
            id: crypto.randomUUID(), // Generate a unique ID
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    };

    return (
        <div>
            <header>
                <h1>Task Management</h1>
                <button onClick={() => setIsModalOpen(true)}>Create New Task</button>
            </header>

            {isModalOpen && (
                <CreateTaskModal
                    onClose={() => setIsModalOpen(false)}
                    user={MOCK_USER}
                    onTaskCreate={handleTaskCreate}
                />
            )}

            <main>
                <aside>
                    {/* Project navigation will go here */}
                </aside>

                <section>
                    <TaskList
                        tasks={tasks}
                        onTaskSelect={handleTaskSelect}
                    />
                </section>
            </main>
        </div>
    );
};
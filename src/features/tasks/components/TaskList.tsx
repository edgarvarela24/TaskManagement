import React from 'react';
import { Task, TaskPriority, TaskStatus } from "../../../types";
import styles from './TaskList.module.css';

interface TaskListProps {
    tasks: Task[];
    onTaskSelect?: (task: Task) => void;
}

export const TaskList = ({ tasks, onTaskSelect }: TaskListProps) => {
    return (
        <div className={styles.taskList}>
            <h2>Tasks</h2>
            <div>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => onTaskSelect?.(task)}
                    />
                ))}
            </div>
        </div>
    )
};

interface TaskCardProps {
    task: Task;
    onClick?: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
    const getStatusColor = (status: TaskStatus) => {
        const colors = {
            [TaskStatus.TODO]: '#6c757d',
            [TaskStatus.IN_PROGRESS]: '#007bff',
            [TaskStatus.IN_REVIEW]: '#ffc107',
            [TaskStatus.DONE]: '#28a745'
        };
        return colors[status];
    };

    const getPriorityColor = (priority: TaskPriority) => {
        const colors = {
            [TaskPriority.LOW]: '#28a745',
            [TaskPriority.MEDIUM]: '#ffc107',
            [TaskPriority.HIGH]: '#fd7e14',
            [TaskPriority.URGENT]: '#dc3545'
        };
        return colors[priority];
    };

    return (
        <div
            className={styles.taskCard}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <div className={styles.taskHeader}>
                <h3 className={styles.taskTitle}>{task.title}</h3>
            </div>
            <div className={styles.taskMeta}>
            <span
                className={styles.status}
                style={{
                    backgroundColor: getStatusColor(task.status) + '20',
                    color: getStatusColor(task.status)
                }}
            >
                {task.status}
            </span>
                <span
                    className={styles.priority}
                    style={{
                        backgroundColor: getPriorityColor(task.priority) + '20',
                        color: getPriorityColor(task.priority)
                    }}
                >
                    {task.priority}
                </span>
            </div>
            <p className={styles.description}>{task.description}</p>
            {task.dueDate && (
                <div className={styles.dueDate}>
                    Due: {task.dueDate.toLocaleDateString()}
                </div>
            )}
        </div>
    )
}
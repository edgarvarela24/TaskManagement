import React, { useState } from "react";
import { Task, TaskPriority, TaskStatus, User } from "../../../types";
import styles from './CreateTaskModal.module.css';

interface CreateTaskModalProps {
    user: User;
    onClose: () => void;
    onTaskCreate: (task: Task) => void;
}

export const CreateTaskModal = ({ user, onClose, onTaskCreate }: CreateTaskModalProps) => {
    // Form field states
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState<TaskStatus>(TaskStatus.TODO);
    const [ priority, setPriority ] = useState<TaskPriority>(TaskPriority.MEDIUM);
    const [ dueDate, setDueDate ] = useState<string>('');
    const [ tags, setTags ] = useState<string[]>([]);
    const [ tagInput, setTagInput ] = useState<string>('');

    // Form submission state
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                creatorId: user.id,
                assigneeId: user.id,
                projectId: 'project1',
                tags
            };

            onTaskCreate(newTask as Task);
            onClose();
        } catch (error) {
            setError('Failed to create task');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault(); // Prevent form submission
            e.stopPropagation(); // Stop event bubbling
            setTags(prevTags => [ ...prevTags, tagInput.trim() ]);
            setTagInput('');
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTags(prevTags => [ ...prevTags, tagInput.trim() ]);
            setTagInput('');
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Create New Task</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="title">Title</label>
                        <input
                            className={styles.input}
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="description">Description</label>
                        <textarea
                            className={styles.textarea}
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="status">Status</label>
                        <select
                            className={styles.select}
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                        >
                            {Object.values(TaskStatus).map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="priority">Priority</label>
                        <select
                            className={styles.select}
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as TaskPriority)}
                        >
                            {Object.values(TaskPriority).map((priority) => (
                                <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="dueDate">Due Date</label>
                        <input
                            className={styles.input}
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tags</label>
                        <div className={styles.tagContainer}>
                            {tags.map(tag => (
                                <span key={tag} className={styles.tag}>
                  {tag}
                                    <button
                                        type="button"
                                        className={styles.tagRemove}
                                        onClick={() => setTags(tags.filter(t => t !== tag))}
                                    >
                    ×
                  </button>
                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                className={styles.input}
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Type a tag"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className={`${styles.button} ${styles.cancelButton}`}
                                style={{ padding: '4px 8px' }}
                            >
                                Add Tag
                            </button>
                        </div>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`${styles.button} ${styles.cancelButton}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.button} ${styles.submitButton}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
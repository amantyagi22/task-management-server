import prismaClient from "../../clients/db";

const queries = {
    getTasks: async () => {
        const tasks = await prismaClient.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return tasks.map(task => ({
            ...task,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString()
        }));
    },
    getTask: async (_: any, { id }: { id: string }) => {
        const task = await prismaClient.task.findUnique({
            where: { id }
        });
        if (!task) return null;
        return {
            ...task,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString()
        };
    }
};

const mutations = {
    createTask: async (_: any, { title, description }: { title: string, description: string }) => {
        if (!title || title.trim() === '') {
            return {
                success: false,
                message: "Task title cannot be empty",
                task: null
            };
        }

        const task = await prismaClient.task.create({
            data: { 
                title: title.trim(),
                description: description || ''
            }
        });
        return {
            success: true,
            message: "Task created successfully",
            task: {
                ...task,
                createdAt: task.createdAt.toISOString(),
                updatedAt: task.updatedAt.toISOString()
            }
        };
    },
    updateTask: async (_: any, { id, title, description, completed }: { id: string, title?: string, description?: string, completed?: boolean }) => {
        if (title !== undefined && (title === '' || title.trim() === '')) {
            return {
                success: false,
                message: "Task title cannot be empty",
                task: null
            };
        }

        const task = await prismaClient.task.update({
            where: { id },
            data: { 
                title: title?.trim(),
                description,
                completed,
                updatedAt: new Date()
            }
        });
        return {
            success: true,
            message: "Task updated successfully",
            task: {
                ...task,
                createdAt: task.createdAt.toISOString(),
                updatedAt: task.updatedAt.toISOString()
            }
        };
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
        const task = await prismaClient.task.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Task deleted successfully",
            task: {
                ...task,
                createdAt: task.createdAt.toISOString(),
                updatedAt: task.updatedAt.toISOString()
            }
        };
    }
};

export const resolvers = { queries, mutations };
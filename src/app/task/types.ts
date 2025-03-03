export const types = `#graphql
    type Task {
        id: ID!
        title: String!
        description: String!
        completed: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type TaskResponse {
        success: Boolean!
        message: String!
        task: Task
    }`;

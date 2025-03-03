export const mutations = `#graphql
    createTask(title: String!, description: String!): TaskResponse
    updateTask(id: ID!, title: String, description: String, completed: Boolean): TaskResponse
    deleteTask(id: ID!): TaskResponse
`;

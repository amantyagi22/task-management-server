export const mutations = `#graphql
    createTask(title: String!): TaskResponse
    updateTask(id: ID!, title: String, completed: Boolean): TaskResponse
    deleteTask(id: ID!): TaskResponse
`;

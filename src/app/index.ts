import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import { Task } from './task';

export async function initServer() {
    const app = express();

    app.use(json());
    app.use(cors({
        origin: "*",
        credentials: true
    }));
    
    const graphqlServer = new ApolloServer({
        typeDefs: `
        ${Task.types}
        type Query {
            ${Task.queries}
        }
        type Mutation {
            ${Task.mutations}
        }`,
        resolvers: {
            Query: { ...Task.resolvers.queries },
            Mutation: { ...Task.resolvers.mutations }
        },
    });

    await graphqlServer.start();

    app.use('/graphql', expressMiddleware(graphqlServer, {
        context: async ({ req }) => ({
            token: req.headers.authorization,
        }),
    }));
    return app;
}

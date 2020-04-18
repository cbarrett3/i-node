const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
    Query: {
        info: () => `This is the API of indigo culture`,
        post: (root, args, context) => {
            return context.prisma.post.findOne({
                where: {
                    id: parseInt(args.id),
                },
            })
        },
        feed: (root, args, context, info) => {
            return context.prisma.post.findMany()
        }
    },
    Mutation: {
        createPost: (root, args, context) => {
            return context.prisma.post.create({
                data: {
                    url: args.url,
                    description: args.description
                }
            })
        },
        updatePost: (root, args, context) => {
            return context.prisma.post.update({
                where: {
                    id: parseInt(args.id),
                },
                data : {
                    url: args.url,
                    description: args.description
                }
            })
        },
        deletePost: (root, args, context) => {
            return context.prisma.post.delete({
                where: {
                    id: parseInt(args.id),
                }
            })
        },
    },
    Post: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))


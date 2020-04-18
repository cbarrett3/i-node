const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    User,
    Post
}
    // Query: {
    //     info: () => `This is the API of indigo culture`,
    //     post: (root, args, context) => {
    //         return context.prisma.post.findOne({
    //             where: {
    //                 id: parseInt(args.id),
    //             },
    //         })
    //     },
    //     feed: (root, args, context, info) => {
    //         return context.prisma.post.findMany()
    //     }
    // },
    // Mutation: {
    //     createPost: (root, args, context) => {
    //         return context.prisma.post.create({
    //             data: {
    //                 content: args.content,
    //                 author_id: args.author_id,
    //                 attatchment_url: args.attatchment_url,
    //                 time_posted: DateTime
    //             }
    //         })
    //     },
    //     updatePost: (root, args, context) => {
    //         return context.prisma.post.update({
    //             where: {
    //                 id: parseInt(args.id),
    //             },
    //             data : {
    //                 url: args.url,
    //                 content: args.content
    //             }
    //         })
    //     },
    //     deletePost: (root, args, context) => {
    //         return context.prisma.post.delete({
    //             where: {
    //                 id: parseInt(args.id),
    //             }
    //         })
    //     },
    // },
    // Post: {
    //     id: (parent) => parent.id,
    //     description: (content) => parent.content,
    //     url: (parent) => parent.url,
    // }
//}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))


const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')
const Post_Clap = require('./resolvers/Post_Clap')
const Post_Tag = require('./resolvers/Post_Tag')
const Comment = require('./resolvers/Comment')
const Follow = require('./resolvers/Follow')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    User,
    Post,
    Post_Clap,
    Post_Tag,
    Comment,
    Follow
}

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


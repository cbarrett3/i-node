const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')
const Post_Clap = require('./resolvers/Post_Clap')
const Post_Tag = require('./resolvers/Post_Tag')
const Post_Comment = require('./resolvers/Post_Comment')
const Post_Comment_Clap = require('./resolvers/Post_Comment_Clap')
const Question = require('./resolvers/Question')
const Question_Clap = require('./resolvers/Question_Clap')
const Question_Tag = require('./resolvers/Question_Tag')
const Question_Comment = require('./resolvers/Question_Comment')
const Question_Comment_Clap = require('./resolvers/Question_Comment_Clap')
const Follow = require('./resolvers/Follow')
const Tag = require('./resolvers/Tag')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    User,
    Post,
    Post_Clap,
    Post_Tag,
    Post_Comment,
    Post_Comment_Clap,
    Question,
    Question_Clap,
    Question_Tag,
    Question_Comment,
    Question_Comment_Clap,
    Follow,
    Tag
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


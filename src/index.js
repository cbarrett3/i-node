const { GraphQLServer } = require('graphql-yoga')

// temporary data
let posts = [{
    id: 'post-0',
    description: 'check out my site aye',
    url: 'www.connorbarrett.me',
}]
let idCount = posts.length

const resolvers = {
    Query: {
        info: () => `This is the API of indie culture`,
        post: (args) => {
            return posts[args.id]
        },
        feed: () => posts,
    },
    Mutation: {
        post: (parent, args) => {
            const post = {
                id: `post-${idCount++}`,
                description: args.description,
                url: args.url
            }
            posts.push(post)
            return post
        },
        updatePost: (parent, args) => {
            posts.forEach((post) => {
                if(post.id === args.id){
                  post.id = args.id
                  post.url = args.url
                  post.description = args.description
                 }
                return post
            })
        },
        deletePost: (parent, args) => {
            const removeIndex = posts.findIndex(post => post.id === args.id)
            const removedPost = posts[removeIndex]
            posts.splice(removeIndex, 1)
            return removedPost
        }
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
})
server.start(() => console.log(`Server is running on http://localhost:4000`))


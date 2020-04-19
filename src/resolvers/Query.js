function info () {
    return 'This is the API of indigo culture'
}
function feed(root, args, context, info) {
    return context.prisma.post.findMany()
}
function findPost(root, args, context) {
    return context.prisma.post.findOne({
        where: {
            id: parseInt(args.id),
        },
    })
}

module.exports = {
    info,
    findPost,
    feed
}
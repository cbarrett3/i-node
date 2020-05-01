function author(parent, args, context) {
    return context.prisma.post_Comment.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function post(parent, args, context) {
    return context.prisma.post_Comment.findOne({
        where: {
            id: parent.id
        },
    }).post()
}

function post_comment_claps(parent, args, context) {
    return context.prisma.post_Comment.findOne({
        where: {
            id: parent.id
        },
    }).post_comment_claps()
}

module.exports = {
    author,
    post,
    post_comment_claps
}
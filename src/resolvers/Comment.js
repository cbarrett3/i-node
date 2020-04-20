function author(parent, args, context) {
    return context.prisma.comment.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function post(parent, args, context) {
    return context.prisma.comment.findOne({
        where: {
            id: parent.id
        },
    }).post()
}

function comment_claps(parent, args, context) {
    return context.prisma.comment.findOne({
        where: {
            id: parent.id
        },
    }).comment_claps()
}

module.exports = {
    author,
    post,
    comment_claps
}
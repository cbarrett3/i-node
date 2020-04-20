function author(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function comments(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).comments()
}

function claps(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).claps()
}

module.exports = {
    author,
    comments,
    claps
}
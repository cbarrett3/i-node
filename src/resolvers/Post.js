function author(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function post_comments(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).post_comments()
}

function post_claps(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).post_claps()
}

function post_tags(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).post_tags()
}

module.exports = {
    author,
    post_comments,
    post_claps,
    post_tags
}
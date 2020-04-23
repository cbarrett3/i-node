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

function post_tags(parent, args, context) {
    return context.prisma.post.findOne({ 
        where: {
            id: parent.id
        },
    }).post_tags()
}

// function post_tags(parent, args, context) {
//     return context.prisma.post.findOne({ 
//         where: {
//             id: parent.id
//         },
//     }).post_tags()
// }

module.exports = {
    author,
    comments,
    claps,
    post_tags
}
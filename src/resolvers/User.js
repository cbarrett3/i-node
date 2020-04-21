function posts(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).posts()
}

function comments(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).comments()
}

function post_claps(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).post_claps()
}

function followers(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).followers()
}

function following(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).following()
}

module.exports = {
    posts,
    comments,
    post_claps,
    followers,
    following
}
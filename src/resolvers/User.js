function posts(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).posts()
}

function post_comments(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).post_comments()
}

function post_claps(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).post_claps()
}

function post_comment_claps(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).post_comment_claps()
}

function questions(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).questions()
}

function question_comments(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).question_comments()
}

function question_claps(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).question_claps()
}

function question_comment_claps(parent, args, context) {
    return context.prisma.user.findOne({ 
        where: {
            id: parent.id
        },
    }).question_comment_claps()
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
    post_claps,
    post_comments,
    post_comment_claps,
    questions,
    question_claps,
    question_comments,
    question_comment_claps,
    followers,
    following
}
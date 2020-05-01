function author(parent, args, context) {
    return context.prisma.question.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function question_comments(parent, args, context) {
    return context.prisma.question.findOne({ 
        where: {
            id: parent.id
        },
    }).question_comments()
}

function question_claps(parent, args, context) {
    return context.prisma.question.findOne({ 
        where: {
            id: parent.id
        },
    }).question_claps()
}

function question_tags(parent, args, context) {
    return context.prisma.question.findOne({ 
        where: {
            id: parent.id
        },
    }).question_tags()
}

module.exports = {
    author,
    question_comments,
    question_claps,
    question_tags
}
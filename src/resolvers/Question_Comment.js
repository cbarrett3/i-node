function author(parent, args, context) {
    return context.prisma.question_Comment.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function question(parent, args, context) {
    return context.prisma.question_Comment.findOne({
        where: {
            id: parent.id
        },
    }).question()
}

function question_comment_claps(parent, args, context) {
    return context.prisma.question_Comment.findOne({
        where: {
            id: parent.id
        },
    }).question_comment_claps()
}

module.exports = {
    author,
    question,
    question_comment_claps
}
function author(parent, args, context) {
    return context.prisma.question_Comment_Clap.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function question_comment(parent, args, context) {
    return context.prisma.question_Comment_Clap.findOne({
        where: {
            id: parent.id
        },
    }).question_comment()
}

module.exports = {
    author,
    question_comment
}
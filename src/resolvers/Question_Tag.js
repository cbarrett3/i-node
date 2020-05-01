function question(parent, args, context) {
    return context.prisma.question_Tag.findOne({ 
        where: {
            id: parent.id
        },
    }).question()
}

function tag(parent, args, context) {
    return context.prisma.question_Tag.findOne({ 
        where: {
            id: parent.id
        },
    }).tag()
}

module.exports = {
    question,
    tag
}
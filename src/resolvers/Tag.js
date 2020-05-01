function post_tags(parent, args, context) {
    return context.prisma.tag.findOne({ 
        where: {
            id: parent.id
        },
    }).post_tags()
}

function question_tags(parent, args, context) {
    return context.prisma.tag.findOne({ 
        where: {
            id: parent.id
        },
    }).question_tags()
}

module.exports = {
    post_tags,
    question_tags
}
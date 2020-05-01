function author(parent, args, context) {
    console.log(parent)
    return context.prisma.question_Clap.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function question(parent, args, context) {
    console.log(parent)
    return context.prisma.question_Clap.findOne({
        where: {
            id: parent.id
        },
    }).question()
}

module.exports = {
    author,
    question
}
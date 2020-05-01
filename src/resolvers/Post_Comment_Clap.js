function author(parent, args, context) {
    return context.prisma.post_Comment_Clap.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function post_comment(parent, args, context) {
    return context.prisma.post_Comment_Clap.findOne({
        where: {
            id: parent.id
        },
    }).post_comment()
}

module.exports = {
    author,
    post_comment
}
function author(parent, args, context) {
    return context.prisma.post_Clap.findOne({ 
        where: {
            id: parent.id
        },
    }).author()
}

function post(parent, args, context) {
    return context.prisma.post_Clap.findOne({
        where: {
            id: parent.id
        },
    }).post()
}

module.exports = {
    author,
    post
}
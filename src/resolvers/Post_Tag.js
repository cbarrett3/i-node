function post(parent, args, context) {
    return context.prisma.post_Tag.findOne({ 
        where: {
            id: parent.id
        },
    }).post()
}

function tag(parent, args, context) {
    return context.prisma.post_Tag.findOne({ 
        where: {
            id: parent.id
        },
    }).tag()
}

module.exports = {
    post,
    tag
}
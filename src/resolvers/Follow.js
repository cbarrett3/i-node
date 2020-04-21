function followed(parent, args, context) {
    return context.prisma.follow.findOne({ 
        where: {
            id: parent.id
        },
    }).followed()
}

function following(parent, args, context) {
    return context.prisma.follow.findOne({ 
        where: {
            id: parent.id
        },
    }).following()
}

module.exports = {
    followed,
    following
}
function post_tags(parent, args, context) {
    return context.prisma.tag.findOne({ 
        where: {
            id: parent.id
        },
    }).post_tags()
}

module.exports = {
    post_tags
}
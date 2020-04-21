const { APP_SECRET, getUserId } = require('../utils')

function info () {
    return 'This is the API of indigo culture'
}

function feed(root, args, context, info) {
    return context.prisma.post.findMany()
}

function getUser(root, args, context) {
    return context.prisma.user.findOne({
        where: {
            id: parseInt(args.user_id),
        },
    })
}

function getPost(root, args, context) {
    return context.prisma.post.findOne({
        where: {
            id: parseInt(args.post_id),
        },
    })
}

function getComment(root, args, context) {
    return context.prisma.comment.findOne({
        where: {
            id: parseInt(args.comment_id),
        },
    })
}

function getPostClap(root, args, context) {
    return context.prisma.post_Clap.findOne({
        where: {
            id: parseInt(args.post_clap_id),
        },
    })
}

function getPostTag(root, args, context) {
    return context.prisma.post_Tag.findOne({
        where: {
            id: parseInt(args.post_tag_id),
        },
    })
}

function getTag(root, args, context) {
    return context.prisma.tag.findOne({
        where: {
            id: parseInt(args.tag_id),
        },
    })
}

function getFollowers(root, args, context) {
    const userId = getUserId(context)
    return context.prisma.user.findOne({
        where: {
            id: userId
        }
    }).followers()
}


module.exports = {
    info,
    feed,
    getUser,
    getPost,
    getComment,
    getPostClap,
    getPostTag,
    getTag,
    getFollowers
}
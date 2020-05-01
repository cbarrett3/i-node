const { APP_SECRET, getUserId } = require('../utils')

function info () {
    return 'This is the API of indigo culture'
}

async function postsFeed(root, args, context, info) {
    const where = args.filter ? {
        OR: [
          { content: { startsWith: args.filter }},
          { attatchment_url: { startsWith: args.filter }},
          { content: { endsWith: args.filter }},
          { attatchment_url: { endsWith: args.filter }}
         ],
         priv_post: false,
      } : { priv_post: false }

    const posts = await context.prisma.post.findMany({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: { created_at: 'desc' }
    })
    return posts
}

async function questionsFeed(root, args, context, info) {
    const where = args.filter ? {
        OR: [
          { content: { startsWith: args.filter }},
          { attatchment_url: { startsWith: args.filter }},
          { content: { endsWith: args.filter }},
          { attatchment_url: { endsWith: args.filter }}
         ],
         priv_question: false,
      } : { priv_question: false }

    const questions = await context.prisma.question.findMany({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: { created_at: 'desc' }
    })
    return questions
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

function getPostComment(root, args, context) {
    return context.prisma.post_Comment.findOne({
        where: {
            id: parseInt(args.post_comment_id),
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
            id: args.followed_user_id
        }
    }).followers()
}


module.exports = {
    info,
    postsFeed,
    questionsFeed,
    getUser,
    getPost,
    getPostComment,
    getPostClap,
    getPostTag,
    getTag,
    getFollowers
}
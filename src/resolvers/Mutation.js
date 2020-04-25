const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    const hashedPassword = await bcrypt.hash(args.password, 10)
    const {password, ...user} = await context.prisma.user.create({
        data: {
            ...args,
            password: hashedPassword,
            created_at: new Date()
        },
    })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user,
    }
}
    
async function login(parent, args, context, info) {
    const {password, ...user} = await context.prisma.user.findOne({
        where: {
            username: args.username
        }
    })
    if (!user) {
      throw new Error('No User found with that username')
    }
    const valid = await bcrypt.compare(args.password, password)
    if (!valid) {
      throw new Error('Invalid password')
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
}

function createPost(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.post.create({
        data: {
            content: args.content,
            attatchment_url: args.attatchment_url,
            author: { connect: { id: userId } },
            created_at: new Date(),
            priv_post: args.priv_post
        }
    })
}     

async function updatePost(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.post.update({
            where: {
                id: parseInt(args.post_id),
            },
            data: {
                content: args.content,
                attatchment_url: args.attatchment_url,
                priv_post: args.priv_post
            }
        })
    }
    else {
        throw new Error(`User is not allowed to edit this post: ${args.post_id}`)
    }
}

async function deletePost(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.post.delete({
            where: {
                id: parseInt(args.post_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this post: ${args.post_id}`)
    }
}

function createComment(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.comment.create({
        data: {
            content: args.content,
            author: { connect: { id: parseInt(userId) } },
            post: { connect: { id: parseInt(args.post_id) } },
            created_at: new Date()
        }
    })
}

async function updateComment(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.comment.update({
            where: {
                id: parseInt(args.comment_id),
            },
            data: {
                content: args.content
            }
        })
    }
    else {
        throw new Error(`User is not allowed to edit this comment: ${args.comment_id}`)
    }
}

async function deleteComment(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.comment.delete({
            where: {
                id: parseInt(args.comment_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this comment: ${args.comment_id}`)
    }
}

async function createPostClap(parent, args, context, info) {
    const userId = getUserId(context)
    const claps = await context.prisma.post.findOne({
        where: {
            id: args.post_id
        },
    }).claps()
    if(claps) {
        claps.forEach(function (clap) {
            if(clap.author_id == userId) {
                throw new Error(`Already clapped this post: ${args.post_id}`)
            }
        });
    }
    return context.prisma.post_Clap.create({
        data: {
            author: { connect: { id: userId } },
            post: { connect: { id: parseInt(args.post_id) } }
        }
    })
}

async function deletePostClap(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.post_Clap.delete({
            where: {
                id: parseInt(args.post_clap_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this Post Clap: ${args.post_clap_id}`)
    }
}

function createPostTag(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.post_Tag.create({
        data: {
            post: { connect: { id: parseInt(args.post_id) } },
            tag: { connect: { id: parseInt(args.tag_id) } }
        }
    })
}

function createTag(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.tag.create({
        data: {
            tag: args.tag
        }
    })
}

async function createFollow(parent, args, context, info) {
    const userId = getUserId(context)
    const following = await context.prisma.user.findOne({
        where: {
            id: userId
        },
    }).following()
    if(following) {
        following.forEach(function (follow) {
            if(follow.followed_user_id == args.followed_user_id) {
                throw new Error(`Already following this user: ${args.followed_user_id}`)
            }
        });
    }
    return context.prisma.follow.create({
        data: {
            following: { connect: { id: userId } },
            followed: { connect: { id: parseInt(args.followed_user_id) } },
            created_at: new Date()
        }
    })
}

function deleteFollow(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.follow.delete({
        where: {
            following_user_id: userId,
            followed_user_id: parseInt(args.followed_user_id),
        }
    })
}

module.exports = {
    signup,
    login,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    createPostClap,
    deletePostClap,
    createPostTag,
    createTag,
    createFollow,
    deleteFollow
}
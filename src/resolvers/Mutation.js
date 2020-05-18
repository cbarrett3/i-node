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

function createPostComment(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.post_Comment.create({
        data: {
            content: args.content,
            author: { connect: { id: userId } },
            post: { connect: { id: parseInt(args.post_id) } },
            created_at: new Date()
        }
    })
}

async function updatePostComment(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.post_Comment.update({
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

async function deletePostComment(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.post_Comment.delete({
            where: {
                id: parseInt(args.comment_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this comment: ${args.comment_id}`)
    }
}

async function createPostCommentClap(parent, args, context, info) {
    const userId = getUserId(context)
    const post_comment_claps = await context.prisma.post_Comment.findOne({
        where: {
            id: args.post_comment_id
        },
    }).post_comment_claps()
    if(post_comment_claps) {
        post_comment_claps.forEach(function (clap) {
            if(clap.author_id == userId) {
                throw new Error(`Already clapped this post comment: ${args.post_comment_id}`)
            }
        });
    }
    return context.prisma.post_Comment_Clap.create({
        data: {
            author:       { connect: { id: userId } },
            post_comment: { connect: { id: parseInt(args.post_comment_id) } }
        }
    })
}
async function deletePostCommentClap(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.post_Comment_Clap.delete({
            where: {
                id: parseInt(args.post_comment_clap_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this Post Comment Clap: ${args.post_comment_clap_id}`)
    }
}

async function createPostClap(parent, args, context, info) {
    const userId = getUserId(context)
    const post_claps = await context.prisma.post.findOne({
        where: {
            id: args.post_id
        },
    }).post_claps()
    if(post_claps) {
        post_claps.forEach(function (clap) {
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

function createQuestion(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.question.create({
        data: {
            content: args.content,
            response: args.response,
            attatchment_url: args.attatchment_url,
            author: { connect: { id: userId } },
            created_at: new Date(),
            priv_question: args.priv_question
        }
    })
}     

async function updateQuestion(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.question.update({
            where: {
                id: parseInt(args.question_id),
            },
            data: {
                content: args.content,
                response: args.response,
                attatchment_url: args.attatchment_url,
                priv_post: args.priv_post
            }
        })
    }
    else {
        throw new Error(`User is not allowed to edit this question: ${args.question_id}`)
    }
}

async function deleteQuestion(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.question.delete({
            where: {
                id: parseInt(args.question_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this question: ${args.question_id}`)
    }
}

function createQuestionComment(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.question_Comment.create({
        data: {
            content: args.content,
            author: { connect: { id: userId } },
            question: { connect: { id: parseInt(args.question_id) } },
            created_at: new Date()
        }
    })
}

async function updateQuestionComment(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.question_Comment.update({
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

async function deleteQuestionComment(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.question_Comment.delete({
            where: {
                id: parseInt(args.comment_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this comment: ${args.comment_id}`)
    }
}

async function createQuestionCommentClap(parent, args, context, info) {
    const userId = getUserId(context)
    const question_comment_claps = await context.prisma.question_Comment.findOne({
        where: {
            id: args.question_comment_id
        },
    }).question_comment_claps()
    if(question_comment_claps) {
        question_comment_claps.forEach(function (clap) {
            if(clap.author_id == userId) {
                throw new Error(`Already clapped this question comment: ${args.question_comment_id}`)
            }
        });
    }
    return context.prisma.question_Comment_Clap.create({
        data: {
            author:       { connect: { id: userId } },
            question_comment: { connect: { id: parseInt(args.question_comment_id) } }
        }
    })
}
async function deleteQuestionCommentClap(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.question_Comment_Clap.delete({
            where: {
                id: parseInt(args.question_comment_clap_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this question Comment Clap: ${args.question_comment_clap_id}`)
    }
}

async function createQuestionClap(parent, args, context, info) {
    const userId = getUserId(context)
    const question_claps = await context.prisma.question.findOne({
        where: {
            id: args.question_id
        },
    }).question_claps()
    if(question_claps) {
        question_claps.forEach(function (clap) {
            if(clap.author_id == userId) {
                throw new Error(`Already clapped this question: ${args.question_id}`)
            }
        });
    }
    return context.prisma.question_Clap.create({
        data: {
            author: { connect: { id: userId } },
            question: { connect: { id: parseInt(args.question_id) } }
        }
    })
}

async function deleteQuestionClap(parent, args, context, info) {
    const userId = getUserId(context)
    if(args.author_id == userId) {
        return context.prisma.question_Clap.delete({
            where: {
                id: parseInt(args.question_clap_id),
            }
        })
    }
    else {
        throw new Error(`User is not allowed to delete this question Clap: ${args.question_clap_id}`)
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

function createQuestionTag(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.question_Tag.create({
        data: {
            question: { connect: { id: parseInt(args.question_id) } },
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
    createPostComment,
    updatePostComment,
    deletePostComment,
    createPostCommentClap,
    deletePostCommentClap,
    createPostClap,
    deletePostClap,
    createPostTag,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    createQuestionComment,
    updateQuestionComment,
    deleteQuestionComment,
    createQuestionCommentClap,
    deleteQuestionCommentClap,
    createQuestionClap,
    deleteQuestionClap,
    createQuestionTag,
    createTag,
    createFollow,
    deleteFollow
}
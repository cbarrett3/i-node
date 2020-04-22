// function newPostSubscribe(parent, args, context, info) {
//     return context.prisma.$subscribe.post.create({ mutation_in: ['CREATED'] }).node()
//   }
  
//   const newPost = {
//     subscribe: newPostSubscribe,
//     resolve: payload => {
//       return payload
//     },
//   }
  
//   module.exports = {
//     newPost,
//   }
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  const blogLikes = blogs.map(blog => blog.likes)
  return blogLikes.length === 0
    ? 0
    : blogLikes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  const favoriteBlogLikesCount = Math.max.apply(null, blogs.map(blog => blog.likes))
  
  const favoriteBlog = blogs.find(blog => blog.likes === favoriteBlogLikesCount)
  delete favoriteBlog._id
  delete favoriteBlog.url
  delete favoriteBlog.__v

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const counts = {}
  authors.forEach(author => {
    author in counts ? counts[author] += 1 : counts[author] = 1
  })
  const count = Object.values(counts).reduce((a, b) => Math.max(a, b))
  const author = Object.keys(counts).reduce((r, key) => {
    return counts[key] === count ? key : r
  }, null)
  return {
    author: author,
    blogs: count
  }
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const likes = blogs.map(blog => blog.likes)
  const authorsLikes = _.zip(authors, likes)
  const counts = {}

  authorsLikes.forEach((authorLikes) => {
    authorLikes[0] in counts ? counts[authorLikes[0]] += authorLikes[1] : counts[authorLikes[0]] = authorLikes[1]
  })
  const count = Object.values(counts).reduce((a, b) => Math.max(a, b))
  const author = Object.keys(counts).reduce((r, key) => {
    return counts[key] === count ? key : r
  }, null)
  return {
    author: author,
    likes: count
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
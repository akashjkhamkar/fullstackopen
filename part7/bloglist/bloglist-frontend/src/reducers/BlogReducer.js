const reducer = (state = [], action) => {
  switch(action.type){
  case 'INIT':
    return action.data.blogs
  case 'NEW_BLOG':
    return state.concat(action.data.blog)
  case 'MODIFIED':{
    return state.map(blog => blog.id === action.data.modified.id ? action.data.modified : blog)
  }
  case 'DELETED':{
    return state.filter(blog => blog.id !== action.data.id)
  }
  default:
    return state
  }
}

export const actionBlogs = (blogs) => {
  return {
    type: 'INIT',
    data: {
      blogs
    }
  }
}

export const actionModifyBlogs = (modified) => {
  return {
    type: 'MODIFIED',
    data: {
      modified
    }
  }
}

export const actionDeletedBlog = (id) => {
  return {
    type: 'DELETED',
    data: {
      id
    }
  }
}

export const actionAdd = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: {
      blog
    }
  }
}

export default reducer
export default `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}
type Post {
  id: Int!
  title: String
  votes: Int
  author: Author
}
# the schema allows the following query:
type Query {
  posts: [Post]
  author(id: Int!): Author # author query must receive an id as argument
}
# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}
# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

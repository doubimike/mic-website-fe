type Post = {
  id:number,
  username:string,
  age:number
}
function Blog({ posts }:{posts:Post[]}) {
  return <ul>
      {posts.map((post:Post) => (
        <li key={post.id}>{post.username} {post.age} </li>
      ))}
    </ul>

}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  // const res = await fetch('http://139.198.19.145:39005/hello')
  const res = await fetch('http://139.198.19.145:39005/hello')
  const posts = await res.json()
  console.log('post',posts);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
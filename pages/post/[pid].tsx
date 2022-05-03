import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getPost } from '../../services/post'
import { baseUrl } from '../../utils/http'
const Post = ({post}:{post:{title:string,content:string}}) => {
    // const router = useRouter()
    // const { pid } = router.query
    // console.log('router.query', router.query);
    // useEffect(() => {
    //     pid && getPost({ id: pid as string }).then((res) => {
    //         // 获取数据成功后的其他操作
    //         //.....
    //         console.log('res', res);

    //     })
    // },[pid])



    return <p>Post: {post.title}{post.content}</p>
}


// This function gets called at build time
export async function getServerSideProps(context: { query: { pid: any } }) {
    console.log('context',context.query);
    // Call an external API endpoint to get posts
    const res = await fetch(baseUrl + `/post/detail?id=${context.query.pid}`,{method:'GET'})
    // const res = await getAllPosts()

    const { data: post } = await res.json()
    console.log('post', post);

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            post,
        },
    }
}

export default Post
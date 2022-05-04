import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { deletePost, updatePost } from '../../services/post'
import Router from 'next/router'
import { baseUrl } from '../../utils/http'
import RichText from '../../components/rich-text'
import { postParams } from '../../utils/type'

enum WriteState {
    EDIT,
    READ
}
const Post = ({ post }: { post: { title: string, content: string,authorId:string } }) => {
    const router = useRouter()
    const { pid } = router.query

    const [writeState, setWriteState] = useState(WriteState.READ)
    // console.log('router.query', router.query);
    // useEffect(() => {
    //     pid && getPost({ id: pid as string }).then((res) => {
    //         // 获取数据成功后的其他操作
    //         //.....
    //         console.log('res', res);

    //     })
    // },[pid])
    console.log('post', post);

    const deletePostFun = () => {
        deletePost({ id: pid as string }).then((res) => {

            console.log('res', res);
            Router.push('/posts')

        })
    }

    const editPostFun = () => {
        setWriteState(WriteState.EDIT)
    }

    const readPostFun = () => {
        setWriteState(WriteState.READ)
    }

    const onSubmit = (data: postParams) => {
        updatePost({ ...post, ...data }).then(res => {
            console.log(res);
            alert(res.message)
            window.location.reload()
            // setWriteState(WriteState.READ)

        })
    }

    const [showOperation,setOperation]  = useState(false)
    useEffect(()=>{
        setOperation(post.authorId === JSON.parse(window.localStorage.getItem('user')||'{}').id)
    },[])



    return <div className='container mx-auto mt-4'>

{showOperation && <button onClick={deletePostFun} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            删除
        </button> }
        

        {showOperation && writeState == WriteState.READ && <><button onClick={editPostFun} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            修改
        </button></>}

        { showOperation && writeState == WriteState.EDIT && <><button onClick={readPostFun} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            阅读
        </button> </>}
        {writeState == WriteState.READ && <><p>Post: {post.title}</p> <div dangerouslySetInnerHTML={{ __html: post.content }} /></>}

        { showOperation && writeState == WriteState.EDIT &&<RichText onSubmit={onSubmit} formDataOrigin={post} />}
    </div>
}


// This function gets called at build time
export async function getServerSideProps(context: { query: { pid: any } }) {
    console.log('context', context.query);
    // Call an external API endpoint to get posts
    const res = await fetch(baseUrl + `/post/detail?id=${context.query.pid}`, { method: 'GET' })
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

import Router from 'next/router'
import {createPost} from '../services/post'
import RichText  from '../components/rich-text';
import { postParams } from '../utils/type';


const Dashboard = () => {

  const onSubmit =(formData:postParams)=>{
    createPost(formData).then((res) => { 
      alert(JSON.stringify(res.message))      
      Router.push('/posts')
    })
  }
  return (
    <div className='container mx-auto px-4 pt-4 pb-4'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        写文章
      </button>

      <RichText onSubmit={onSubmit} />
    </div>
  )
}

export default Dashboard


import dynamic from 'next/dynamic';
import { useState } from 'react';
import {createPost} from '../services/post'

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Dashboard = () => {
  const [value, setValue] = useState('init');

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  const handleChange = (value: string) => {
    setFormData({...formData,content:value});
  }

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(formData)
    createPost({...formData,authorId:JSON.parse(window.localStorage.getItem('user')||'{}').id}).then((res) => { 
        console.log('res');        
      })
}

  return (
    <div className='container mx-auto px-4 pt-4 pb-4'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        写文章
      </button>

      <form>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">标题</label>
          <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">内容</label>


          <SunEditor onChange={handleChange} defaultValue={formData.content} />
        </div>
        <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">提交</button>
      </form>
    </div>
  )
}

export default Dashboard

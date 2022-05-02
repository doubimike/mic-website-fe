import React, { useState } from 'react'
import {register}  from '../services/user'


function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email:""
    })
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(formData)
        register(formData).then(res => { 
            // 获取数据成功后的其他操作
            //.....
            console.log(res)
          }).catch(e=>{
              console.log('e',e);
          })
    }
    return <div className="flex flex-col justify-center items-center mt-20">
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        邮箱
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        用户名
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        密码
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {/* <p className="text-red-500 text-xs italic">请填写密码</p> */}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                        注册
                    </button>
                </div>
            </form>
        </div>
    </div>

}



export default Register
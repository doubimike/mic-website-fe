import React, { useState } from 'react'
import Router from 'next/router'
import {login}  from '../services/user'
import jwt_decode from "jwt-decode";


function Login() {
    const [formData, setFormData] = useState({
        password: "",
        email:"",
    })
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(formData)
        login(formData).then((res) => { 
            // 获取数据成功后的其他操作
            //.....
            window.localStorage.setItem('jwt', res.data.token)
            window.localStorage.setItem('user', JSON.stringify(res.data.user))
            var decoded = jwt_decode(res.data.token);
            console.log('decoded',decoded);
            Router.push('/dashboard')
          })
    }
    return <div className="flex flex-col justify-center items-center mt-20">
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        邮箱
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        密码
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
                    {/* <p className="text-red-500 text-xs italic">请填写密码</p> */}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                        登录
                    </button>
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        忘记密码
                    </a> */}
                </div>
            </form>
        </div>
    </div>

}



export default Login
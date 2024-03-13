import React from 'react'

function LoginForm({onClose}) {
  return (
    <div>
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
            <div>
                <h1>로그인</h1>
            </div>
            <div>
                <div>Email: <input type="email" /></div>
                <div>Password: <input type="password" /></div>
            </div>
            <div>
                <button>회원가입</button>
                <button onClick={() => onClose}>취소</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
import React from 'react'

function RegisterForm({onClose}) {
  return (
    <div>
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
            <div>
                <h1>회원가입</h1>
            </div>
            <div>
                <div>Email: <input type="email" />&nbsp;<button>중복검사</button></div>
                <div>Password: <input type="password" />&nbsp;<button>일치검사</button></div>
                <div><input type="password" disabled /></div>
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

export default RegisterForm
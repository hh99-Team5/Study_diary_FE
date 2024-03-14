import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const Mypage = () => {
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");
    const [id, setId] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [isSamePw, setIsSamePw] = useState('false');
    const [checkText, setCheckText] = useState('');



    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
                    {
                        headers: {
                            'Authorization': `${jwtToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                setId(response.data.data.email);
                
            } catch (error) {
                console.error('Error fetching liked status:', error);
            }
        };
        fetchLikedStatus();
    }, [jwtToken]);

    const oncheckPw = async () => {
        if (newPassword1 !== newPassword2) {
            setCheckText('비밀번호가 일치하지 않습니다');
            return;
        } else {
            setCheckText('비밀번호가 일치합니다.');
            setIsSamePw(true)
        }
    }


    const handleChangePassword = async () => {
        
        

        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
                { password: newPassword1 },
                { headers: { Authorization: `${jwtToken}` } }
            );
            window.alert('비밀번호가 정상적으로 변경되었습니다.');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };


    return (
        <div>
            <span>아이디:</span>{id}
            <div>
                <label>새 비밀번호:</label>
                <input
                    type="password"
                    value={newPassword1}
                    onChange={(e) => setNewPassword1(e.target.value)}
                />{newPassword1}
                <button onClick={() => oncheckPw()}>일치검사</button>
            </div>
            
            <p>{checkText}</p>
            <div>
                <input
                    type="password"
                    value={newPassword2}
                    onChange={(e) => setNewPassword2(e.target.value)}
                />{newPassword2}
            </div>
            <button onClick={handleChangePassword}>저장하기</button>
        </div>
    )




}
export default Mypage;
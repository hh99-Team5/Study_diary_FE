import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import Cookies from 'universal-cookie';
import { useSwitch, useInput } from '../../hooks/userHooks';
import { diaryUpdateMode } from './UpdateDiary';
import Comment from './Comments';
import {
    TextAreaContainer,
    MainContainer,
    FooterAreaContainer,
    ContentContainer,
    Title,
    TextHeader,
    ButtonArea,
    Button,
    IconArea,
    IconContainer,
    IconText,
    StyledTextarea
} from './styles'
import AlertModal from '../../components/modals/AlertModal';


const Diary = () => {
    // 남윤하 코드
    const { state: diaryMode, handleState: diaryModeHandler } = useSwitch();
    const { value: diaryContent, handler: diaryContentHandler, ref: diaryContentRef } = useInput();
    const navigate = useNavigate();
    // 

    const { id } = useParams();
    const queryClient = useQueryClient();
    const [liked, setLiked] = useState(false);
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const { isLoading, isError, data: diary } = useQuery(
        ["diary", id],
        async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`);
            return response.data.data;
        },
    );

    // const handleDeleteDiary = async (diaryId) => {
    //     await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${diaryId}`, {
    //         headers: {
    //             Authorization: `${jwtToken}`
    //         }
    //     });
    //     // 쿼리 캐시에서 데이터 삭제
    //     queryClient.invalidateQueries(["diary", diaryId]);
    // }

    //좋아요 여부확인
    const fetchLikedStatus = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}/likes`,
                {
                    headers: {
                        Authorization: `${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('like?', response.data.data.isChecked);
            setLiked(response.data.data.isChecked);
        } catch (error) {
            console.error('Error fetching liked status:', error);
        }
    };

    //좋아요 토글
    const handleToggleLike = async () => {
        const loginUser = await diaryUpdateMode(userToken);
        if (!loginUser || !loginUser.email) {
            alert('로그인된 사용자 정보를 가져올 수 없습니다.');
            return;
        }

        setLiked(!liked);
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}/likes`, null,
                { headers: { Authorization: `${jwtToken}` } }
            );
            // 쿼리 캐시에서 데이터 다시 불러오기
            queryClient.invalidateQueries(["diary", id]);
            fetchLikedStatus(); // 좋아요 상태를 다시 가져옴
        } catch (error) {
            console.error('Error toggling like:', error);
            setLiked(!liked);
        }
    }
    useEffect(() => {
        fetchLikedStatus();
    }, [fetchLikedStatus, jwtToken, id]);

    // 남윤하 코드
    // 작성한 유저 체크
    let newDiary = diary ? { title: diary.title, contents: diaryContent } : null;

    const token = cookie.get('jwtToken');
    const userToken = token ? token.replace("Bearer ", "") : null;

    // 남윤하 코드
    const diaryUpdateMutation = useMutation(
        async (newData) => {
            try {
                console.log("newData = ", newData);
                const updateDiary = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`,
                    newData, { headers: { 'Authorization': `Bearer ${userToken}` } });
                console.log("updateDiary = ", updateDiary);
            } catch (error) {
                console.log("updateDiary error =", error);
            }
        }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["diary", id]);
            setModalMessage("수정에 성공했습니다!");
            setShowSuccessModal(true);
            diaryModeHandler()
        },
        onError: () => {
            setModalMessage("수정에 실패 했습니다.");
            setShowErrorModal(true);
        }
    })

    const diaryDeleteMutation = useMutation(
        async (id) => {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`, {
                headers: {
                    Authorization: `${jwtToken}`
                }
            })
        }, {
        onSuccess: () => {
            queryClient.invalidateQueries("diaries");
            setModalMessage("삭제 성공!");
            setShowSuccessDeleteModal(true);
        },
        onError: () => {
            setModalMessage("삭제 실패");
            setShowErrorModal(true);
        }
    }
    )

    const diaryChangeBtn = async () => {
        const loginUser = await diaryUpdateMode(userToken);
        if (!loginUser || !loginUser.email) {
            setModalMessage("로그인된 사용자 정보를 가져올 수 없습니다.");
            setShowErrorModal(true);
            return;
        }

        if (loginUser.email !== diary.writer) {
            setModalMessage("자신이 작성한 글만 수정 가능합니다.");
            setShowErrorModal(true);
            return;
        }
        diaryModeHandler();
    }

    const diaryUpdateBtn = async (mode) => {
        const loginUser = await diaryUpdateMode(userToken);
        if (!loginUser || !loginUser.email) {
            setModalMessage("로그인된 사용자 정보를 가져올 수 없습니다.");
            setShowErrorModal(true);
            return;
        }

        if (loginUser.email !== diary.writer) {
            setModalMessage("자신이 작성한 글만 삭제 가능합니다.");
            setShowErrorModal(true);
            return;
        }
        if (mode === "수정") {
            diaryUpdateMutation.mutate(newDiary);
        }
        if (mode === "삭제") {
            diaryDeleteMutation.mutate(id);
        }
    }

    const closeModal = () => {
        setShowErrorModal(false);
        setShowSuccessModal(false);
        setShowSuccessDeleteModal(false);
    };

    const handleSuccessModalClose = () => {
        setShowSuccessDeleteModal(false);
        navigate("/diaryList");
    };

    const LikeIcon = liked ? IoHeartSharp : IoHeartOutline;

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching diary</div>;

    return (
        <MainContainer>
            <TextAreaContainer>
                <Title>{diary.title}</Title>
                <TextHeader>
                    <span>{diary.writer}</span>
                    {!diaryMode ?
                        <ButtonArea>
                            <Button border onClick={() => diaryChangeBtn()}>수정</Button>
                            <Button border onClick={() => diaryUpdateBtn("삭제")}>삭제</Button>
                        </ButtonArea>
                        :
                        <ButtonArea>
                            <Button border onClick={() => diaryUpdateBtn("수정")}>저장</Button>
                            <Button border onClick={() => diaryModeHandler()}>취소</Button>
                        </ButtonArea>
                    }
                </TextHeader>

                {!diaryMode ?
                    <ContentContainer>
                        {diary.contents}
                    </ContentContainer>
                    :
                    <ContentContainer>
                        <StyledTextarea
                            cols="30" rows="10" onChange={diaryContentHandler} value={diaryContent} >
                        </StyledTextarea>
                    </ContentContainer>
                }
            </TextAreaContainer>
            {!diaryMode ?
                <FooterAreaContainer>
                    <IconContainer>
                        <IconArea>
                            <LikeIcon onClick={handleToggleLike} />
                            <IconText>좋아요 {diary.like}</IconText>
                        </IconArea>
                        <IconArea>
                            <GoComment />
                            <IconText>댓글 </IconText>
                        </IconArea>
                    </IconContainer>
                    <Comment />
                </FooterAreaContainer>
                :
                <div></div>}

            {showSuccessModal && <AlertModal onClose={closeModal} message={modalMessage} />}
            {showErrorModal && <AlertModal onClose={closeModal} message={modalMessage} />}
            {showSuccessDeleteModal && <AlertModal onClose={handleSuccessModalClose} message={modalMessage} />}
        </MainContainer>
    );

}

export default Diary;
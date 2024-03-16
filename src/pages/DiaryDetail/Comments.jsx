import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';
import { diaryUpdateMode } from './UpdateDiary';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {
    CommentContainer,
    Button,
    ButtonArea,
    CommentHeader,
    CommentHeaderRight,
    MiddleText,
    CommentText,
    StyledTextarea,
    ScrollableContainer
} from './styles'

const Comment = () => {
    const queryClient = useQueryClient();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [updateComment, setUpdateComment] = useState('');
    const [editableCommentId, setEditableCommentId] = useState(null);
    const [loginUser, setLoginUser] = useState(null);

    // D.Detail-components 코드에도 동일하게 포함된 부분
    const { id } = useParams();
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");

    // 로그인 유저 확인 코드
    const fetchLoginUser = async () => {
        const token = cookie.get('jwtToken');
        const userToken = token ? token.replace("Bearer ", "") : '';
        if (userToken) {
            const user = await diaryUpdateMode(userToken);
            return user;
        }
        return null;
    };

    useEffect(() => {
        fetchLoginUser().then(user => {
            if (user) {
                setLoginUser(user);
            }
        });
    }, []);

    // 댓글 데이터 처리
    const { isLoading, isError } = useQuery(
        ['comment', id],
        async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}/comments`,
                {
                    headers: {
                        Authorization: `${jwtToken}`,
                    },
                });
            return response.data.data;
        },
        {
            onSuccess: (data) => {
                setComments(data);
            },
        }
    );

    // 댓글 작성 핸들
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!loginUser) {
            alert('댓글을 작성하려면 먼저 로그인해야 합니다.');
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}/comments`,
                { contents: newComment },
                {
                    headers: {
                        Authorization: `${jwtToken}`,
                    },
                }
            );
            setComments(prevComments => [...prevComments, response.data]);
            setNewComment('');
            queryClient.invalidateQueries(['comment', id]);
            console.log('댓글이 성공적으로 생성되었습니다:', response.data);
        } catch (error) {
            console.error('댓글 생성 실패:', error.response.data.message);
        }
    };

    // 댓글 수정 핸들
    const handleUpdateComment = async (e, commentId) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/comments/${commentId}`,
                { contents: updateComment },
                {
                    headers: {
                        Authorization: `${jwtToken}`,
                    },
                }
            );
            const updatedComment = response.data;
            setComments(prevComments => prevComments.map(comment => {
                if (comment.id === updatedComment.id) {
                    return updatedComment;
                }
                return comment;
            }));
            console.log('댓글이 성공적으로 수정되었습니다:', updatedComment);
            queryClient.invalidateQueries(['comment', id]);
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        } finally {
            setUpdateComment('');
            setEditableCommentId(null);
        }
    };

    // 댓글 삭제 핸들
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/comments/${commentId}`,
                {
                    headers: {
                        Authorization: `${jwtToken}`,
                    },
                }
            );
            // 삭제 후 댓글 목록 다시 불러오기
            queryClient.invalidateQueries(['comment', id]);
            console.log('댓글이 성공적으로 삭제되었습니다:', commentId);
        } catch (error) {
            console.error('댓글 삭제 실패:', error.response.data.message);
        }
    };

    return (
        <div>
            {/* 댓글 목록 map 함수 */}
            {isLoading && <div>Loading comments...</div>}
            {isError && <div>Error fetching comments</div>}
            <ScrollableContainer>
                {comments ? comments.map((comment) => (
                    <div key={comment.id}>
                        {editableCommentId === comment.id ? (
                            <form onSubmit={(e) => handleUpdateComment(e, comment.id)}>
                                <StyledTextarea border
                                    value={updateComment}
                                    onChange={(e) => setUpdateComment(e.target.value)}
                                    rows="4"
                                    cols="50"
                                    placeholder="댓글을 입력하세요"
                                ></StyledTextarea>
                                <ButtonArea>
                                    <Button type="submit">완료</Button>
                                </ButtonArea>
                            </form>
                        ) : (
                            <div key={comment.id}>
                                <CommentHeader>
                                    <span>{comment.writer}</span>
                                    <CommentHeaderRight>
                                        <MiddleText>{comment.createdAt}</MiddleText>
                                        {loginUser && comment.writer === loginUser.email && (
                                            <ButtonArea>
                                                <Button onClick={() => setEditableCommentId(comment.id)}>수정</Button>
                                                <Button onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
                                            </ButtonArea>
                                        )}
                                    </CommentHeaderRight>
                                </CommentHeader>
                                <CommentText>{comment.contents}</CommentText>
                            </div>
                        )}
                    </div>
                )) : null}
            </ScrollableContainer>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleSubmitComment}>
                <StyledTextarea border
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                    cols="50"
                    placeholder="댓글을 입력하세요"
                ></StyledTextarea>
                <ButtonArea>
                    <Button border type="submit">등록</Button>
                </ButtonArea>
            </form>
        </div>
    );
};

export default Comment
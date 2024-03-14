
// 빈칸 체크
export const blankInvalidation = (title, titleRef, contents, contentRef) => {
    if(!title){
        alert("제목을 입력 해주세요");
        titleRef.current.focus();
        return false
    }
        if(!contents){
        alert("내용을 입력 해주세요");
        contentRef.current.focus();
        return false
    }
}

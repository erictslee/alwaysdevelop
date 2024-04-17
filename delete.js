
// 모달을 여는 함수
function openModal(a) { 
    document.getElementById(a).style.display = 'block';
}
// 모달을 닫는 함수
function closeModal(a) {
    document.getElementById(a).style.display = 'none';
}

// 비밀번호를 확인
function CheckPW(){
    const pw = document.getElementById('pw').value;
    if(pw =="1234"){ // 임의로 1234로 지정 : firebase에서  uid로 비밀번호만 뽑아오기
        openModal('modal');
    }
    else{ // error 모달 띄우기
        openModal('errormodal');
    }
    document.getElementById('pw').value = ''; // 비밀번호 초기화
    // 해당 창 닫기
    closeModal('enterpw');
}

function confirmDelete() {
    console.log('firebase 지우는 함수')
    closeModal('modal');
}

function cancle(){
    console.log('작업이 취소되었습니다')
}

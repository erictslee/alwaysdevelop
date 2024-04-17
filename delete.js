// 모달 on off
function eventModal(a){
    $('#'+a).toggle();
}

// 비밀번호를 확인
function CheckPW(){
    const pw = document.getElementById('pw').value;
    if(pw =="1234"){ // 임의로 1234로 지정 : firebase에서  uid로 비밀번호만 뽑아오기
        eventModal('modal');
    }
    else{ // error 모달 띄우기
        eventModal('errormodal');
    }
    document.getElementById('pw').value = ''; // 비밀번호 초기화
    // 해당 창 닫기
    eventModal('enterpw');
}

function confirmDelete() {
    console.log('firebase 지우는 함수')
    eventModal('modal');
}

function cancle(){
    console.log('작업이 취소되었습니다')
}

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyCqdkXys7GDPwhC_iiqe5cJCup7B93VWos",
  authDomain: "codilng.firebaseapp.com",
  databaseURL: "https://codilng-default-rtdb.firebaseio.com",
  projectId: "codilng",
  storageBucket: "codilng.appspot.com",
  messagingSenderId: "315680026053",
  appId: "1:315680026053:web:15dbcd2d836974fcedefac",
  measurementId: "G-SM7RGGDWLF",
};
// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Save a New Task in Firestore
 * @param {string} image
 * @param {string} name
 * @param {string} mbti
 * @param {string} blog
 * @param {string} desc
 * @param {string} timestamp
 */

const createForm = document.getElementById("createForm");

const saveUser = (id, image, name, mbti, blog, desc, timestamp) =>
  addDoc(collection(db, "alwaysdevelop"), {
    id,
    image,
    name,
    mbti,
    blog,
    desc,
    timestamp,
  });

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const id = querySnapshot.docs.length;
    const image = $("#image").val(); //이미지 도출.
    const name = $("#name").val(); //이름 도출.
    const mbti = $("#mbti").val(); //MBTI 도출.
    const blog = $("#blog").val(); //블로그 도출.
    const desc = $("#desc").val(); //본인 설명 도출
    const timestamp = new Date();

    createForm["postingbtn"].innerText = "save";
    /*등록 완료 후 메인페이로 이동*/
    await saveUser(
      id || null,
      image || null,
      name || null,
      mbti || null,
      blog || null,
      desc || null,
      timestamp || null
    );
    alert("저장 완료");
    createModal.style.display = "none";
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
});

const querySnapshot = await getDocs(collection(db, "alwaysdevelop"));

const card = querySnapshot.docs.map((doc) => doc.data());
const userId = querySnapshot.docs.map((doc) => doc.id);
card.map((e, i) => {
  e.userId = userId[i];
});
const totalcard = card.sort((a, b) => Number(a.id) - Number(b.id));
card.map((e) => {
  let temp_html = ` 
  <div class="card" id="usercard_${e.userId}">
  <img
      src=${e.image}>
  <div class="card_detail">
      <p>${e.name}</p>
      <p>${e.mbti}</p>
      <p>${e.blog}</p>
      <p>${e.desc}</p>
  </div>
  <div class="button_wrapper">
  <button id="update" name="e" class="update" data-bs-target="#passwordCheckModal"
  data-bs-toggle="modal"  data-bs-dismiss="modal">수정하기</button>
<button id="remove" class="remove" data-bs-target="#passwordCheckModal"
  data-bs-toggle="modal" data-bs-dismiss="modal">삭제하기</button>
  </div>
</div>`;
  $("#card").append(temp_html);
});

let mode = "";
const no = [];

const updates = document.querySelectorAll(".update");
updates.forEach((update) => {
  update.addEventListener("click", function (e) {
    no.push("e");
  });
});
const removes = document.querySelectorAll(".remove");
removes.forEach((remove) => {
  remove.addEventListener("click", function (e) {
    console.log(1);
    no.push("r");
  });
});
console.log(no);
// // 수정하기 버튼클릭시
// $("#update").click(async function () {
//   // 비밀번호를 확인하는 모달 열기
//   console.log(11111);
//   $("#passwordModal").modal("show");

//   return (mode = "e");
// });

// $("#remove").click(async function () {
//   mode = "r";
//   $("#passwordModal").modal("show");
// });

// 모달에서
$("#checkPasswordBtn").click(async function () {
  // 사용자가 적은 비밀번호
  let inputPassword = $("#passwordCheck").val();
  // user정보에서 얻은 password
  // let userData = $("#modifyModal").data("userData");
  // 입력된 비밀번호와 저장된 비밀번호 비교
  let name = false;
  let userData;
  let confirm;
  totalcard.map((e) => {
    if (e.name === inputPassword) {
      name = true;
      userData = e;
      confirm = e.name;
    }
  });
  console.log(inputPassword === confirm, mode);
  if (inputPassword == confirm) {
    if (no[0] == "e") {
      // 비밀번호가 일치하면 수정을 위한 모달로 이동
      $("#passwordCheckModal").modal("hide"); // 비밀번호 확인 모달 닫기
      console.log("수정시작");
      $("#modifyModal").modal("show"); // 수정 모달 열기
      // 수정 모달에 기존 정보 채우기
      $("#modifyModal").data("userData", userData);
      $("#modifyImage").attr("src", userData.image);
      $("#modifyImageUrl").val(userData.image);
      $("#modifyName").val(userData.name);
      $("#modifyMbti").val(userData.mbti);
      $("#modifyBlog").val(userData.blog);
      $("#modifyDesc").val(userData.desc);
    } else if (no[0] == "r") {
      console.log("삭제시작");
      console.log(userData);
      $("#passwordCheckModal").modal("hide"); // 비밀번호 확인 모달 닫기

      $("#deleteModal").modal("show"); // 삭제 모달 열기
      // 삭제 모달에 기존 정보 채우기
      $("#deleteModal").data("userData", userData);
    }
  } else {
    // 비밀번호가 일치하지 않으면 경고 알림 표시
    alert("비밀번호가 일치하지 않습니다.");
  }
});

// 수정하기 버튼클릭시
$("#modifyMember").click(async function (e) {
  e.preventDefault();
  mode = "e";
  let modifyData = $("#modifyModal").data("userData");
  console.log("modifyData", modifyData);

  let newData = {
    id: modifyData.id,
    image: $("#modifyImageUrl").val(),
    name: $("#modifyName").val(),
    mbti: $("#modifyMbti").val(),
    blog: $("#modifyBlog").val(),
    desc: $("#modifyDesc").val(),
  };

  console.log(modifyData.userId);
  console.log("newData", newData);
  // 수정된 정보를 파이어베이스에 업데이트

  await setDoc(doc(db, "alwaysdevelop", modifyData.userId), newData);
  alert("수정완료!");
  window.location.reload();
});

// 삭제하기 버튼클릭시
$("#deleteMember").click(async function (e) {
  e.preventDefault();

  console.log("삭제상태");

  let deleteData = $("#deleteModal").data("userData");
  mode = "r";
  console.log(12312312);

  console.log(deleteData.userId);
  // 삭제된 정보를 파이어베이스에 업데이트
  await deleteDoc(doc(db, "alwaysdevelop", deleteData.userId));
  alert("삭제완료!");
  window.location.reload();
});

//CRUD에서 C를 지원하는 모달 컨트롤
export const createModal = document.querySelector(".createModal");
export const createModalBtn = document.querySelector(".createModal_btn");
export const closeCModalBtn = document.querySelector(".closeCModal_btn");
//모달띄우기
createModalBtn.addEventListener("click", function (e) {
  e.preventDefault();
  createModal.style.display = "flex";
});
//모달내리기
closeCModalBtn.addEventListener("click", function (e) {
  e.preventDefault();
  createModal.style.display = "none";
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    createModal.style.display = "none";
  }
});

$("#savebtn").click(async function () {
  $("#postingbox").toggle();
  createModal.style.display = "none";
});

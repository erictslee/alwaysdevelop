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

//CRUD에서 U를 지원하는 모달 컨트롤
// const confirmModal = document.querySelector(".modifybtn");
// console.log(confirmModal);
// const confirmModalBtn = document.querySelector(".openConfirm_btn");
// const closeConfirmMBtn = document.querySelector(".closeConfirm_btn");
// confirmModalBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   confirmModal.style.display = "flex";
// });
// //모달내리기
// closeConfirmMBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   confirmModal.style.display = "none";
// });

//CRUD에서 D를 지원하는 모달 컨트롤

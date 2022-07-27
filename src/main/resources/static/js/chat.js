// 로그인 대신 임시 인증
let username = prompt("아이디를 입력하세요");
let roomNum = prompt("채팅방 번호를 입력하세요");

document.querySelector("#username").innerHTML = username;
document.querySelector("#roomNum").innerHTML = roomNum;

// SSE 연결하기
const eventSource = new EventSource(
  `http://localhost:8080/chat/roomNum/${roomNum}`
);
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.sender == username) {
    // 내가 보낸 메세지 => 오른쪽 파란 박스
    initMyMessage(data);
  } else {
    // 나머지 다 왼쪽 회색 박스
    initYourMessage(data);
  }
};

// 파란 박스 만들기
function getSendMsgBox(data) {
  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11, 16);
  let convertTime = (tm.length == 2 ? tm : "0" + tm) + " | " + md;

  return `
  <div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertTime} / <b>${data.sender}</b></span>
  </div>`;
}

// 회색 박스 만들기
function getReceiveMsgBox(data) {
  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11, 16);
  let convertTime = (tm.length == 2 ? tm : "0" + tm) + " | " + md;

  return `
  <div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertTime} / <b>${data.sender}</b></span>
  </div>`;
}

// addMessage() 함수 호출시 DB에 insert되고 그 데이터가 자동으로 흘러들어온다(SSE)
// 파란 박스 초기화
function initMyMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let sendBox = document.createElement("div");
  sendBox.className = "outgoing_msg";

  sendBox.innerHTML = getSendMsgBox(data);
  chatBox.append(sendBox);

  document.documentElement.scrollTop = document.body.scrollHeight;
}

// 회색 박스 초기화
function initYourMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let receivedBox = document.createElement("div");
  receivedBox.className = "received_msg";

  receivedBox.innerHTML = getReceiveMsgBox(data);
  chatBox.append(receivedBox);

  document.documentElement.scrollTop = document.body.scrollHeight;
}

// 디비에 인서트만 해줌
// AJAX 채팅 메세지 전송
async function addMessage() {
  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chat = {
    sender: username,
    roomNum: roomNum,
    msg: msgInput.value,
  };
  await fetch("http://localhost:8080/chat", {
    method: "post", // http post 메소드 (새로운 데이터를 write할 때 사용하는 약속)
    body: JSON.stringify(chat),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  msgInput.value = "";
}

// 버튼 클릭 메세지 전송
document.querySelector("#chat-send").addEventListener("click", () => {
  addMessage();
});

// 엔터 입력시 메세지 전송
document
  .querySelector("#chat-outgoing-msg")
  .addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      addMessage();
    }
  });

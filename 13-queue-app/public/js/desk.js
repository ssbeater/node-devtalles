const deskHeader = document.querySelector("h1");
const lblPending = document.querySelector("#lbl-pending");
const lblAlert = document.querySelector("#lbl-alert");
const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");
const lblCurrentTicket = document.querySelector("small");

btnDone.disabled = true;

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
  window.location = "index.html";
  throw new Error("Desk is required");
}

const desk = searchParams.get("desk");
deskHeader.innerText = desk;
let workingTicket = null;

function checkTicketCount(initialCount = 0) {
  if (initialCount === 0) lblAlert.classList.remove("d-none");
  else lblAlert.classList.add("d-none");

  lblPending.innerText = initialCount;
}

async function loadInitialCount() {
  const pendings = await fetch("api/tickets/pending").then((res) => res.json());
  checkTicketCount(pendings.length);
}

async function getTicket() {
  await finishTicket();

  const { status, ticket, message } = await fetch(
    `api/tickets/draw/${desk}`
  ).then((res) => res.json());

  if (status === "error") {
    lblCurrentTicket.innerText = message;
    return;
  }

  workingTicket = ticket;
  lblCurrentTicket.innerText = `Ticket ${ticket.number}`;
  btnDone.disabled = false;
}

async function finishTicket() {
  if (!workingTicket) return;

  const { status, message } = await fetch(
    `api/tickets/done/${workingTicket.number}`,
    { method: "PUT" }
  );

  if (status === "error") {
    lblCurrentTicket.innerText = message;
    return;
  }

  workingTicket = null;
  lblCurrentTicket.innerText = "...";
  btnDone.disabled = true;
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-ticket-count-changed") return;
    checkTicketCount(payload);
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

btnDraw.addEventListener("click", getTicket);
btnDone.addEventListener("click", finishTicket);

// Init
loadInitialCount();
connectToWebSockets();

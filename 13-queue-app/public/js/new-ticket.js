const lblNewTicket = document.querySelector("#lbl-new-ticket");
const createTicketBtn = document.querySelector("#create-ticket");

createTicketBtn.addEventListener("click", createTicket);

async function getLastTicket() {
  const last = await fetch("api/tickets/last").then(res => res.json());
  lblNewTicket.innerText = `Ticket ${last}`;
}

async function createTicket() {
  const newTicket = await fetch("api/tickets", { method: "POST" }).then(res => res.json());
  lblNewTicket.innerText = `Ticket ${newTicket.number}`;
}

getLastTicket();

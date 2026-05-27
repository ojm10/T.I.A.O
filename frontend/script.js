const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const themeBtn = document.getElementById("themeToggle");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const closeSidebar = document.getElementById("closeSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");


function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("open");
}

function closeSidebarMenu() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("open");
}

sidebarToggle?.addEventListener("click", openSidebar);
closeSidebar?.addEventListener("click", closeSidebarMenu);
sidebarOverlay?.addEventListener("click", closeSidebarMenu);


document.querySelectorAll(".chat-item").forEach(item => {
  item.addEventListener("click", closeSidebarMenu);
});


function addMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  const contentDiv = document.createElement("div");
  contentDiv.innerText = text;

  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);

  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 50);
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  messageInput.disabled = true;
  sendBtn.disabled = true;

  addMessage(text, "user");
  messageInput.value = "";

  try {

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mensagem: text,
        historico: []
      })
    });

    const data = await response.json();


    if (data.resposta) {
      addMessage(data.resposta, "ai");
    } else {
      addMessage("Erro: " + (data.erro || "Resposta inválida"), "ai");
    }

  } catch (error) {
    console.error("Erro na requisição:", error);
    addMessage("Ops! O servidor está desligado ou houve um erro de conexão.", "ai");
  } finally {

    messageInput.disabled = false;
    sendBtn.disabled = false;
    messageInput.focus();
  }
}


sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});


function setTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.textContent = isLight ? "☀️" : "🌙";
}


const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "light");


themeBtn.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  setTheme(isLight);
});


const newChatBtn = document.querySelector(".new-chat-btn");
newChatBtn?.addEventListener("click", () => {
  messagesContainer.innerHTML = "";
  messageInput.focus();
  closeSidebarMenu();
});


document.addEventListener("DOMContentLoaded", () => {
  messageInput.focus();
});
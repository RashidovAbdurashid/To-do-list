const elInput = document.querySelector("#input");
const elAdd = document.querySelector("#add");
const elList = document.querySelector(".list");
const modal = document.getElementById("modal");
const modalInput = document.getElementById("modalInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

elAdd.addEventListener("click", addTask);

function addTask() {
  if (elInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("list_li");

  const text = document.createElement("span");
  text.textContent = elInput.value;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";

  li.append(text, editBtn, deleteBtn);
  elList.appendChild(li);

  elInput.value = "";
  saveData();
}

elList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target === li) {
    li.classList.toggle("completed");
    saveData();
  }

  if (e.target.classList.contains("delete")) {
    li.remove();
    saveData();
  }

  if (e.target.classList.contains("edit")) {
    currentTask = li.querySelector("span");
    modalInput.value = currentTask.textContent;
    modal.style.display = "flex";
  }
});

saveEdit.addEventListener("click", () => {
  if (modalInput.value.trim() !== "") {
    currentTask.textContent = modalInput.value;
    saveData();
  }
  modal.style.display = "none";
});

cancelEdit.addEventListener("click", () => {
  modal.style.display = "none";
});

function saveData() {
  localStorage.setItem("data", elList.innerHTML);
}

function showData() {
  elList.innerHTML = localStorage.getItem("data") || "";
}


showData();
saveData();

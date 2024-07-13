const addItem = document.querySelector(".add-item");
const listItem = document.querySelector(".list-item");
const itemsContainer = document.getElementById("items-container");
const emptyItems = document.querySelector(".empty-items");
const modeToggle = document.getElementById("mode-toggle");
const warning = document.querySelector(".warning");

let lengthOfItems = 0;

//add an item
addItem.addEventListener("click", () => {
  const toDoItem = document.createElement("li");
  const toDoText = document.createElement("input");
  const toDoEdit = document.createElement("div");
  const toDoEditButton = document.createElement("button");
  const toDoEditClose = document.createElement("span");

  text = listItem.value.trim();

  if (text.length > 0) {
    toDoEdit.classList.add("to-do-edit-style");
    toDoItem.classList.add("to-do-text-style");

    toDoText.value = text;
    toDoEditClose.innerHTML = "&times;";
    toDoEditButton.innerHTML = "Edit";

    toDoText.setAttribute("readonly", "readonly");

    toDoItem.appendChild(toDoText);
    toDoItem.appendChild(toDoEdit);
    toDoEdit.appendChild(toDoEditButton);
    toDoEdit.appendChild(toDoEditClose);
    itemsContainer.appendChild(toDoItem);

    listItem.value = "";

    lengthOfItems++;
    emptyItems.style.display = lengthOfItems === 0 ? "flex" : "none";
    warning.style.display = "none";
  } else {
    warning.style.display = "flex";
  }

  //remove an item
  toDoEditClose.addEventListener("click", () => {
    toDoItem.remove();

    lengthOfItems--;
    emptyItems.style.display = lengthOfItems === 0 ? "flex" : "none";
  });

  //complete an item
  toDoText.addEventListener("click", () => {
    toDoText.classList.toggle("completed");
  });

  //edit an item
  toDoEditButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (toDoEditButton.textContent == "Edit") {
      toDoEditButton.textContent = "Save";
      toDoText.removeAttribute("readonly");
      toDoText.focus();
    } else {
      toDoEditButton.textContent = "Edit";
      toDoText.setAttribute("readonly", "readonly");
    }
  });
});

//change mode
modeToggle.addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
  listItem.classList.toggle("listItemDark", e.target.checked);
  emptyItems.classList.toggle("emptyItemsDark", e.target.checked);
});

//apply item using Enter Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem.click();
  }
});

//show random quote
const randomQuote = Math.floor(Math.random() * 16);
fetch("https://type.fit/api/quotes")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.getElementById(
      "quote-text"
    ).innerText = `Quote of the Day: "${data[randomQuote].text}"`;
  });
document.getElementById("quote-text").classList.add("quote-style");

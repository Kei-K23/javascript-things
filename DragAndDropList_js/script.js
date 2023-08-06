const dragAndDropContainer = document.querySelector(".dragAndDrop-container");

const USERS = [
  {
    name: "Monkey D.Luffy",
    profileImg: "./images/luffy.jpg",
  },
  {
    name: "Roronoa Zoro",
    profileImg: "./images/zoro.jpg",
  },
  {
    name: "Nami",
    profileImg: "./images/nami.jpg",
  },
  {
    name: "Usopp",
    profileImg: "./images/usopp.jpg",
  },
  {
    name: "Vinsmoke Sanji",
    profileImg: "./images/sanji.jpg",
  },
  {
    name: "Tony Tony Chopper",
    profileImg: "./images/chopper.jpg",
  },
];

// create list items
const createDraggableItems = (users, insertContainer) => {
  const fragment = document.createDocumentFragment();

  users.map((user) => {
    // li element
    const liEle = document.createElement("li");
    liEle.classList.add("item");
    liEle.setAttribute("draggable", "true");

    // div element
    const divEle = document.createElement("div");
    divEle.classList.add("profile");

    // img element
    const imgEle = document.createElement("img");
    imgEle.src = `${user.profileImg}`;
    imgEle.alt = `${user.name}`;
    imgEle.classList.add("img");
    imgEle.setAttribute("draggable", "true");

    // span element
    const spanEle = document.createElement("span");
    spanEle.classList.add("name");
    spanEle.innerText = `${user.name}`;

    //append img and span elements to div
    divEle.appendChild(imgEle);
    divEle.appendChild(spanEle);

    // i element
    const iEle = document.createElement("i");
    iEle.classList.add("fa-solid", "fa-bars", "icons");

    liEle.append(divEle, iEle);

    // add dragstart and dragend event to list items
    liEle.addEventListener("dragstart", () =>
      setTimeout(liEle.classList.add("dragging"), 0)
    );

    liEle.addEventListener("dragend", () => liEle.classList.remove("dragging"));
    fragment.appendChild(liEle);
  });

  insertContainer.innerHTML = "";
  insertContainer.appendChild(fragment);
};

createDraggableItems(USERS, dragAndDropContainer);

const initDragAndDrop = (e, dragAndDropItemLists) => {
  // query current dragging element
  e.preventDefault();
  const draggingItem = dragAndDropItemLists.querySelector(".item.dragging");

  const unDraggingItems = [
    ...dragAndDropItemLists.querySelectorAll(".item:not(.dragging)"),
  ];

  const nextItem = unDraggingItems.find((item) => {
    return e.clientY <= item.offsetTop + item.offsetHeight / 2;
  });

  dragAndDropItemLists.insertBefore(draggingItem, nextItem);
};

dragAndDropContainer.addEventListener("dragover", (e) => {
  initDragAndDrop(e, dragAndDropContainer);
});
dragAndDropContainer.addEventListener("dragenter", (e) => e.preventDefault());

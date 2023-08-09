const listContainers = document.querySelectorAll(".listContainer");
const statusText = document.getElementById("status");
const lists = document.querySelectorAll(".list");
let draggingEle;
lists.forEach((list) => {
  list.addEventListener("dragstart", (e) => {
    draggingEle = e.target.dataset.list;
    e.dataTransfer.setData("text/plain", e.target.dataset.list);
    statusText.innerText = `${e.target.dataset.list} element is started to drag`;
  });
  list.addEventListener("dragend", (e) => {
    statusText.innerText = `${e.target.dataset.list} element is ended to drag`;
    setTimeout(() => {
      statusText.innerHTML = "";
    }, 1000);
  });
});

listContainers.forEach((listContainer) => {
  listContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    statusText.innerText = `${draggingEle} element is dragged over ${
      e.target.dataset.hasOwnProperty("container")
        ? e.target.dataset.container
        : e.target.dataset.list
    }`;
  });

  listContainer.addEventListener("dragleave", (e) => {
    e.preventDefault();
  });

  listContainer.addEventListener("drop", (e) => {
    if (e.target.dataset.hasOwnProperty("container")) {
      return;
    }
    e.preventDefault();
    const currentParentContainer = e.target.parentElement;
    const currentEle = e.target;
    const currentEleClone = currentEle.cloneNode(true);
    const dragEle = document.querySelector(`[data-list=${draggingEle}]`);
    const dragEleClone = dragEle.cloneNode(true);
    const dragParentContainer = dragEle.parentElement;

    currentParentContainer.replaceChild(dragEleClone, currentEle);

    dragParentContainer.replaceChild(currentEleClone, dragEle);
    statusText.innerText = `${draggingEle} element is replace with ${e.target.dataset.list}`;
    setTimeout(() => {
      statusText.innerHTML = "";
    }, 1000);
  });
});

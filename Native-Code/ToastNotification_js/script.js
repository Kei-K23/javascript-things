const notiContainer = document.querySelector(".noti-container");
const btn = document.querySelectorAll(".btn");
console.log(btn);

const TOASTS = {
  duration: 3000,
  success: {
    title: "Success",
    message: "This is success message",
    icon: "fa-solid fa-check",
  },
  alert: {
    title: "Alert",
    message: "This is alert message",
    icon: "fa-solid fa-circle-exclamation",
  },
  warning: {
    title: "Warning",
    message: "This is warning message",
    icon: "fa-solid fa-triangle-exclamation",
  },
  info: {
    title: "Info",
    message: "This is info message",
    icon: "fa-solid fa-circle-info",
  },
};
// remove toast
const removeToast = (toast, timeoutID) => {
  toast.classList.add("hide");
  if (timeoutID) clearTimeout(timeoutID);
  setTimeout(() => toast.remove(), 500);
};

const initToast = (id, toasts, toastContainer, removeToast) => {
  const { title, message, icon } = toasts[id]; // retrieve toast data by id
  let timeoutID; // timeout id
  // create li element
  const liEle = document.createElement("li");
  liEle.classList.add("toast", `${id}`);
  liEle.innerHTML = `
   <div class="toast-header">
      <div class="toast-title">
        <i class="${icon}"></i>
        <h3 class="title">${title}</h3>
      </div>
      <i class="fa-solid fa-xmark closeToast"></i>
    </div>
    <p class="message">${message}</p>
  `;

  toastContainer.appendChild(liEle);

  const closeToast = liEle.querySelector(".closeToast");
  if (closeToast) {
    closeToast.addEventListener("click", () => {
      removeToast(liEle);
    });
  }
  timeoutID = setTimeout(() => removeToast(liEle, timeoutID), toasts.duration);
};

// attach click event for all button
btn.forEach((btn) => {
  btn.addEventListener("click", () =>
    initToast(btn.id, TOASTS, notiContainer, removeToast)
  );
});

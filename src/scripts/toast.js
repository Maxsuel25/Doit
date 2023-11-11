export const toast = (message, color) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      padding: "20px",
      borderRadius: "12px",
    },
  }).showToast();
};

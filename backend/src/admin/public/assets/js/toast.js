function showToast(type, message) {
  const toast = document.getElementById(`${type}Toast`);
  const toastBody = toast.querySelector('.toast-body');
  toastBody.textContent = message;
  toast.classList.remove('hide');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, 3000);
}

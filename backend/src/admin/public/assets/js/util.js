function parseCookies() {
  const cookieArr = document.cookie.split('; ');
  const cookieObj = {};
  cookieArr.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieObj[name] = decodeURIComponent(value);
  });
  return cookieObj;
}

function deleteCookies() {
  var Cookies = document.cookie.split(';');
  // set 1 Jan, 1970 expiry for every cookies
  for (var i = 0; i < Cookies.length; i++)
    document.cookie = Cookies[i] + '=;expires=' + new Date(0).toUTCString();
}

function logout() {
  window.location.replace('/admin?action=logout');
}
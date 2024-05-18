const keycloak = new Keycloak({
  url: 'https://keycloak.bagiit.vn',
  realm: 'bookworm',
  clientId: 'admin-console',
});

function parseCookies() {
  const cookieArr = document.cookie.split('; ');
  const cookieObj = {};
  cookieArr.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieObj[name] = decodeURIComponent(value);
  });
  return cookieObj;
}

async function init() {
  try {
    await keycloak.init({ onLoad: 'login-required' });

    const cookie = parseCookies();
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const redirect = cookie['redirect'] || '/admin/dashboard';

    const params = new URLSearchParams(url.search);
    const action = params.get('action');
    if (action === 'logout') {
      keycloak.logout({
        redirectUri: `${window.location.origin}/admin`,
      });
      return;
    }

    deleteCookies();
    document.cookie = `__tk=${keycloak.token}`;

    if (pathname === '/admin') window.location.replace(redirect);
  } catch (error) {
    console.error(error);
  }
}
init();

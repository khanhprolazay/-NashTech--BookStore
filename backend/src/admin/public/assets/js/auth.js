const keycloak = new Keycloak({
  url: 'https://keycloak.bagiit.vn',
  realm: 'bookworm',
  clientId: 'admin-console',
});

async function init() {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
    });
    if (authenticated) {
      window.location.replace('admin/dashboard');
      document.cookie = `token=${keycloak.token}`;
    }
  } catch (error) {
    console.error(error);
  }
}

init();

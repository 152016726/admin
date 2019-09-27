const getters = {
  token: state => state.user.token,
  sidebar: state => state.app.sidebar,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  device: state => state.app.device
}
export default getters

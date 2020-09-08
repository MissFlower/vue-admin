const getters = {
  sideBar: state => state.app.sideBar,
  name: state => state.user.name,
  token: state => state.user.token,
  permissionList: state => state.user.permissionList,
  permission_routes: state => state.permission.routes
}
export default getters

const getters = {
  sideBar: state => state.app.sideBar,
  name: state => state.user.name,
  permissionList: state => state.user.permissionList
}
export default getters

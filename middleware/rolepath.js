export default function ({ store, route, redirect }) {
    const role = store.$auth.$state.user.role.id
    console.log(store.$auth.$state.user)
    // //Administrators === 3
    // //User === 4
    // //Seller === 5
    if (role !== 3) {
        const Pages = ['user-type-id'];
        const authpage = pathArr.includes(route.name);
        // if()
        console.log(route)
        if (authpage) {
            if (route.params.type && route.params.type === 'view') {
                redirect('/')
            }
        }
    }
    console.log(route.params.type)
}

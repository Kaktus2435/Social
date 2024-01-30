export const updateObjectInArray = (items, itemsId, objPropName, newObjProps) => {
   return items.map(u => {
        if (u[objPropName] === itemsId) {
            return { ...u, ...newObjProps}
        }
        return u;
    });
}

// state.users.map(u => {
//     if (u.id === action.userId) {
//         return { ...u, followed: true }
//     }
//     return u;
// })
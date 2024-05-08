import { APIResponseType, ResultCodeEnum } from "../../api/api";
import { usersAPI } from "../../api/usersAPI";
import { actions, follow, unfollow } from "./usersPageReducer"
jest.mock('../../api/usersAPI') 
const userApiMock = usersAPI as jest.Mocked<typeof usersAPI>
/* mock obiectul '../../api/usersAPI' */

const dispatchMock = jest.fn()
    //dispatchMock - fake object.
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userApiMock.follow.mockClear()
	userApiMock.unfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}
//@ts-ignore
/* userApiMock lucreaza in loc de adevaratul userAPI si daca de la el
se cheama follow atunci intoarce result */

test("follow successed", async () =>{

    userApiMock.follow.mockReturnValue(Promise.resolve(result))/* follow - ar trbui sa intoarca Promise
    care se resolve cu obiectul (result) */
    /* Soluție la eroarea imposibilității citirii valorii resultCode de la undefined. 
Trebuie să așteptați răspunsul serverului în interiorul testului */

    const thunk = follow(1);
    //obtinem thunk cu ajutorul  la thunk creator in cazul nostru follow
    
    await thunk( dispatchMock, getStateMock, {} /* dispatch */)
    expect(dispatchMock).toHaveBeenCalledTimes(3)
    //a fost apelat de 3 ori, dispatch(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingInProgress(true, 1))
    /* toHaveBeenNthCalledWith- inseamna ca careva apel a fost apelat cu un careva obiect,
    adica primul apel a fost cu obiectul actions.toggleIsFollowingInProgress(true, userId) */
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingInProgress(false, 1))
    

    /* A testa un thunck, inseamna a te asigura ca thunck-ul face toate dispatches cu actions corecte.
    Thunk - este o multime de dispatches, careva cerere asincronă si raspunsul care se asteapta await. 
    Acesti dispatches pot fi facuti inainte de a simula cererea la Api si dupa ce primim raspunsul de la Api. 
    Pentru unit test noi nu trimetem cererea la Api si nu asteptam raspuns noi cream mock(Stubs, Fakes, Spy).
    
    De fapt noi nici dispatch nu dorim sa efectuam, deaorece dispatch este o metoda a lui store si o sa fim nevoiti sa 
    facem dispatch action catre adevaratul store. Noi dorim sa aflam de cate ori a fost facut acest dispatch  */
})

test ('unfollow success', async () => {
    userApiMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingInProgress(false, 1))

})



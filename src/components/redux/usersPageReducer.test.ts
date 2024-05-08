import usersPageReducer, { InitialStateType, actions } from "./usersPageReducer"

let state: InitialStateType;

beforeEach(() => {
    //Deoarece folosim un state unic pentru toate testurile, pentru a evita schimbarea acestuia dupa testul anterior vom folosi beforeEach
    //beforeEach - initializeaza state de fiecare data inainte de test
    state = {
        users: [
            {
                id: 0,
                name: "Andrian0",
                status: "status0",
                photos: { small: null, large: null },
                followed: false
            },
            {
                id: 1,
                name: "Andrian1",
                status: "status1",
                photos: { small: null, large: null },
                followed: false
            },
            {
                id: 2,
                name: "Andrian2",
                status: "status2",
                photos: { small: null, large: null },
                followed: true
            },
            {
                id: 3,
                name: "Andrian3",
                status: "status3",
                photos: { small: null, large: null },
                followed: true
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []

    }
})

test("follow success", () => {


    const newState = usersPageReducer(state, actions.followSuccess(1))
    //Reducerul primeste state si un action creator, in cazul nostru followSuccess primeste userul cu id 1

    expect(newState.users[0].followed).toBeFalsy() //aici verificam ca toBeFalsy va ramane la fel 
    //In situatia de mai sus am scris ca "users 0 cum era fals asa si trebuie sa ramana fals"
    expect(newState.users[1].followed).toBeTruthy()
    //In acest caz deoarece modificam state followSuccess(users 1) dorim ca verificarea sa dea true
}),


    test("unfollow success", () => {
        const newState = usersPageReducer(state, actions.unfollowSuccess(3))

        expect(newState.users[2].followed).toBeTruthy()
        expect(newState.users[3].followed).toBeFalsy()
    })
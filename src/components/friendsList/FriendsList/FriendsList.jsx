import c from "./FriendsList.module.css";

const FriendsList = (props) => {

    return (

        <div className={c.friendsList}>
            <div className={c.container}>                
                <div className={c.friendsList__contacts}>
                    <div className={c.friendsList__photos}>
                        <img src={props.photos} alt="" className={c.friendsList__photo} />
                    </div>
                    <div className={c.friendsList__infoFrend}>
                        <div className={c.name}>
                            {props.name}
                            {props.firstName}
                        </div>
                        <div className={c.message}>

                        </div>
                    </div>
                    <div className={c.friendsList__addPhotos}>
                        <img src="" alt="" className={c.friendsList__addPhoto} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FriendsList;
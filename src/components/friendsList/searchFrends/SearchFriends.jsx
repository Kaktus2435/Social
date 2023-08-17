import c from './SearchFriends.module.css';
import serch_img from '../../img/Search.svg';
import settings_img from './carbon_settings-adjust.svg'; 
const SearchFriends = () => {
    return (
        <div className={c.container}>
            <img src={serch_img} alt="serch img" className={c.serch_img}/>
            <input type="text" placeholder='Search messages' className={c.serch} />
            <img src={settings_img} alt="settings img" className={c.settings_img} />
        </div>
    );
}

export default SearchFriends;
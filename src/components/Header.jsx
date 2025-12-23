import './Header.css';

const Header = () => {
    return (
        <div className="Header">
            <h3>찬찬잉의 ToDo List 🌱</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

export default Header;

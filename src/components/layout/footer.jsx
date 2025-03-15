export default function Footer({ setShowPopup, showPopup }) {
    return (
        <footer className="App-footer">
            <p>To-Do List by Manon VERHILLE</p>
            <button onClick={() => setShowPopup(prev => !prev)}>
                {showPopup ? "✖" : "+"}
            </button>
        </footer>
    );
}
export default function Header(props){
    return (
        <header className="App-header">
            <div className="App-name">
                <h1>To-Do</h1>
                <img src="/img/logoAMU.png" alt="Logo de l'académie d'AMU"/>
            </div>
            <p> {props.nbTaches} tâches, dont {props.nbTachesEnCours} en cours</p>
        </header>
    )
}
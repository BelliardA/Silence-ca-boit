import './Input.css'
import add from '../assets/add.png'

function Input (addPlayer: any) {

    const savePlayer = (e: any) => {
        e.preventDefault();
        const input = document.querySelector('.input') as HTMLInputElement;
        const player = input.value;
    
        const players = JSON.parse(localStorage.getItem('players') || '[]');
        players.push(player);
    
        localStorage.setItem('players', JSON.stringify(players));
    
        input.value = '';

        addPlayer.addPlayer(true);
    };
    
    return (
        <form className="form">
            <input className="input" type="text" placeholder="Ajoutez un joueur" />
            <button onClick={savePlayer} type="submit" className="button">
               <img className='add' src={add} alt="" />
            </button>
        </form>
    )
}

export default Input;
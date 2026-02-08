import type { JSX } from "react";

interface Props {
    id: string;
    title: string;
    text: string;
    src?: string;
}

export function CombatantCard({id, title, text, src}: Props): JSX.Element {

    return (
        <div key={id} className="card" style={ { width: '18rem' }}>
            <img src={src ?? '/default_Combatant.jpeg'} className="card-img-top" alt="Combatant" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
            <div className="card-body">
                <a href="#" className="card-link">Details</a>
            </div>
        </div>
    );
}

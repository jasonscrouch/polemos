import type { JSX } from "react";
import { Button, Card } from "react-bootstrap";

interface Props {
    title: string;
    text: string;
    isFemale?: boolean;
}

export function CombatantCard({title, text, isFemale}: Props): JSX.Element {

    return (
        <Card style={{width: '18rem'}}>
            <Card.Img 
                variant="top" 
                src={isFemale ? '/combatant_woman.jpeg' : '/default_Combatant.jpeg'} 
                alt="Combatant" 
                style={{height: 286, width: 286}}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant="outline-secondary">Details</Button>
            </Card.Body>
        </Card>
  );
}

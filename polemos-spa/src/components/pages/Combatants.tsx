import { useContext, useState, type JSX } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";
import { FormInput } from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";
import { useMutation, useQuery } from "@apollo/client/react";
import { Error } from "../helpers/Error";
import { BrandText } from "../../utilities/css/Text";
import { ADD_COMBATANT } from "../../Mutation/DocumentNodes/AddCombatant";
import { GET_COMBATANTS } from "../../Query/DocumentNodes/GetCombatants";
import { useFormDataParser } from "../../utilities/FormData";
import ListGroup from 'react-bootstrap/ListGroup';
import type { Combatant } from "../../types/Combatant";

//if no combatants, then show "Begin adding combatants"
// if combatants, then show left List() with corresponding right form with details (Create or Update) and Cancel

interface List_Props {
    combatants: Combatant[];
    onClick: (combatant: Combatant) => void
    selected?: string;
}

function List({ combatants, onClick, selected }: List_Props) {
  return (
    <ListGroup>
        {combatants.map(x => <ListGroup.Item key={x.id} action active={x.id === selected} onClick={() => onClick(x)}>{<Row><Image roundedCircle src={x.isFemale ? '/combatant_woman.jpeg' : '/default_Combatant.jpeg'} alt="Combatant" style={{height: 32, width: 32}} />{x.name}</Row>}</ListGroup.Item>)}
    </ListGroup>
  );
}

interface Details_Props {
    isValidated: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    combatant?: Combatant;
}

function Details({isValidated, combatant, onSubmit, isLoading}: Details_Props) {
    return (
        <Form className="needs-validation" validated={isValidated} noValidate onSubmit={onSubmit}> 
            <FormInput label="Name" name="name" invalidMessage="Please enter a name" value={combatant?.name} />
            <Form.Group className="mt-2">
                <Form.Switch
                    id="isFemale"
                    name="isFemale"
                    label="Is Female"
                    checked={combatant?.isFemale}
                />
            </Form.Group>
            <SubmitButton text="Create" variant="primary" isLoading={isLoading} />
        </Form>
    );
}

export default function Combatants(): JSX.Element {

    const authnContext = useContext(AuthnContext);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [selectedCombatant, setSelectedCombatant] = useState<Combatant>();

    const name = "name";
        
    const [ addCombatantMutation, addCombatantResult ] = useMutation(ADD_COMBATANT);
    //todo: update this to userId, not combatantsId and/or allow a get for combatants by id
    const getCombatantsQuery = useQuery(GET_COMBATANTS, { variables: { userId: authnContext.authnUser?.id ?? 0 } });

    function handleClose() {
        setIsValidated(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        const parser = useFormDataParser(form);
        const formName = parser.getOrDefault(name);
        const formIsFemale = parser.getOrDefault('isFemale') === 'on' ? true 
            : false;

        if (!formName) {
            return;
        }

        if (!authnContext.authnUser?.id) {

            //add error here about not being signed in
            return;
        }

        addCombatantMutation({ variables: { input: { userId: authnContext.authnUser.id,  name: formName, isFemale: formIsFemale} } })
            .then((result) => {
                
                if (result.data?.addCombatant.success) {
                    getCombatantsQuery.refetch();
                    handleClose();
                }
            });
    }

    // todo: onClick, open modal with left and right slide to go through all combatants

    // todo: create image custom image creation endpoint (based on attributes like STR)
    // support localStorage creation for users who are not signed in

    //todo: center title, create add functionality that pulls down to reveal form, and "start creating combatants" if none

    //todo: thin out the bottom offcanvas to reduce unused space
    return (
        <div className="text-center">
            <div className={BrandText("mb-1")}>Combatants</div> 
            <div>
                <Button
                    // this will add a new item to the List()
                    //onClick={() => }
                    title="Add"
                >
                    Add
                </Button>
            </div>
            { !getCombatantsQuery.data && <div>Begin adding combatants</div>}
            <Alert variant="info" show={authnContext.authnUser === undefined} className="d-flex flex-column text-center">
                <Alert.Heading>You're not signed in!</Alert.Heading>
                <p>We'll keep your data locally.</p>
                <p>But we can't guarantee that you won't lose it.</p>
            </Alert>
            {addCombatantResult.error != null 
                && <Error isShown={addCombatantResult.error != null} message={addCombatantResult.error.message} /> }
            {getCombatantsQuery.error != null 
                && <Error isShown={addCombatantResult.error != null} message={getCombatantsQuery.error.message} /> }
            <Row>
                <Col xs={2} md={3} className="g-2 mb-2">
                {/* { getCombatantsQuery.data 
                    && getCombatantsQuery.data.combatants
                    && getCombatantsQuery.data.combatants.length > 0 
                    && <List combatants={getCombatantsQuery.data?.combatants} />
                } */}
                    <List 
                        combatants={[{id: '1', name: 't1', isFemale: false }, { id: '2', name: 't2', isFemale: true}, { id: '3', name: 't3', isFemale: true}, { id: '4', name: 't4', isFemale: true}, { id: '5', name: 't5', isFemale: false}]} 
                        onClick={(x) => setSelectedCombatant(x)}
                        selected={selectedCombatant?.id}
                    />
                </Col>
                <Col>
                    <Details 
                        isValidated={isValidated} 
                        onSubmit={(e) => handleSubmit(e)} 
                        combatant={selectedCombatant}
                        isLoading={addCombatantResult.loading} 
                    />
                </Col>
            </Row>
        </div>
    );
}
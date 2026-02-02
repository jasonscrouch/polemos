import { useContext, useState, type JSX } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { Alert, Button, Col, Collapse, Form, Row } from "react-bootstrap";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";
import { useMutation, useQuery } from "@apollo/client/react";
import { Error } from "../helpers/Error";
import { BrandText } from "../../utilities/css/Text";
import { ADD_COMBATANT } from "../../Mutation/DocumentNodes/AddCombatant";
import { GET_COMBATANTS } from "../../Query/DocumentNodes/GetCombatants";

// todo: use this to test an authn user

//todo: Overall, there will be a a title, add button, and a list of cards.
// Clicking on each will bring up a modal with more details about each.
// The modal allows you to move left and right through the cards.
// There is a search at the top, which will highlight text in each card that matches the search.

export default function Combatants(): JSX.Element {

    const authnContext = useContext(AuthnContext);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const name = "name";
        
    const [ addCombatantMutation, addCombatantResult ] = useMutation(ADD_COMBATANT);
    const getCombatantsQuery = useQuery(GET_COMBATANTS, { variables: { combatantsId: authnContext.authnUser?.id ?? 0 } });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        // todo: create formData utility that returns '' if null or undefined
        const formData = new FormData(form);
        const formName = formData.get(name)?.toString();

        if (!formName) {
            return;
        }

        if (!authnContext.authnUser?.id) {

            //add error here about not being signed in
            return;
        }

        addCombatantMutation({ variables: { input: { userId: authnContext.authnUser.id,  name: formName} } })
            .then((result) => {
                
                if (result.data?.addCombatant.success) {
                    getCombatantsQuery.refetch();
                }
            });
    }

    //todo: create own file
    // todo: onClick, open modal with left and right slide to go through all combatants
    function createCombatantCard(id: string, title: string, text: string): JSX.Element {

        return (
            <div key={id} className="card" style={ { width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
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

    //todo: create this page
    // way to create a combatant
    // name
    // auto-create the other elements
    // auto add image (perhaps based on str or dex)
    // show list of created combatants
    // support localStorage creation for users who are not signed in


    //todo: center title, create add functionality that pulls down to reveal form, and "start creating combatants" if none

    //todo: these alerts are styled the same. Create an alert wrapper for this.
    return (
        <>
            <div className={BrandText("mb-1")}>Combatants</div> 
            <div>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    title="Add"
                >
                    Add
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Form className="needs-validation" validated={isValidated} noValidate onSubmit={(e) => handleSubmit(e)}> 
                            <Row className="g-3"> 
                                <Col lg="12"> 
                                    <FormInput label="Name" name="name" type="text" isRequired={true} invalidMessage="Please enter a name" shouldAutoFocus={true} />
                                </Col>
                                <Col>
                                    <SubmitButton text="Create" variant="primary" isLoading={addCombatantResult.loading} />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Collapse>
            </div>
            <Alert variant="info" show={authnContext.authnUser === undefined} className="d-flex flex-column text-center">
                <Alert.Heading>You're not signed in!</Alert.Heading>
                <p>We'll keep your data locally.</p>
                <p>But we can't guarantee that you won't lose it.</p>
            </Alert>
            {addCombatantResult.error != null 
                && <Error show={addCombatantResult.error != null} message={addCombatantResult.error.message} /> }
            {getCombatantsQuery.error != null 
                && <Error show={addCombatantResult.error != null} message={getCombatantsQuery.error.message} /> }
            <Row>
                { getCombatantsQuery.data && getCombatantsQuery.data.combatants.length > 0 ? getCombatantsQuery.data?.combatants.map((x, i) => createCombatantCard(i.toString(), x.name, ""))
                    : <div>Begin adding combatants</div>}
            </Row>
        </>
    );
}
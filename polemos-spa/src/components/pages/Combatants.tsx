import { useContext, useState, type JSX } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { Alert, Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";
import { useMutation, useQuery } from "@apollo/client/react";
import { Error } from "../helpers/Error";
import { BrandText } from "../../utilities/css/Text";
import { ADD_COMBATANT } from "../../Mutation/DocumentNodes/AddCombatant";
import { GET_COMBATANTS } from "../../Query/DocumentNodes/GetCombatants";
import { CombatantCard } from "../helpers/CombatantCard";
import { getFormDataOrDefault } from "../../utilities/FormData";

// Clicking on each will bring up a modal with more details about each.
// The modal allows you to move left and right through the cards.
// There is a search at the top, which will highlight text in each card that matches the search.

export default function Combatants(): JSX.Element {

    const authnContext = useContext(AuthnContext);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false);

    const name = "name";
        
    const [ addCombatantMutation, addCombatantResult ] = useMutation(ADD_COMBATANT);
    const getCombatantsQuery = useQuery(GET_COMBATANTS, { variables: { combatantsId: authnContext.authnUser?.id ?? 0 } });

    function handleClose() {
        setShowOffCanvas(false);
        setIsValidated(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        // todo: create formData utility that returns '' if null or undefined
        const formData = new FormData(form);
        const formName = getFormDataOrDefault(formData, name);
        const formIsFemale = getFormDataOrDefault(formData, 'isFemale') === 'on' ? true 
            : false;

        //todo
        console.log(`Is Female is '${formIsFemale}'`);

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

    return (
        <>
            <div className={BrandText("mb-1")}>Combatants</div> 
            <div>
                <Button
                    onClick={() => setShowOffCanvas(!showOffCanvas)}
                    title="Add"
                >
                    Add
                </Button>
                <Offcanvas
                    show={showOffCanvas}
                    onHide={() => handleClose()}
                    placement="start"
                    >
                    <Offcanvas.Header closeButton><div className={BrandText()}>Combatants</div></Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form className="needs-validation" validated={isValidated} noValidate onSubmit={(e) => handleSubmit(e)}> 
                            <Row className="g-3"> 
                                <Col lg="12"> 
                                        <FormInput label="Name" name="name" type="text" isRequired={true} invalidMessage="Please enter a name" shouldAutoFocus={true} />
                                            <Form.Group className="mt-2">
                                                <Form.Check
                                                type="switch"
                                                id="isFemale"
                                                name="isFemale"
                                                label="Is Female"
                                            />
                                        </Form.Group>
                                </Col>
                                <Col>
                                    <SubmitButton text="Create" variant="primary" isLoading={addCombatantResult.loading} />
                                </Col>
                            </Row>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
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
                { getCombatantsQuery.data && getCombatantsQuery.data.combatants.length > 0 ? getCombatantsQuery.data?.combatants.map((x, i) => <CombatantCard id={i.toString()} title={x.name} text="" src={x.isFemale ? '/combatant_woman.jpeg' : undefined} />)
                    : <div>Begin adding combatants</div>}
            </Row>
        </>
    );
}
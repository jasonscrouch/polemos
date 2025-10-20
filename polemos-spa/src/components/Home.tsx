import { Button, Container, Image } from "react-bootstrap";

export default function Home() {

// todo: try to make this look like apple.com

    return (
    <>
        <Container className="px-4 py-5 hero">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5"> 
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src="/combatants.jpg" className="d-block mx-lg-auto img-fluid" alt="Combatants" width="700" height="500" loading="lazy" /> 
                </div> 
                <div className="col-lg-6"> 
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Create Combatants</h1> 
                    <p className="lead">Get started by creating combatants. You'll use these to battle.</p> 
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start"> 
                        <Button type="button" size="lg" className="px-4 me-md-2" title="Create">Create</Button> 
                    </div> 
                </div> 
            </div> 
        </Container>
        <Container className="m-2"></Container>
        <Container className="px-4 py-5 hero">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5"> 
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src="/battle.jpg" className="d-block mx-lg-auto img-fluid" alt="Battle" width="700" height="500" loading="lazy" /> 
                </div> 
                <div className="col-lg-6"> 
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Battle</h1> 
                    <p className="lead">The time has come to put your combatants to the test. Let's battle!</p> 
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start"> 
                        <Button type="button" size="lg" className="px-4 me-md-2" title="Battle">Battle</Button>  
                    </div> 
                </div> 
            </div> 
        </Container>
        <Container className="m-2"></Container>
        <Container className="px-4 py-5 hero">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5"> 
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src="/statistics.jpg" className="d-block mx-lg-auto img-fluid" alt="Statistics" width="700" height="500" loading="lazy" /> 
                </div> 
                <div className="col-lg-6"> 
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Statistics</h1> 
                    <p className="lead">Get the latest statistics for your combatants.</p> 
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start"> 
                        <Button type="button" size="lg" className="px-4 me-md-2" title="View">View</Button>  
                    </div> 
                </div> 
            </div> 
        </Container>
    </>
    );
}

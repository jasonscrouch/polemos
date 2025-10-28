import { Container } from "react-bootstrap";
import { Link } from "react-router";

export default function Home() {

    return (
    <>
        <Container className="p-4 hero rounded-2">
            <div className="row align-items-center g-5 py-3"> 
                <div className="col-lg-6"> 
                    <div className="display-5 fw-bold text-body-emphasis mb-1">Create Combatants</div> 
                    <p className="lead">Get started by creating combatants. You'll use these to battle.</p> 
                    <Link to="/combatants" className="btn btn-primary btn-lg" title="Create">Create</Link> 
                </div> 
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src="/combatants.jpg" className="d-block mx-lg-auto img-fluid" alt="Combatants" width="700" height="500" loading="lazy" /> 
                </div> 
            </div> 
        </Container>
        <Container className="m-2"></Container>
        <Container className="p-4 hero rounded-2">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-3"> 
                <div className="col-lg-6"> 
                    <div className="display-5 fw-bold text-body-emphasis mb-1">Battle</div> 
                    <p className="lead">The time has come to put your combatants to the test. Let's battle!</p> 
                    <Link to="/battle" className="btn btn-primary btn-lg" title="Battle">Battle</Link>
                </div> 
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src="/battle.jpg" className="d-block mx-lg-auto img-fluid" alt="Battle" width="700" height="500" loading="lazy" /> 
                </div> 
            </div> 
        </Container>
        <Container className="m-2"></Container>
        <Container className="p-4 hero rounded-2">
            <div className="row align-items-center g-5 py-3"> 
                <div className="col-lg-6"> 
                    <div className="display-5 fw-bold text-body-emphasis mb-1">View Statistics</div> 
                    <p className="lead">Get the latest statistics for your combatants.</p> 
                    <Link to="/battle" className="btn btn-primary btn-lg" title="View">View</Link>
                </div>
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src="/statistics.jpg" className="d-block mx-lg-auto img-fluid" alt="Statistics" width="700" height="500" loading="lazy" /> 
                </div> 
            </div> 
        </Container>
    </>
    );
}

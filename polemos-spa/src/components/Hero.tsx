import type { JSX } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router";

export interface Props {
    key?: number
    title: string,
    lead: string,
    url: string,
    buttonName: string,
    imageSrc: string,
    imageAlt: string
}

export function Hero({key, title, lead, url, buttonName, imageSrc, imageAlt} : Props) : JSX.Element {
    
    return(
        <Container key={key ?? 1} className="p-4 hero rounded-2 m-2">
            <div className="row align-items-center g-5 py-3"> 
                <div className="col-lg-6"> 
                    <div className="display-5 fw-bold text-body-emphasis mb-1">{title}</div> 
                    <p className="lead">{lead}</p> 
                    <Link to={url} className="btn btn-primary btn-lg" title={buttonName}>{buttonName}</Link> 
                </div> 
                <div className="col-10 col-sm-8 col-lg-6"> 
                    <img src={imageSrc} className="d-block mx-lg-auto img-fluid" alt={imageAlt} width="700" height="500" loading="lazy" /> 
                </div> 
            </div> 
        </Container>
    );
}

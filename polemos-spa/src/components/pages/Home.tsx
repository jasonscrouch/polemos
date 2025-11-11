import type { JSX } from "react";
import { Hero, type Props } from "../Hero";

export default function Home() : JSX.Element[] {

    const heroes : Props[] = [{title: "Create Combatants", lead: "Get started by creating combatants. You'll use these to battle.", url: "/combatants", 
        buttonName: "Create", imageSrc: "/combatants.jpg", imageAlt: "Combatants"}, 
        {title: "Battle", lead: "The time has come to put your combatants to the test. Let's battle!", url: "/battle", 
        buttonName: "Battle", imageSrc: "/battle.jpg", imageAlt: "Battle"},
        {title: "View Statistics", lead: "Get the latest statistics for your combatants.", url: "/statistics", 
        buttonName: "View", imageSrc: "/statistics.jpg", imageAlt: "Statistics"}];

    return heroes.map((x, i) => <Hero key={i} {...x} />);
}

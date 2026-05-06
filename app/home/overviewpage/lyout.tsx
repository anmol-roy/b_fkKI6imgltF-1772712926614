import AboutSection from "@/components/mainPage/sections/AboutSection";
import AchievementsSection from "@/components/mainPage/sections/AchievementSection";
import CaseStudiesSection from "@/components/mainPage/sections/CaseStudiesSection";
import ContactSection from "@/components/mainPage/sections/ContactSection";
import FooterSection from "@/components/mainPage/sections/FooterSection";
import HeroSection from "@/components/mainPage/sections/HeroSection";
import ProjectsSection from "@/components/mainPage/sections/ProjectsSection";
import TechStackSection from "@/components/mainPage/sections/Techstacksection ";


export default function MainPageSectionWise (){
    return (
        <>
        <div id="overview"><HeroSection /></div>
        <div id="about"><AboutSection /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="case-studies"><CaseStudiesSection /></div>
        <div id="tech-stack"><TechStackSection /></div>
        <div id="achievements"><AchievementsSection /></div>
        <div id="contact"><ContactSection /></div>
        <FooterSection />
        </>
    )
}
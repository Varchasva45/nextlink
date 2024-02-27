import { Page } from "@/models/Page";
import User from "@/models/User";
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink, faLocationDot, faMobile, faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
<<<<<<< HEAD
import Event from "@/models/Event";
=======
import { FUNCTIONS_CONFIG_MANIFEST } from "next/dist/shared/lib/constants";
>>>>>>> 659f458 (Add public page with all the detailf filled in the profile form)
import Image from "next/image";
import Link from "next/link";

const buttonIcons = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    facebook: faFacebook,
    discord: faDiscord,
    tiktok: faTiktok,
    youtube: faYoutube,
    github: faGithub,
    linkedin: faLinkedin
}

function buttonClick(key, value) {
    if(key === "email") {
        return `mailto:` + value;
    } else if(key === "mobile") {
        return `tel:` + value;
    }

    return value;
}

export default async function UserPage({params}) {
    const uri  = params.uri;
    await mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({uri: uri});
<<<<<<< HEAD

    if(!page) {
        return (
            <div>
                "No Page Found"
            </div>
        );
    }   

    const user = await User.findOne({email: page.owner});
    await Event.create({uri: "/" + uri, type: "View", page: uri});

    return (
        <div className="bg-blue-950 flex flex-col h-screen text-white shadow">
=======
    const user = await User.findOne({email: page.owner});

    return (
        <div className="bg-blue-950 flex flex-col h-screen text-white">
>>>>>>> 659f458 (Add public page with all the detailf filled in the profile form)
            <div className="-mb-16 h-36 bg-gray-400 bg-cover bg-center bg-no-repeat bg-stretch"
                style={page.bgType === "color" ? {backgroundColor: page.bgColor} : {backgroundImage: `url(${page.bgImage})`, backgroundSize: 'cover'}}
            ></div>
            <Image 
                className="rounded-full w-36 h-36 mx-auto"
                src={user.image} 
                alt={"avatar"}  
                width={256}
                height={256}
            />
            <h2 className="text-xl text-white mt-2 text-center">{page.displayName}</h2>
<<<<<<< HEAD
            <h3 className="text-sm flex justify-center items-center gap-2 text-white/70 mt-2">
=======
            <h3 className="text-lg flex justify-center items-center gap-2 text-white/70 mt-2">
>>>>>>> 659f458 (Add public page with all the detailf filled in the profile form)
                <FontAwesomeIcon icon={faLocationDot} height={16} width={16}/>
                <span>{page.location}</span>
            </h3>
            <p className="text-md text-white mt-2 text-center">
                {page.bio}
            </p>
<<<<<<< HEAD
            
            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 mt-8">   
                {Object.keys(page.buttons).map(key => (
                    <Link href={buttonClick(key, page.buttons[key])} target="_blank" className="bg-white p-1 rounded-full">
                        <FontAwesomeIcon icon={buttonIcons[key]} height={18} width={18} className="text-blue-950"/>
=======

            <div className="flex justify-center items-center gap-2 mt-4">   
                {Object.keys(page.buttons).map(key => (
                    <Link href={buttonClick(key, page.buttons[key])} className="bg-white p-2 rounded-full">
                        <FontAwesomeIcon icon={buttonIcons[key]} height={24} width={24} className="text-blue-950"/>
>>>>>>> 659f458 (Add public page with all the detailf filled in the profile form)
                    </Link>
                ))}
            </div>
                

<<<<<<< HEAD
            {/* Links */}
            <div className={`max-w-2xl mx-auto grid ${page.links.length === 1 ? 'place-items-center' : 'md:grid-cols-2'} gap-8 p-4 pt-8 px-8`}>
                {page.links.map(link => (
                    <Link
                        key={link.url}
                        target="_blank"
                        ping={process.env.URL+'api/click?url='+ btoa(link.url)+'&page='+page.uri}
                        className="bg-indigo-800 p-2 block flex"
                        href={link.url}>
                        <div className="relative -left-4 overflow-hidden w-16">
                        <div className="w-16 h-16 bg-blue-700 aspect-square relative flex items-center justify-center aspect-square">
                            {link.icon && (
                            <Image
                                className="w-full h-full object-cover"
                                src={link.icon}
                                alt={'icon'} width={64} height={64} />
                            )}
                            {!link.icon && (
                            <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                            )}
                        </div>
                        </div>
                        <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
                        <div>
                            <h3>{link.title}</h3>
                            <p className="text-white/50 h-6 overflow-hidden">{link.subtitle}</p>
                        </div>
=======
            <div className={`max-w-2xl grid ${page.links.length === 1 ? 'place-items-center' : 'md:grid-cols-2'} mx-auto mt-8 gap-4 p-4`}>
                {page.links.map(link => (
                    <Link key={link.title} href="/" className="flex gap-3 bg-indigo-800 p-2 shrink grow-0 shadow-md">
                        <div className="bg-blue-700 h-16 w-16 relative flex items-center justify-center aspect-square -left-5">
                            {link.icon && <Image src={link.icon} alt={link.title} width={64} height={64}/>}
                            {!link.icon && <FontAwesomeIcon icon={faLink} height={28} width={28} className="text-white"/>}
                        </div>

                        <div className="-ml-4">
                            <div>
                                <h3> 
                                    {link.title}
                                </h3>
                                
                                <p className="text-white/50 overflow-hidden h-6">
                                    {link.subtitle}
                                </p>
                            </div>
>>>>>>> 659f458 (Add public page with all the detailf filled in the profile form)
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    );
}
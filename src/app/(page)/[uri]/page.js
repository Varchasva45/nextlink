import { Page } from "@/models/Page";
import User from "@/models/User";
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink, faLocationDot, faMobile, faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Event from "@/models/Event";
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
    const user = await User.findOne({email: page.owner});

    return (
        <div className="bg-blue-950 flex flex-col h-screen text-white">
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
            <h3 className="text-sm flex justify-center items-center gap-2 text-white/70 mt-2">
                <FontAwesomeIcon icon={faLocationDot} height={16} width={16}/>
                <span>{page.location}</span>
            </h3>
            <p className="text-md text-white mt-2 text-center">
                {page.bio}
            </p>
            
            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 mt-8">   
                {Object.keys(page.buttons).map(key => (
                    <Link href={buttonClick(key, page.buttons[key])} target="_blank" className="bg-white p-1 rounded-full">
                        <FontAwesomeIcon icon={buttonIcons[key]} height={18} width={18} className="text-blue-950"/>
                    </Link>
                ))}
            </div>
                

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
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    );
}
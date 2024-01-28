"use client";
import RadioTogglers from "../formItems/RadioTogglers";
import { faImage, faPalette, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";

export default function PageSettingsForm({page, user}) {

    async function saveBaseSettings(formData) {
        const result = await savePageSettings({formData, user});
        console.log(result);
        if(result) {
            toast.success("Page settings saved!");
        } else {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="-m-4">
            <form action={saveBaseSettings}>  

                <div className="bg-gray-300 py-16 flex justify-center items-center">
                    <RadioTogglers
                        defaultValue={'color'}
                        options={
                            [
                                {value: "color", icon: faPalette},
                                {value: "image", icon: faImage}
                            ]
                        } 
                    />

                    
                </div>

                <div className="flex justify-center">
                    <Image 
                        src={user?.image} 
                        alt={"avatar"} width={128} 
                        height={128}
                        className="rounded-full relative -top-8 -mb-12 border-4 border-white shadow" 
                    />
                </div>
                <div className="p-4 flex flex-col gap-3"> 
                    <div className="relative">
                        <label className="input-label" htmlFor="nameIn">Display name</label>
                        <input 
                            className="setting-input"
                            type="text" 
                            id="nameIn" 
                            name ="displayName"
                            placeholder="Give me your name"
                            defaultValue={page?.displayName}
                        />

                        <label className="input-label" htmlFor="locationIn">Location</label>
                        <input 
                            className="setting-input"
                            type="text" 
                            id="locationIn"
                            name="location"
                            placeholder="Where you at?"
                            defaultValue={page?.location}    
                        />

                        <label className="input-label" htmlFor="bioIn">Bio</label>
                        <textarea 
                            className="setting-input"
                            name="bio" 
                            id="bioIn" 
                            placeholder="Write yout Bio Here..."
                            defaultValue={page?.bio}
                        />
                    </div>

                    <SubmitButton className="max-w-[200px] rounded">
                        <FontAwesomeIcon icon={faSave} height={24} width={24} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </div> 
    );
}


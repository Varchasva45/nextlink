"use client";
import RadioTogglers from "../formItems/RadioTogglers";
import { faImage, faPalette, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";

export default function PageSettingsForm({page, user}) {

    const [bgType, setBgType] = useState(page?.bgType || "color");
    const [bgColor, setBgColor] = useState(page?.bgColor || "black");
    const [bgImage, setBgImage] = useState(page?.bgImage || null);

    async function saveBaseSettings(formData) {
        const result = await savePageSettings({formData, user});
        console.log(result);
        if(result) {
            toast.success("Page settings saved!");
        } else {
            toast.error("Something went wrong!");
        }
    }

    async function handleFileChange(e) {
        const file = e.target.files?.[0];
        // console.log(file);
        if(file) {
            const data = new FormData;
            data.set('file', file);

            fetch('/api/upload', {
                  method: 'POST',
                  body: data,
                }).then(response => {
                    response.json().then(link => {
                    setBgImage(link);
                });
            });
        }
    }
    
    return (
        <div className="-m-4">
            <form action={saveBaseSettings}> 

                <div className="p-3 bg-gray-100 border-b-2 border-gray-300">
                    <div className="py-16 flex justify-center items-center bg-cover bg-center bg-no-repeat bg-stretch"
                        style={bgType === "color" ? {backgroundColor: bgColor} : {backgroundImage: `url(${bgImage})`, backgroundSize: 'cover'}}
                    >
                        <div>
                            <RadioTogglers
                                defaultValue={page?.bgType}
                                onChange={e => setBgType(e)}
                                options={
                                    [
                                        {value: "color", icon: faPalette},
                                        {value: "image", icon: faImage}
                                    ]
                                } 
                            />

                                {
                                    bgType === "color" && (
                                        <div className="bg-white mt-2 px-1 py-2 shadow">
                                            <div className="gap-2 flex justify-center">
                                                <span>Background Color:</span>
                                                <input type="color" name="bgColor" onChange={e => setBgColor(e.target.value)} defaultValue={page?.bgColor}></input>
                                            </div>
                                        </div>
                                    )
                                }
                            
                            

                            {
                                bgType === "image" && (
                                    
                                    <div className="flex justify-center">
                                        
                                        <label
                                            className="bg-white mt-2 px-1 py-2 shadow mx-auto block"
                                        >
                                            <input type="file" 
                                                className="hidden"
                                                onChange={handleFileChange}
                                            ></input>
                                            <input className="hidden" name="bgImage" value={bgImage}></input>
                                            Change Image
                                        </label>
                                    </div>
                                )
                            }


                        </div>
                    </div>
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


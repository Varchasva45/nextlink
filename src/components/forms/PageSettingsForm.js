"use client";
import RadioTogglers from "../formItems/RadioTogglers";
import { faCloudArrowUp, faImage, faPalette, faSave, faTruckFieldUn} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import SectionBox from "../layouts/SectionBox";

export default function PageSettingsForm({page, user}) {

    const [bgType, setBgType] = useState(page?.bgType || "color");
    const [bgColor, setBgColor] = useState(page?.bgColor || "black");
    const [bgImage, setBgImage] = useState(page?.bgImage || null);
    const [avatar, setAvatar] = useState(user?.image || null);

    async function saveBaseSettings(formData) {
        const result = await savePageSettings({formData, user});
        console.log(result);
        if(result) {
            toast.success("Page settings saved!");
        } else {
            toast.error("Something went wrong!");
        }
    }

    async function upload(e, callbackFn) {
        const file = e.target.files?.[0];
        // console.log(file);
        if(file) {

            const promise = new Promise(async (resolve, reject) => {
                const data = new FormData;
                data.set('file', file);

                await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                    }).then(response => {
                        if(!response.ok) {
                            reject("Error uploading file");
                        }
                        response.json().then(link => {
                        callbackFn(link);
                        resolve(link);
                    });
                }); 

            });

            await toast.promise(promise, {
                loading: 'Uploading...',
                success: 'File uploaded!',
                error: 'Error uploading file'
            });
            
        }
    }

    async function handelCoverImageChange(e) {
        await upload(e, setBgImage);
    }

    async function handelAvatarChange(e) {
        await upload(e, setAvatar);
    }
    
    return (
        <div>
            <SectionBox>
                <form action={saveBaseSettings}> 

                    <div className=" bg-gray-100 border-b-2 border-gray-300">
                        <div className="py-24 -m-2 flex justify-center items-center bg-cover bg-center bg-no-repeat bg-stretch "
                            style={bgType === "color" ? {backgroundColor: bgColor} : {backgroundImage: `url(${bgImage})`, backgroundSize: 'cover'}}
                        >
                            <div className="h-full">
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
                                                    onChange={handelCoverImageChange}
                                                ></input>
                                                <input className="hidden" name="bgImage" value={bgImage}></input>
                                                <div className="flex items-center gap-2 px-1">
                                                    <FontAwesomeIcon icon={faCloudArrowUp} height={24} width={24} className="text-gray-700"/>
                                                    <span>Change Image</span>
                                                </div>
                                                
                                            </label>
                                        </div>
                                    )
                                }


                            </div>
                        </div>
                    </div> 


                    <div className="flex justify-center -mb-12">
                        
                        <div className="relative -top-8 w-[128px] h-[128px]">

                            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                                <Image
                                className="w-full h-full object-cover"
                                src={avatar}
                                alt={'avatar'}
                                width={128} height={128} />
                            </div>

                            <label
                                htmlFor="avatarIn"
                                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer">
                                <FontAwesomeIcon size={'xl'} icon={faCloudArrowUp} />
                            </label>

                            <input onChange={handelAvatarChange} id="avatarIn" type="file" className="hidden"/>
                            <input type="hidden" name="avatar" value={avatar}/>

                        </div>
                    </div>

                    <div className="flex flex-col gap-3"> 
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
            </SectionBox>
            
        </div> 
    );
}


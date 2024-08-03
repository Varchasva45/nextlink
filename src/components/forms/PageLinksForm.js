"use client"
import { useState } from "react";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../buttons/SubmitButton";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../layouts/SectionBox";
import upload from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

function PageLinksForm({page, user}) {
    const [links, setLinks] = useState(page.links || []);

    async function save(ev) {
        ev.preventDefault();
        try {
            await savePageLinks(links);
            toast.success('Links saved');
        } catch (error) {
            console.error('Error while saving links:', error);
            toast.error('Failed to save links. Please try again.');
        }
    }
    
    function addNewLink() {
        setLinks(prevLinks => [...prevLinks, {id: Date.now().toString(), title: '', subtitle: '', icon: '', url: ''}]);
    }

    function handleUpload(ev, id) {
        upload(ev, uploadImageUrl => {
            const prevLinks = [...links];
            prevLinks.forEach(link => {
                if(link.id === id) {
                    link.icon = uploadImageUrl;
                }
            });
            setLinks(prevLinks);
        });
    }

    function handleLinksChange(id, props, ev) {
        const newLinks = [...links];
        newLinks.forEach(link => {
            if(link.id === id) {
                link[props] = ev.target.value;
            }
        });
        setLinks(newLinks);
    }

    function removeLink(linkKeyToRemove) {
        setLinks(prevLinks =>
          [...prevLinks].filter(link => link.id !== linkKeyToRemove)
        );
    }

    return (
        <SectionBox>
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <form onSubmit={save}>
                <button 
                    type="button" 
                    className="text-blue-500 gap-2 flex items-center pb-5" 
                    onClick={addNewLink}
                >
                    <FontAwesomeIcon className="bg-blue-500 text-white p-1 border rounded-full" icon={faPlus} height={18} width={18} />
                    <span>Add new</span>
                </button>

                <ReactSortable list={links} setList={setLinks} handle=".handle">
                    {links.map((link) => (
                        <div key={link.id} className="mt-4 flex md:flex-row flex-col items-center gap-5 md:gap-8 mb-10">
                                
                            <div className="flex gap-4 justify-center items-center">
                                <div className="handle text-center mr-2">
                                    <FontAwesomeIcon icon={faGripLines} height={18} width={18} className="cursor-pointer" />
                                </div>
                                
                                <div className="flex flex-col gap-4 items-center">  
                                    
                                    <div className="w-16 h-16 bg-gray-200 flex relative aspect-square items-center justify-center overflow-hidden">
                                        {link.icon && <Image src={link.icon} alt="icon" height={64} width={64} className="w-full h-full object-cover" />}
                                        {!link.icon && <FontAwesomeIcon icon={faLink} height={18} width={18} className="" />}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-center"> 
                                            <input 
                                                id={'icon' + link.id} 
                                                type="file" 
                                                className="hidden"
                                                onChange={ev => handleUpload(ev, link.id)}
                                            />
                                            <label 
                                                type="button" 
                                                className="flex gap-1 text-center items-center"
                                                htmlFor={'icon' + link.id}
                                            >
                                                <FontAwesomeIcon icon={faCloudArrowUp} height={24} width={24} />
                                                <span>Change icon</span>
                                            </label>
                                        </div>
                                        
                                    
                                        <div> 
                                            <button
                                                onClick={() => removeLink(link.id)}
                                                type="button" className="w-full bg-gray-200 py-1 px-3 mb-2 h-full flex gap-2 items-center justify-center hover:bg-red-400">
                                                <FontAwesomeIcon icon={faTrash} height={24} width={24}/>
                                                <span>Remove this link</span>
                                            </button>
                                        </div>
                                        
                                    </div>  
                                </div>
                            
                            </div>

                            <div className="md:grow w-full">
                                <label className="input-label" htmlFor="nameIn">Title</label>
                                <input className="button-input" onChange={ev => handleLinksChange(link.id, 'title', ev)} value={link.title} type="text" placeholder="title" />
                                <label className="input-label" htmlFor="nameIn">Subtitle</label>
                                <input className="button-input" onChange={ev => handleLinksChange(link.id, 'subtitle', ev)} value={link.subtitle} type="text" placeholder="subtitle (optional)" />
                                <label className="input-label" htmlFor="nameIn">URL</label>
                                <input className="button-input" onChange={ev => handleLinksChange(link.id, 'url', ev)} value={link.url} type="text" placeholder="link" />
                            </div>

                        </div>
                    ))}
                </ReactSortable>

                <div className="border-gray-300 border-t-2">
                    <SubmitButton className="max-w-[200px] rounded mt-5">
                        <FontAwesomeIcon icon={faSave} height={24} width={24} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}

export default PageLinksForm;

"use client";

import { faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";

const { default: SectionBox } = require("../layouts/SectionBox");

function PageLinksForm({page, user}) {

    const [links, setLinks] = useState(page.links || []);


    function save(formData) {
    }

    function addNewLink() {
        setLinks(prevLinks => [...prevLinks, {title: ' ', subtitle: ' ', icon: ' ', link: ' '}]);
    }

    return (
        <SectionBox>
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <form action={save}>

                <button 
                    type="button" 
                    className="text-blue-500 gap-2 flex items-center pb-2" 
                    onClick={addNewLink}
                >
                    <FontAwesomeIcon className="bg-blue-500 text-white p-1 border rounded-full" icon={faPlus} height={18} weight={18}/>
                    <span>Add new</span>
                </button>

                <div className="py-4">
                    {links.map((link, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input 
                                type="text" 
                                name={`links[${index}][title]`}
                                placeholder="Title" 
                            />
                            <input 
                                type="text" 
                                name={`links[${index}][subtitle]`}
                                placeholder="Subtitle"
                            />
                            <input 
                                type="text" 
                                name={`links[${index}][icon]`}
                                placeholder="Icon"
                            />
                            <input 
                                type="text" 
                                name={`links[${index}][link]`}
                                placeholder="Link"
                            />
                        </div>
                    ))}
                </div>

                <div className="border-gray-300 border-t-2">
                    <SubmitButton 
                        className="max-w-[200px] rounded mt-5">
                        <FontAwesomeIcon icon={faSave} height={24} width={24} />
                        <span>Save</span>
                    </SubmitButton>
                </div>


            </form>
        </SectionBox>
    );
}

export default PageLinksForm;
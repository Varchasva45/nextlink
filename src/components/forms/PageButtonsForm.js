"use client";
import { useState } from "react";
import SectionBox from "../layouts/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPlus, faMobile, faSave, faTrash, faGripLines} from "@fortawesome/free-solid-svg-icons"; 
import { faInstagram, faFacebook, faDiscord, faTiktok, faYoutube, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

export default function PageButtonsForm({page, user}) {

    const buttons = [
        { key: 'email', label: 'e-mail', icon: faEnvelope, placholder: 'test@exmaple.com'},
        { key: 'mobile', label: 'mobile', icon: faMobile, placholder: '+91-123456789'},
        { key: 'instagram', label: 'instagram', icon: faInstagram, placholder: 'https://www.instagram.com/username'},
        { key: 'facebook', label: 'facebook', icon: faFacebook, placholder: 'https://www.facebook.com/username'},
        { key: 'discord', label: 'discord', icon: faDiscord, placholder: 'https://discord.com/username1234'},
        { key: 'tiktok', label: 'tiktok', icon: faTiktok, placholder: 'https://tiktok.com/username1234'},
        { key: 'youtube', label: 'youtube', icon: faYoutube, placholder: 'https://www.youtube.com/channel/xxxxxx'},
        { key: 'github', label: 'github', icon: faGithub, placholder: 'https:://github.com/username1234'},
        { key: 'linkedin', label: 'linkedin', icon: faLinkedin, placholder: 'https://www.linkedin.com/in/username1234'}
    ];

    const pageSavedButtons = Object.keys(page?.buttons || {});
    const [activeButtons, setActiveButtons] = useState(pageSavedButtons.map(button => buttons.find(btn => btn.key === button)));
    const availableButtons = buttons.filter(button => !activeButtons.find(btn => btn.key === button.key));

    function upperFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function addButtonToProfile(button) {
        setActiveButtons(prevActiveButtons => [...prevActiveButtons, button]);
    }

    function removeButtonFromProfile(button) {
        setActiveButtons(activeButtons.filter(btn => btn.key !== button.key));
    }

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Buttons saved');
    }

    return (
        <SectionBox>

            <form action={saveButtons}>

                <h2 className="text-2xl font-bold mb-4">Buttons</h2>

                <ReactSortable list={activeButtons} setList={setActiveButtons} handle=".handle">
                    {activeButtons.map((button, index) => (
                        <div key={button.key} className="mb-6 flex items-center">
                            <div className="handle w-48 -mr-14 flex gap-2 items-center text-gray-700">
                                <FontAwesomeIcon 
                                    height={18} 
                                    width={18} 
                                    icon={faGripLines} 
                                    className="cursor-pointer text-gray-500"
                                />
                                <FontAwesomeIcon height={18} width={18} icon={button.icon} />
                                <span>{upperFirst(button.label)}:</span>
                            </div>

                            <div className="flex flex-grow">
                                <input type="text" 
                                    className="button-input bg-gray-200 block flex-grow" 
                                    name={button.key}
                                    placeholder={button.placholder} 
                                    defaultValue={page?.buttons[button.key]}
                                    style={{
                                        marginBottom: 0
                                    }}
                                />

                                <button 
                                    className="text-gray-700 px-4 bg-gray-200 hover:bg-red-200"
                                    onClick={() => removeButtonFromProfile(button)}
                                    type="button"
                                >
                                    <FontAwesomeIcon 
                                        icon={faTrash} 
                                    />
                                </button>
                            </div>

                        </div>
                    ))}
                </ReactSortable>


                <div className="flex flex-wrap gap-2 pt-4 pb-4 border-t-2 border-b-2 border-gray-300">
                    {availableButtons.map((button) => (
                        <button
                            key={button.key}
                            onClick={() => addButtonToProfile(button)}
                            className="flex gap-2 p-2 justify-center items-center bg-gray-200">
                            <FontAwesomeIcon icon={button.icon} />
                            <span>{upperFirst(button.label)}</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}
                </div>

                <SubmitButton 
                    className="max-w-[200px] rounded mt-5">
                    <FontAwesomeIcon icon={faSave} height={24} width={24} />
                    <span>Save</span>
                </SubmitButton>

            </form>

        </SectionBox>
    );
}

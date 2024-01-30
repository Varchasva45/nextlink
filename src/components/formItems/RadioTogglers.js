import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({options, defaultValue, onChange}) {
    return (
        <div className="radio-togglers shadow text-gray-700">
            {options.map((option, index) => (
                <label key={index}> 
                    <input 
                        type="radio" 
                        name="bgType" 
                        value={option.value}
                        defaultChecked={option.value === defaultValue}
                        onClick={e => onChange(e.target.value)}
                    />
                    <div>
                        <FontAwesomeIcon icon={option.icon} />
                        <span>{option.value}</span>
                    </div>
                </label>
            ))}
            
        </div>
    );
}
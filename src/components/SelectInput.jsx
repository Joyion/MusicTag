

export default function SelectInput(props) {
    return (
        <form>
        <label>
            {props.label}
            <select value={props.value} onChange={props.onChange} className={props.className} aria-label={props.label}>
                <option value="">{props.label}</option>
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
                
        </label>
        <button type="button" onClick={props.onClick}></button>
        </form>
    )
}
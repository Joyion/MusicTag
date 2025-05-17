
export default function TextInput(props) {
    return (
        <form>
            <label>
                {props.label}
                <input
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    className={props.className}
                    aria-label={props.label}
                />
            </label>
            <button type="button" onClick={props.onClick}></button>
        </form>
//
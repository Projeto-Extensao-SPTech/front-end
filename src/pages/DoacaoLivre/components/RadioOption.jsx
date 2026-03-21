export default function RadioOption({ id, checked, onChange, label }) {
    return (
        <div className="flex gap-2 items-center">
            <input
                type="radio"
                name="envio"
                id={id}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className="text-white">
                {label}
            </label>
        </div>
    );
}

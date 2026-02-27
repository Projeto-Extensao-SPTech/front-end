import React from "react";
import { FaTimes } from "react-icons/fa";

const FotoPreview = React.memo(({ foto, index, onRemove }) => (
    <div className="relative group">
        <img
            src={URL.createObjectURL(foto)}
            alt={`Preview ${index + 1}`}
            className="w-16 h-16 object-cover rounded-lg border-2 border-[#052759]"
        />
        <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <FaTimes className="text-xs" />
        </button>
    </div>
));

export default FotoPreview;

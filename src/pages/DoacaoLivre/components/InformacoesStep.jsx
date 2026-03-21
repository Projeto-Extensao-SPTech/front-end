import { useAlertUtils } from "../../../hooks/useAlertUtils";
import InputField from "./InputField";
import FormButton from "./FormButton";

export default function InformacoesStep({ data, updateData, onNext }) {
    const alertUtils = useAlertUtils();

    const fields = [
        {
            label: "Nome do Produto",
            type: "text",
            name: "nomeProduto",
            component: "input",
            fullWidth: true,
        },
        {
            label: "Categoria",
            type: "select",
            name: "categoria",
            component: "select",
            options: [
                "Alimento",
                "Medicamento",
                "Vestimentas",
                "Materiais de Construção",
            ],
            fullWidth: true,
        },
        {
            label: "Quantidade",
            type: "number",
            name: "quantidade",
            component: "input",
            fullWidth: false,
        },
        {
            label: "Estado",
            type: "text",
            name: "estado",
            component: "select",
            options: ["Novo", "Usado"],
            fullWidth: false,
        },
        {
            label: "Descrição",
            type: "text",
            name: "descricao",
            component: "textarea",
            fullWidth: true,
        },
    ];

    const handleChange = (e) => updateData(e.target.name, e.target.value);

    const handleNext = (e) => {
        e.preventDefault();

        if (
            !data.nomeProduto ||
            !data.categoria ||
            !data.quantidade ||
            !data.estado ||
            !data.descricao
        ) {
            return alertUtils.warn(
                "Por favor, preencha todos os campos antes de avançar!"
            );
        }

        onNext();
    };

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
            <h3 className="text-lg text-white/80 font-normal">
                Preencha as informações do item que deseja doar
            </h3>

            <form className="flex flex-wrap w-full gap-4 justify-between">
                {fields.map((f) => (
                    <InputField
                        key={f.name}
                        field={f}
                        value={data[f.name]}
                        onChange={handleChange}
                    />
                ))}
            </form>

            <FormButton onClick={handleNext}>Avançar</FormButton>
        </div>
    );
}

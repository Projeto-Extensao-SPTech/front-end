export default function FeirasHeader() {
    return (
        <div>
            <h1
                className="text-3xl lg:text-4xl text-white leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
            >
                <span className="font-light">NAVEGUE PELAS</span>
                <br />
                <span className="font-bold">FEIRAS DE</span>
                <br />
                <span>ADOÇÃO</span>
            </h1>

            <p
                className="mt-3 text-white/55 text-sm max-w-xs"
                style={{ fontFamily: "Poppins, sans-serif" }}
            >
                Selecione uma feira abaixo para ver os pets disponíveis e onde ela
                acontece.
            </p>
        </div>
    );
}
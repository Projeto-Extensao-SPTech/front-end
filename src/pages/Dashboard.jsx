import ChartCadastros from "./ChartCadastrosMensais";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#ffffff]">

            <h1
                className="text-5xl font-extrabold text-[#052759] ml-36"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                Painel de <br />
                administração
            </h1>

            <div className="max-w-[1500px] mx-auto mt-8 grid grid-cols-[2fr_0.70fr] gap-10">

                <div className="bg-[#052759] rounded-2xl h-[650px] relative drop-shadow-[0_10px_20px_rgb(0_0_20_/_1)]">

                    <div className="w-full h-28 bg-white rounded-t-2xl flex items-center px-10">
                        <p className="font-extrabold text-4xl text-[#052759]">
                            Volume de cadastros mensal
                        </p>
                    </div>

                    <div className="absolute -right-[48px] bottom-20 w-60 overflow-hidden">
                        <img
                            className="h-[320px]"
                            src="img-dog2-dash.png"
                        />
                    </div>

                    <div className="mt-[500px]">
                        <ChartCadastros />
                    </div>
                </div>

                <div className="flex flex-col gap-9">

                    {/* Card 1 para não me perder */}
                    <div className="w-full h-48 bg-[#052759] rounded-2xl drop-shadow-[0_20px_20px_rgb(0_0_20_/_0.70)]">
                        <div className="w-full h-20 bg-white rounded-xl flex items-center px-4">
                            <p className="font-extrabold text-2xl text-[#052759]">
                                Mês com maior interesse <br /> na feira
                            </p>
                        </div>

                        <div className="grid grid-cols-2 h-20">
                            <div className="bg-white rounded-full mt-8 ml-6 w-40 h-10 flex items-center justify-center">
                                <p className="font-extrabold text-xl text-[#052759]">
                                    Outubro
                                </p>
                            </div>

                            <img className="w-48 mt-[-34px]" src="img-dog-dash.png" />
                        </div>
                    </div>

                    {/* Card 2 para não me perder*/}
                    <div className="w-full h-48 bg-[#052759] rounded-2xl drop-shadow-[0_20px_20px_rgb(0_0_20_/_0.70)]">
                        <div className="w-full h-20 bg-white rounded-xl flex items-center px-4">
                            <p className="font-extrabold text-2xl text-[#052759]">
                                Local com maior interesse de feiras
                            </p>
                        </div>

                        <div className="grid grid-cols-2 h-20">
                            <div className="bg-white rounded-full mt-8 ml-6 w-40 h-10 flex items-center justify-center">
                                <p className="font-extrabold text-xl text-[#052759]">
                                    São Bernardo
                                </p>
                            </div>

                            <img className="w-40 ml-8 mt-[-35px]" src="img-cat-dash.png" />
                        </div>
                    </div>

                    {/* Card 3  para não me perder */}
                    <div className="w-full h-48 bg-[#052759] rounded-2xl drop-shadow-[0_20px_20px_rgb(0_0_20_/_0.70)]">
                        <div className="w-full h-20 bg-white rounded-xl flex items-center px-4">
                            <p className="font-extrabold text-2xl text-[#052759]">
                                Dia com maior movimentação de voluntários
                            </p>
                        </div>

                        <div className="grid grid-cols-2 h-20">
                            <div className="bg-white rounded-full mt-8 ml-6 w-40 h-10 flex items-center justify-center">
                                <p className="font-extrabold text-xl text-[#052759]">
                                    Sexta
                                </p>
                            </div>

                            <img className="w-32 ml-12 mt-[-28px]" src="img-voluntario-dash.png" />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

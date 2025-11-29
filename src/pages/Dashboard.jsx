import ChartCadastros from "./ChartCadastrosMensais";

export default function Dashboard() {

    return (
        <div>
            <div className="min-h-screen bg-[#ffffff] py-8 px-4 lg:px-8 relative overflow-hidden">

                <h1 className="text-5xl font-extrabold text-[#052759] flex ml-36 mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Painel de <br />
                    administração
                </h1>

                {/* Card 1 a fim de eu não me perder kkkkkkkkkkkkkk*/}
                <div className="max-w-7xl mx-auto mt-20 flex gap-20 justify-center">

                    <div className="w-96 h-48 bg-[#052759] rounded-2xl drop-shadow-[0_20px_20px_rgb(0_0_20_/_0.70)] ">
                        <div className="w-96 h-20 bg-white rounded-xl items-center flex justify-start">
                            <p className="font-extrabold text-2xl ml-4 text-[#052759]">
                                Mês com maior interesse <br /> na feira
                            </p>
                        </div>

                        < div className="w-96 h-20 grid grid-cols-2">
                            <div className="w-40 h-10 bg-white rounded-full mt-8 ml-6 items-center flex justify-center">
                                <p className="text-center font-extrabold text-xl text-[#052759]">
                                    Outubro
                                </p>
                            </div>

                            <img className="w-48 mt-[-36px]"
                                src="img-dog-dash.png" />
                        </div>

                    </div>

                    {/* Card 2 a fim de eu não me perder 2 kkkkkkkkkkkkkk*/}

                    <div className="w-96 h-48 bg-[#052759] rounded-2xl drop-shadow-[0_20px_20px_rgb(0_0_20_/_0.70)] ">
                        <div className="w-96 h-20 bg-white rounded-xl items-center flex justify-start">
                            <p className="font-extrabold text-2xl ml-4 text-[#052759]">
                                Local com maior interesse de feiras
                            </p>
                        </div>

                        < div className="w-96 h-20 grid grid-cols-2">
                            <div className="w-40 h-10 bg-white rounded-full mt-8 ml-6 items-center flex justify-center">
                                <p className="text-center font-extrabold text-xl text-[#052759]">
                                    São bernardo
                                </p>
                            </div>

                            <img className="w-40 ml-8 mt-[-35px]"
                                src="img-cat-dash.png" />
                        </div>

                    </div>

                    {/* Card 3 a fim de eu não me perder 3 kkkkkkkkkkkkkk*/}

                    <div className="w-96 h-48 bg-[#052759] rounded-2xl drop-shadow-[0_20px_20px_rgb(0_0_20_/_0.70)] ">
                        <div className="w-96 h-20 bg-white rounded-xl items-center flex justify-start">
                            <p className="font-extrabold text-2xl ml-4 text-[#052759]">
                                Dia com maior movimentação de voluntários
                            </p>
                        </div>

                        < div className="w-96 h-20 grid grid-cols-2">
                            <div className="w-40 h-10 bg-white rounded-full mt-8 ml-6 items-center flex justify-center">
                                <p className="text-center font-extrabold text-xl text-[#052759]">
                                    Sexta
                                </p>
                            </div>

                            <img className="w-32 ml-12 mt-[-28px]"
                                src="img-voluntario-dash.png" />
                        </div>

                    </div>

                </div>

                <div className="w-10/12 h-[750px] bg-[#052759] rounded-2xl drop-shadow-[0_10px_20px_rgb(0_0_20_/_1)] mx-auto mt-20">
                    <div className="w-full h-36 bg-white rounded-2xl flex items-center">
                        <p className="font-extrabold text-4xl ml-10  text-[#052759]">
                            Volume de cadastros mensal</p>
                    </div>
                    <div>


                        <div className="h-full flex justify-end">
                            <img className="h-[400px] flex justify-end mt-20"
                                src="img-dog2-dash.png"
                            />
                        </div>

                        {/* Uso da lib ApexCharts (Recomendação do Pedro :)) )*/}
                        <ChartCadastros />
                        
                    </div>
                </div>

            </div>




        </div>
    )
}
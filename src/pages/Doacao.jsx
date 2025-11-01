import NavbarSite from '../layouts/Navbar'

// export function Doacao({ onNavigateToLogin, onNavigateToCadastro }) {

export function Doacao() {
    return (
        // Wrapper principal da página
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {/* <NavbarSite
                onNavigateToLogin={onNavigateToLogin}
                onNavigateToCadastro={onNavigateToCadastro}
            /> */}

            {/* Container principal do conteúdo */}
            <main className="container bg-gray-100 mx-auto px-4 py-12">

                {/* === Seção 1: Cabeçalho "Doação" === */}
                <header className="text-center mb-2">
                    <h3 className="text-4xl font-bold text-[#052759] mb-2">Doação</h3>
                    <p className="text-lg text-gray-600">Realize uma doação para ajudar a instituição com nossos "aumigos"</p>
                </header>

                {/* === Seção 2: Card Principal "Quero doar livremente!" === */}
                <section className="bg-white rounded-2xl shadow-lg mx-auto p-8 mb-16">
                    <h4 className="text-3xl font-bold text-center mb-8">Quero doar livremente!</h4>

                    <div className="flex flex-col md:flex-row gap-40 items-center justify-center items-center">

                        {/* Coluna da Esquerda: Formulário de Doação */}
                        <div className="md:w-2/5 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Valor a ser doado</label>
                                <div className="bg-[#052759] text-white text-2xl font-bold p-3 rounded-lg">
                                    {/* IMAGEM CORRIGIDA AQUI */}
                                    <img src="/icons/iconDindin.png" alt="Imagem icone de dinheiro" className="inline-block mr-2" /> R$ 50,00
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Satisfação:</label>
                                <div className="flex space-x-2 text-4xl">
                                    {/* IMAGENS CORRIGIDAS AQUI (5x) */}
                                    <span><img src="../icons/iconDogHeart.png" alt="" /></span>
                                    <span><img src="../icons/iconDogHeart.png" alt="" /></span>
                                    <span><img src="../icons/iconDogHeart.png" alt="" /></span>
                                    <span><img src="../icons/iconDogHeart.png" alt="" /></span>
                                    <span><img src="../icons/iconDogHeart.png" alt="" /></span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">** observação: R$50,00 compra um(1)saco para aproximadamente 15 cães**</p>
                            </div>

                            {/* Caixa de Informação do PIX */}
                            <div className="bg-[#052759] text-white p-4 rounded-lg flex items-center gap-4">
                                <div className="bg-white text-[#052759] p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold">Realize o PIX para chave da ONG</p>
                                    <p className="font-mono text-sm">Chave: 8242ejwjd32847aisf</p>
                                </div>
                            </div>

                            {/* Botão de Outras Maneiras */}
                            <button className='w-full bg-[#052759] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors'>
                                Veja outras maneiras de doar abaixo
                            </button>
                        </div>

                        {/* Coluna da Direita: Imagem do Gato */}
                        <div className="md:w-1/3">
                            {/* IMAGEM CORRIGIDA AQUI */}
                            <img className="w-full h-auto object-cover" src="/photos/cat-racao.png" alt="Gato em uma tigela de ração" />
                        </div>
                    </div>
                </section>

                {/* === Seção 3: "Outras maneiras de ajudar" === */}
                <section className="bg-gradient-to-b from-white from-50% to-[#052759] to-50%
                  rounded-2xl p-8
                  shadow-red-700
                  ">
                    <h4 className="text-4xl font-bold text-[#052759] text-center mb-16">Outras maneiras de ajudar</h4>

                    {/* Grid com os 3 cards */}
                    <div className="grid md:grid-cols-3 gap-x-8 gap-y-20">

                        {/* Card 1: Patrocinador */}
                        <div className="relative pt-12">
                            <div className="absolute top-12 bottom-4 left-0 w-11/12 bg-[#052759] rounded-2xl -z-10"></div>
                            <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center z-10 mx-6">
                                {/* IMAGEM CORRIGIDA AQUI */}
                                <img className="w-32 h-32 object-contain mx-auto -mt-20 mb-4" src="/photos/cad-img01.png" alt="Patrocinador" />
                                <h6 className="text-xl font-bold mb-2">Patrocinador</h6>
                                <p className="text-sm text-gray-600 mb-6 h-24">
                                    Ajude a cuidar de mais de 100 pets que precisam de abrigo, alimento e amor. Sua contribuição garante vacinas, remédios e esperança.
                                </p>
                                <button className='bg-[#052759] text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors'>
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                        {/* Card 2: Doador */}
                        <div className="relative pt-12">
                            <div className="absolute top-12 bottom-4 left-0 w-11/12 bg-[#052759] rounded-2xl -z-10"></div>
                            <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center z-10 mx-6">
                                {/* IMAGEM CORRIGIDA AQUI */}
                                <img className="w-32 h-32 object-contain mx-auto -mt-20 mb-4" src="/photos/cad-img02.png" alt="Doador" />
                                <h6 className="text-xl font-bold mb-2">Doador</h6>
                                <p className="text-sm text-gray-600 mb-6 h-24">
                                    Cada doação ajuda nossos pets a terem comida, cuidados e um lar seguro. Com pouco, você pode levar muito amor e esperança para quem mais precisa.
                                </p>
                                <button className='bg-[#052759] text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors'>
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                        {/* Card 3: Voluntariado */}
                        <div className="relative pt-12">
                            <div className="absolute top-12 bottom-4 right-0 w-11/12 bg-[#052759] rounded-2xl -z-10"></div>
                            <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center z-10 mx-6">
                                {/* IMAGEM CORRIGIDA AQUI */}
                                <img className="w-32 h-32 object-contain mx-auto -mt-20 mb-4" src="/photos/cad-img03.png" alt="Voluntariado" />
                                <h6 className="text-xl font-bold mb-2">Voluntariado</h6>
                                <p className="text-sm text-gray-600 mb-6 h-24">
                                    Doe um pouco do seu tempo e o fruto do seu amor aos nossos pets. Ajude com os cuidados, limpeza, eventos e na rotina do abrigo.
                                </p>
                                <button className='bg-[#052759] text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors'>
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            {/* === Seção 4: Imagem do Focinho === */}
            <section className=' flex justify-center pr-40 pl-40'>
                {/* IMAGEM CORRIGIDA AQUI */}
                <img src="/photos/dog-fucinho.png" alt="Focinho de cachorro" className="" />
            </section>
        </div>
    )
}
import { useState, useEffect } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { FaRegClock, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { FaRegBell, FaUser, FaSignInAlt, FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const primaryBlue = '#052759';
  const primaryYellow = '#FCAD0B';


  const navItems = [
    { name: 'SOBRE', active: false },
    { name: 'FEIRAS DE ADOÇÃO', active: false },
    { name: 'DOAÇÃO', active: false },
    { name: 'VOLUNTARIADO', active: false },
    { name: 'CADASTROS', active: true },
    { name: 'PATROCINADORES', active: false },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center h-20 px-4 lg:px-12" style={{ backgroundColor: primaryBlue }}>

       
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full" style={{ backgroundColor: primaryYellow }}>
            <FaHeart className="text-xl" style={{ color: primaryBlue }} />
          </div>
        </div>

       
        <nav className="hidden md:flex flex-grow justify-start ml-12 space-x-8 h-full items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase().replace(/ /g, '-')}`}
              className={`h-full flex items-center text-sm font-bold transition-colors ${item.active
                  ? `text-white border-b-4 border-white`
                  : `text-white hover:text-gray-300`
                }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

       
        <div className="flex items-center space-x-4">
          <button className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <FaRegBell className="text-xl" />
          </button>
          <button className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute w-6 h-6 rounded-full" style={{ backgroundColor: primaryYellow }}></div>
              <FaUser className="text-base relative z-10" style={{ color: primaryBlue }} />
            </div>
          </button>
          <button className="p-3 rounded-md transition-colors" style={{ backgroundColor: primaryYellow, color: primaryBlue }}>
            <FaSignInAlt className="text-xl font-bold" />
          </button>
        </div>
      </div>
    </header>
  );
};


function CalendarioStyles() {
  return (
    <style>{`
      .flatpickr-calendar {
        background-color: white; 
        border-radius: 8px;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
        border: none; 
        width: 75%;
        max-width: none;
        position: relative !important;
        transform: none !important;
        padding: 0;
        margin: 0;
      }
      .flatpickr-months {
        background-color: #052759;
        border-radius: 8px 8px 0 0;
        padding: 6px 0;
        display: flex; 
        justify-content: space-between;
        align-items: center;
      }
      .flatpickr-current-month,
      .flatpickr-current-month span {
        color: white !important;
      }
      .flatpickr-day {
        color: #052759;
        font-weight: 600;
        padding: 0;
      }
      .flatpickr-day:hover, .flatpickr-day:focus {
        background: #FCAD0B;
        color: white;
        border-radius: 50%;
        border: none;
      }
      .flatpickr-day.selected {
        background: #052759;
        color: white;
        border-radius: 50%;
        border: none;
      }
      .flatpickr-day.today {
        border: 1px solid #052759;
        border-radius: 50%;
        color: #052759;
      }
    `}</style>
  );
}


const IconInput = ({ icon: Icon, placeholder, value, onChange, type = 'text', rows = 1, id }) => {
  const primaryBlue = '#052759';

  return (
    <div className={`flex items-start border border-[${primaryBlue}] rounded-lg bg-white overflow-hidden`}>
      <span className={`p-3 text-[${primaryBlue}] flex-shrink-0 ${rows > 1 ? 'self-start' : 'self-center'}`}>
        <Icon className="text-xl" />
      </span>

      {rows > 1 ? (
        <textarea
          id={id}
          name={id}  
          placeholder={placeholder}
          rows={rows}
          className={`w-full h-full pr-3 py-3 text-sm text-[${primaryBlue}] rounded-r-lg focus:outline-none resize-none placeholder-[${primaryBlue}] font-medium pl-3`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={id} 
          placeholder={placeholder}
          className={`w-full pr-3 py-3 text-sm text-[${primaryBlue}] rounded-r-lg focus:outline-none placeholder-[${primaryBlue}] font-medium pl-3`}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};


export default function CadastroFeiraAdocao() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    horaEvento: '14:00 às 18:00',
    dataHoraEvento: '17/09/2025',
    localizacao: '',
    mensagem: '',
  });

  const [selectedDates, setSelectedDates] = useState(["17/09/2025"]);

  useEffect(() => {
    const fp = flatpickr("#calendario-container", {
      locale: Portuguese,
      dateFormat: "d/m/Y",
      minDate: "today",
      inline: true,
      disableMobile: true,
      mode: "multiple",
      defaultDate: ["2025-09-17"],
      onChange: (selectedDatesArr) => {
        setSelectedDates(selectedDatesArr.map(date => flatpickr.formatDate(date, "d/m/Y")));
        setFormData(prev => ({ ...prev, dataHoraEvento: selectedDatesArr.length > 0 ? flatpickr.formatDate(selectedDatesArr[0], "d/m/Y") : '' }));
      },
    });

    return () => fp.destroy();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da Feira de Adoção:', formData);
    console.log('Datas selecionadas:', selectedDates);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-0 pb-20" style={{ backgroundColor: '#F0F0F0' }}>
      <CalendarioStyles />


      <div className="flex flex-col items-center pt-8 px-4">
        <h1 className="text-3xl font-black mb-3 text-center text-[#052759]">
          Cadastrar Feira de Adoção
        </h1>
        <h2 className="text-base font-bold mb-6 text-center text-[#0c3779]">
          Cadastre aqui as Feiras de Adoção que irão ocorrer nos próximos dias!
        </h2>
      </div>


<div
  className="w-11/12 max-w-5xl p-8 lg:p-12 bg-white rounded-xl shadow-md border border-gray-100 relative z-10"
  style={{ paddingBottom: '10rem'}} 
>        
        <h2 className="text-2xl font-bold text-[#052759] mb-8 text-center">
          Informações sobre a Feira de Adoção
        </h2>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">

          <div className="flex flex-col gap-6 min-h-[300px]">
            <IconInput
              icon={FaRegClock}
              placeholder="Hora do evento: 14:00 às 18:00"
              value={formData.horaEvento}
              onChange={handleChange}
              id="horaEvento"
            />
            <div className="flex items-center border border-[#052759] rounded-lg bg-white overflow-hidden">
              <span className="p-3 text-[#052759] flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt className="text-xl" />
              </span>
              <input
                type="text"
                name="dataHoraEvento"
                placeholder="Data/Hora do evento:"
                value={formData.dataHoraEvento}
                readOnly
                className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3"
              />
              <span className="p-3 text-[#052759] flex-shrink-0 flex items-center justify-center cursor-pointer">
                <span className="text-sm">▼</span>
              </span>
            </div>
            <div id="calendario-container" className="w-full border border-gray-200 rounded-xl " />
          </div>


          <div className="flex flex-col gap-6">
            <IconInput
              icon={FaMapMarkerAlt}
              placeholder="Localização da feira:"
              value={formData.localizacao}
              onChange={handleChange}
              rows={8}
              id="localizacao"
            />
            <IconInput
              icon={FaEnvelope}
              placeholder="Mensagem:"
              value={formData.mensagem}
              onChange={handleChange}
              rows={8}
              id="mensagem"
            />
            <button
              onClick={() => navigate("/")}
              type="submit"
              className="mt-4 w-full bg-[#052759] text-lg text-white font-bold py-3 rounded-lg hover:bg-[#023582] transition-colors shadow-md"
            >
              Cadastrar Feira
            </button>


          </div>
        </form>

        <img
          src="/img-cadastro.png"
          alt="Cachorrinho olhando para cima"
          className="absolute bottom-0 left-0 object-contain z-0 pointer-events-none"
          style={{
            width: '320px',
            maxHeight: '290px'
          }}
        />
      </div>



    </div>
  );
}

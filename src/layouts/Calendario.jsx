export default function Calendario() {

    return (
        // Estilização da bilbioteca flatpickr para o calendário
        // TODO: estudar melhor a forma de utilizar a biblioteca para melhorias
        <style>
            {`
                .flatpickr-calendar {
                    background-color: #EFEFEF;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border: 2px solid #052759;
                }

                .flatpickr-day{
                    color: #052759;
                    font-weight: 600;
                }

                .flatpicker-day:hover {
                    background: #FCAD0B;
                    color: white;
                    border: 2px solid #FCAD0B;
                }

                .flatpickr-day.selected {
                    background: #052759;
                    color: white;
                }
                
                .flatpickr-day.selected:hover {
                    background: #FCAD0B;
                    color: white;
                    border: 2px solid #FCAD0B;
                }

                .flatpickr-day.today {
                    border: 2px solid #052759;
                    color: #052759;
                }

                .flatpickr-day.today.selected {
                    background: #052759;
                    color: white;
                }
                
                .flatpickr-day.today:hover {
                    background: #FCAD0B;
                    color: white;
                    border: 2px solid #FCAD0B;
                }

                .flatpickr-months .flatpickr-month {
                    color: #052759;
                    font-weight: 800;
                }

                span.flatpickr-weekday {
                    color: #052759;
                    font-weight: 800;
                }

                `}
        </style>
    )

}
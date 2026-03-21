import { useEffect, useState } from "react";
import { loadDashboardKpis } from "../services/dashboardService";
import { formatMonth } from "../utils/dateFormatter";

export default function useDashboard() {
    const [monthInterest, setMonthInterest] = useState("-");
    const [locationInterest, setLocationInterest] = useState("-");
    const [volunteerDay, setVolunteerDay] = useState("-");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await loadDashboardKpis();

                setMonthInterest(formatMonth(data.monthInterest));
                setLocationInterest(data.locationInterest);
                setVolunteerDay(data.volunteerDay);
            } catch (err) {
                console.error("Erro carregando KPIs:", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return {
        monthInterest,
        locationInterest,
        volunteerDay,
        loading,
    };
}

import { api } from "../../../api/apiUserService";

export async function loadDashboardKpis() {
    try {
        const [monthResp, locationResp, volunteerResp] = await Promise.all([
            api.get(`dashboard/month-most-interest`),
            api.get(`dashboard/location-most-interest`),
            api.get(`dashboard/day-most-volunteers`),
        ]);

        return {
            monthInterest: monthResp.data?.label,
            locationInterest: locationResp.data?.label || "-",
            volunteerDay: volunteerResp.data?.day || "-",
        };
    } catch (err) {
        console.error("Erro carregando KPIs:", err);
        throw err;
    }
}

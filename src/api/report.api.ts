import http from '@root/utils/axiosConfig';
import { ApiResponse, TPostReport, TReportDto } from '@type/T-type';

export class ReportApi {
    static async report(body: TPostReport): Promise<ApiResponse<TReportDto>> {
        try {
            const response = await http.post('/reports/report-user', body);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async get(): Promise<ApiResponse<TReportDto[]>> {
        try {
            const response = await http.get('/reports');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async ban(reportId: number, reportedUserId: number): Promise<ApiResponse<TReportDto[]>> {
        try {
            const response = await http.put('/reports/ban-user', {
                reportId: reportId,
                reportedUserId: reportedUserId
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async markAsSolved(reportId: number): Promise<ApiResponse<TReportDto[]>> {
        try {
            const response = await http.put(`/reports/${reportId}/mark-as-solved`, {
                reportId: reportId,
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
import moment from 'moment';
import { format } from 'date-fns';
import { TQuestionDto, TResultDto, TUserAnswerDto } from '@type/T-type';
export class Helper {
    static validateEmail(email: string): boolean {
        if (email === '') return false;
        const emailPattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(email.toLowerCase());
    }

    static validatePassword(password: string): boolean {
        if (password === '') return false;
        return password.length > 5;
    }

    static calculateTimeAgo(inputDateString: string): string {
        const inputDate = moment(inputDateString, 'DD-MM-YYYY HH:mm:ss');
        const now = moment();
        const timeAgoInMinutes = now.diff(inputDate, 'minutes');

        if (timeAgoInMinutes < 1) {
            return 'now';
        } else if (timeAgoInMinutes < 60) {
            return timeAgoInMinutes + 'm';
        } else if (timeAgoInMinutes < 24 * 60) {
            const hours = Math.floor(timeAgoInMinutes / 60);
            return hours + 'h';
        } else if (timeAgoInMinutes < 30 * 24 * 60) {
            const days = Math.floor(timeAgoInMinutes / (24 * 60));
            return days + 'd';
        } else if (timeAgoInMinutes < 12 * 30 * 24 * 60) {
            const months = Math.floor(timeAgoInMinutes / (30 * 24 * 60));
            return months + 'mo';
        } else {
            const years = Math.floor(timeAgoInMinutes / (12 * 30 * 24 * 60));
            return years + 'y';
        }
    }

    static formatDate = (dateString: string): string => {
        const inputDate = moment(dateString, 'DD-MM-YYYY HH:mm:ss');
        const today = moment();

        if (inputDate.isSame(today, 'day')) {
            return inputDate.format('h:mm A');
        }

        if (inputDate.isSame(today, 'month') && inputDate.isSame(today, 'year')) {
            return inputDate.format('D MMM [at] h:mm A');
        }

        if (inputDate.isSame(today, 'year')) {
            return inputDate.format('D MMMM [at] h:mm A');
        }

        return inputDate.format('D MMMM YYYY [at] h:mm A');
    };

    static formatReportDate(inputString: string): string {
        const inputDate = moment(inputString, 'DD-MM-YYYY HH:mm:ss');
        return inputDate.format('D MMMM YYYY [at] h:mm A');
    }

    static generateRoomPassword(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        while (password.length < 6) {
            const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
            if (!password.includes(randomChar)) {
                password += randomChar;
            }
        }
        return password;
    }

    static formatDateTime(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    static evaluateTest(questions: TQuestionDto[], userAnswers: TUserAnswerDto[]): TResultDto[] {
        return userAnswers.map(answer => {
            const question = questions.find(q => q.question_id === answer.question_id);
            if (!question) {
                throw new Error(`Question with ID ${answer.question_id} not found.`);
            }
            const selectedOption = question.options.find(opt => opt.option_id === answer.selected_option_id);
            if (!selectedOption) {
                throw new Error(`Option with ID ${answer.selected_option_id} not found.`);
            }
            return {
                question_id: answer.question_id,
                correct: selectedOption.is_correct
            };
        });
    };
}

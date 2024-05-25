import moment from 'moment';
export class Helper {
  static validateEmail(email: string): boolean {
    if (email === '') return false;
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  };

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
}
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
}
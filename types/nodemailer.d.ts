declare module 'nodemailer' {
  export function createTransport(options: any): any;
  export function createTestAccount(): Promise<any>;
  // Add other functions/types you use
}
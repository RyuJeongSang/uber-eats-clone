export class MailModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

export interface EmailVar {
  key: string;
  value: string;
}

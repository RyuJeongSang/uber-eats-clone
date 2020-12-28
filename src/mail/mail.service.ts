import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    to: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `Email verify <mailgun@${this.options.domain}>`);
    form.append('to', to);
    form.append('subject', subject);
    form.append('template', template);
    form.append('v:code', 'whatever');
    form.append('v:username', 'test-user');
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      'Verify Your Email',
      'sang47527422@gmail.com',
      'verify-email',
      [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
    );
  }
}
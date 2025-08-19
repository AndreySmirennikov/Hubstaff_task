import Imap from 'imap';
import { simpleParser, ParsedMail } from 'mailparser';

interface EmailInfo {
  to: string | undefined;
  subject: string | undefined;
  date: Date | undefined;
  raw: string;
}

class GmailHelper {
  private email: string;
  private password: string;
  private imap: Imap | null;

  constructor() {
    this.email = 'hubstafftestemail@gmail.com';
    this.password = 'lmxb yteu zgtz zdcm'; // App password for hubStaffTest
    this.imap = null;
  }

  /**
   * Creates a unique Gmail plus-address for a test run.
   */
  createTempEmail(): string {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${this.email.split('@')[0]}+${randomNumber}@${this.email.split('@')[1]}`;
  }

  /**
   * Connects to the Gmail IMAP server.
   */
  async connect(): Promise<void> {
    if (this.imap && this.imap.state === 'authenticated') {
      return;
    }
    return new Promise((resolve, reject) => {
      if (!this.email || !this.password) {
        return reject(new Error('Email or password not configured.'));
      }
      this.imap = new Imap({
        user: this.email,
        password: this.password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
      });

      this.imap.once('ready', resolve);

      this.imap.once('error', (err: Error) => {
        console.error('[GMAIL-HELPER] Gmail IMAP connection error:', err);
        reject(err);
      });

      this.imap.connect();
    });
  }

  /**
   * Disconnects from the Gmail IMAP server.
   */
  disconnect(): void {
    if (this.imap) {
      this.imap.end();
      this.imap = null;
    }
  }

  /**
   * Polls the inbox for a Hubstaff confirmation email.
   */
  async waitForHubstaffEmail(recipient: string, timeout = 180000): Promise<string | null> {
    const start = Date.now();
    console.log(`[GMAIL-HELPER] Waiting for Hubstaff confirmation email for "${recipient}"...`);

    while (Date.now() - start < timeout) {
      const allEmails = await this.getAllEmails();

      const matchingEmails = allEmails.filter(
        e =>
          e.to?.toLowerCase() === recipient.toLowerCase() &&
          e.subject?.toLowerCase().includes('confirm your hubstaff account')
      );

      if (matchingEmails.length > 0) {
        console.log(`[GMAIL-HELPER] Found Hubstaff email.`);
        const email = matchingEmails.sort(
          (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
        )[0];

        const link = this.extractConfirmationLink(email.raw);
        if (link) {
          console.log('[GMAIL-HELPER] Successfully extracted confirmation link.');
          return link;
        } else {
          console.error(
            '[GMAIL-HELPER] ERROR: Could not extract confirmation link from the email content.'
          );
        }
      }

      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s before next poll
    }

    console.error(
      `[GMAIL-HELPER] TIMEOUT: Did not find a Hubstaff confirmation email for ${recipient} within ${timeout / 1000} seconds.`
    );
    return null;
  }

  /**
   * Fetches all emails from the INBOX.
   */
  private async getAllEmails(): Promise<EmailInfo[]> {
    return new Promise((resolve, reject) => {
      if (!this.imap) {
        return reject(new Error('IMAP not connected'));
      }
      this.imap.openBox('INBOX', true, (err, box) => {
        if (err) {
          console.error('[GMAIL-HELPER] Error opening INBOX:', err);
          return reject(err);
        }

        if (box.messages.total === 0) {
          return resolve([]);
        }

        if (!this.imap) {
          return reject(new Error('IMAP disconnected during openBox'));
        }
        this.imap.search(['ALL'], (err, results) => {
          if (err) {
            console.error('[GMAIL-HELPER] IMAP search error:', err);
            return reject(err);
          }
          if (!results || results.length === 0) {
            return resolve([]);
          }

          if (!this.imap) {
            return reject(new Error('IMAP disconnected during search'));
          }

          const parsingPromises: Promise<EmailInfo | null>[] = [];
          const f = this.imap.fetch(results, { bodies: '' });

          f.on('message', msg => {
            const parsingPromise = new Promise<EmailInfo | null>(resolveParser => {
              let rawEmail = '';
              msg.on('body', stream => {
                stream.on('data', (chunk: Buffer) => (rawEmail += chunk.toString('utf8')));
              });
              msg.once('end', () => {
                simpleParser(rawEmail, (err: Error, parsed: ParsedMail) => {
                  if (err) {
                    console.error(`[GMAIL-HELPER] Error parsing email:`, err);
                    resolveParser(null);
                  } else {
                    let toAddress: string | undefined;
                    if (parsed.to) {
                      if (Array.isArray(parsed.to)) {
                        toAddress = parsed.to.map(t => t.text).join(', ');
                      } else {
                        toAddress = parsed.to.text;
                      }
                    }
                    resolveParser({
                      to: toAddress,
                      subject: parsed?.subject,
                      date: parsed?.date,
                      raw: rawEmail,
                    });
                  }
                });
              });
            });
            parsingPromises.push(parsingPromise);
          });

          f.once('error', (err: Error) => {
            console.error('[GMAIL-HELPER] Fetch error occurred:', err);
            reject(err);
          });

          f.once('end', () => {
            Promise.all(parsingPromises)
              .then(emails => {
                const validEmails = emails.filter((e): e is EmailInfo => e !== null);
                resolve(validEmails);
              })
              .catch(reject);
          });
        });
      });
    });
  }

  /**
   * Extracts a confirmation link from the raw email content using regex.
   */
  private extractConfirmationLink(rawEmail: string): string | null {
    const pattern =
      /href=3D"((https:\/\/account\.hubstaff\.com\/confirm_account\/[a-zA-Z0-9\-_=\s]+))"/;
    let match = rawEmail.match(pattern);

    if (match && match[1]) {
      return match[1].replace(/=\s/g, '').replace(/=3D/g, '=');
    }

    const plainTextPattern = /(https:\/\/account\.hubstaff\.com\/confirm_account\/[a-zA-Z0-9\-_]+)/;
    match = rawEmail.match(plainTextPattern);
    if (match && match[1]) {
      return match[1];
    }

    console.error('[GMAIL-HELPER] No confirmation link found.');
    return null;
  }
}

export default new GmailHelper();

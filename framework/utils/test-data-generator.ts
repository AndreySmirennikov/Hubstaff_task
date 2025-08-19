import { faker } from '@faker-js/faker';
import gmailHelper from './gmail-helper';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string | null;
  password: string;
  fullName: string;
}

class TestDataGenerator {
  constructor() {
    // Initialize faker with English locale for more realistic data
    // Note: setLocale is deprecated in newer faker versions
  }

  /**
   * Generate secure password
   */
  generatePassword(): string {
    return faker.internet.password({
      length: 12,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
      prefix: 'Test',
    });
  }

  /**
   * Generate data for test case TC #83
   */
  generateUserData(): UserData {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: gmailHelper.createTempEmail(),
      password: this.generatePassword(),
      fullName: 'John Doe',
    };
  }
}

export default TestDataGenerator;

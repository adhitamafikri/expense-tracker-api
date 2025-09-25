import { db } from '../../lib/drizzle';
import { categories } from '../schema';

export class CategorySeeder {
  static async seed() {
    return await db.insert(categories).values([
      { name: 'Food', type: 'expense' },
      { name: 'Transport', type: 'expense' },
      { name: 'Entertainment', type: 'expense' },
      { name: 'Bills', type: 'expense' },
      { name: 'Health', type: 'expense' },
      { name: 'Education', type: 'expense' },
      { name: 'Shopping', type: 'expense' },
      { name: 'Travel', type: 'expense' },
      { name: 'Other', type: 'expense' },
      { name: 'Salary', type: 'income' },
      { name: 'Deposit', type: 'income' },
      { name: 'Gift', type: 'income' },
    ]);
  }
}

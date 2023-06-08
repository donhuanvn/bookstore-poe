import { faker } from '@faker-js/faker';
import type { Book } from './types'

let totalBooksCount: number = faker.number.int({ min: 20, max: 40 })

const generateDumpBooks = (n: number) => {
  const userLists = [...Array(Math.round(totalBooksCount / 5))].map(() => faker.internet.email())
  return [...Array(n)].map(() => {
    return {
      id: faker.string.uuid(),
      creator: userLists[faker.number.int({ min: 0, max: totalBooksCount / 10 - 1 })],
      title: faker.commerce.productName(),
      price: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
      authors: [...Array(faker.number.int({ min: 1, max: 5 }))].map(() => faker.person.fullName()),
      description: faker.lorem.paragraph({ min: 10, max: 30 }),
      image: faker.image.urlLoremFlickr({ width: 512, height: 720, category: 'book' })
    }
  });
}

const generatedBooks: Book[] = generateDumpBooks(totalBooksCount)

export const fetchBookCount = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return totalBooksCount
}

export const fetchBooks = async (start: number, count: number) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return generatedBooks.slice(start, start + count)
}

export const fetchBook = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return generatedBooks.find(b => b.id === id)
}

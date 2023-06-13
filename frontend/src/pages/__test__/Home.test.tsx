import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithWrappers } from '../../util/tests-utils'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { initialBookState } from '../../store/book-slice'
import Home from '../Home'
import FuzzySearcher from '../../util/fuzzy-searcher'
import { faker } from '@faker-js/faker';

/* 
Docs:
  https://jestjs.io/docs/asynchronous
  https://jestjs.io/docs/timer-mocks
  https://dev.to/jbranchaud/test-timing-based-js-functions-with-jest-5be
*/

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// jest.useFakeTimers()
describe('Home', () => {
  const dumpBooks = [
    {
      id: 'a2007e26-fcc4-43d2-bf46-a17b01f7eafc',
      creator: 'creator_test@jest.com',
      title: 'The Ultimate Hitchhikers Guide: Five Complete Novels and One Story',
      price: 99.99,
      image: 'https://www.image.com/book1.png',
      authors: ['Test Jest', 'Jest Test'],
      description: 'Molestias voluptates mollitia nemo blanditiis distinctio eum mollitia iure nulla.'
    },
    {
      id: 'ef6d3b5f-1cca-4aad-8c6c-86c0d35731d1',
      creator: 'creator_test_2@jest.com',
      title: 'A Short History of Nearly Everything',
      price: 1000,
      image: 'https://www.image.com/book2.png',
      authors: ['Whitney Koch', 'Jacob Gerlach'],
      description: 'Minima dolorum voluptatem debitis rerum.'
    }
  ]

  const manyDumpBooks = [...Array(18)].map(() => {
    return {
      id: faker.string.uuid(),
      creator: '',
      title: faker.commerce.productName(),
      price: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
      image: 'https://www.image.com/book.png',
      authors: [],
      description: ''
    }
  })

  test('show all books correctly when no search', async () => {
    renderWithWrappers(<Home />, { preloadedState: { book: { ...initialBookState, loadedBooks: dumpBooks, totalAvailableCount: 2 } } })
    expect(screen.getByText(dumpBooks[0].title)).toBeVisible()
    expect(screen.getByText(/99\.99/i)).toBeVisible()
    expect(screen.getByText(dumpBooks[1].title)).toBeVisible()
    expect(screen.getByText(/1000/i)).toBeVisible()
    const imgBook1Element = screen.getByRole('img', { name: dumpBooks[0].title }) as HTMLImageElement
    expect(imgBook1Element.src).toBe('https://www.image.com/book1.png')
    const imgBook2Element = screen.getByRole('img', { name: dumpBooks[1].title }) as HTMLImageElement
    expect(imgBook2Element.src).toBe('https://www.image.com/book2.png')
  })

  test('allow to search and show books correctly with the search term', async () => {
    FuzzySearcher.cacheBookDataset(dumpBooks)
    renderWithWrappers(<Home />, { preloadedState: { book: { ...initialBookState, loadedBooks: dumpBooks, totalAvailableCount: 2 } } })
    const searchInput = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement
    await act(async () => {
      userEvent.type(searchInput, 'Ultimate') /* A part of title of the dumpBooks[0], not including in the dumpBooks[1] */
      await sleep(1000);
    })
    const bookItems = screen.queryAllByTestId('book-item')
    expect(bookItems.length).toBe(1)
    expect(screen.getByRole('heading', { name: dumpBooks[0].title }))
      .toBeInTheDocument()
  })

  test('the number of pages is correct and browsing work correctly', async () => {
    /* Note that: the hard-coded maximum number of book items per page is 12. */
    renderWithWrappers(<Home />, { preloadedState: { book: { ...initialBookState, loadedBooks: manyDumpBooks, totalAvailableCount: 18 } } })
    const btnPage1 = screen.getByRole('button', { name: 'page 1' }) as HTMLButtonElement
    const btnPage2 = screen.getByRole('button', { name: 'Go to page 2' }) as HTMLButtonElement
    expect(btnPage1).toBeInTheDocument()
    expect(btnPage2).toBeInTheDocument()
    await act(async () => {
      userEvent.click(btnPage2)
      // await sleep(500);
    })
    expect(screen.queryByRole('heading', { name: manyDumpBooks[0].title }))
      .not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: manyDumpBooks[17].title }))
      .toBeInTheDocument()
  })
})

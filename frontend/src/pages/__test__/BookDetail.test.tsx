import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithWrappers } from '../../util/tests-utils'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BookDetailPage } from '../BookDetail'
import { initialBookState } from '../../store/book-slice'

const mockedUsedNavigate = jest.fn() /* Exception: can not choose variable name like 'navigate', 'useMockedNagivate' */

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')), // since you still want to use the actual MemoryRouter
  useNavigate: () => mockedUsedNavigate,
}))

describe('BookDetail', () => {
  const dumpBook = {
    id: 'a2007e26-fcc4-43d2-bf46-a17b01f7eafc',
    creator: 'creator_test@jest.com',
    title: 'The Ultimate Hitchhikers Guide: Five Complete Novels and One Story',
    price: 99.99,
    image: 'https://www.image.com/book.png',
    authors: ['Test Jest', 'Jest Test'],
    description: 'Molestias voluptates mollitia nemo blanditiis distinctio eum mollitia iure nulla.'
  }

  test('should go back to homepage if no book was chosen', async () => {
    renderWithWrappers(<BookDetailPage />, { preloadedState: { book: initialBookState } })
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/')
  })

  test('present full information of the book', async () => {
    renderWithWrappers(<BookDetailPage />, { preloadedState: { book: { ...initialBookState, bookForShowDetail: dumpBook } } })
    expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/')
    expect(screen.getByText(/The Ultimate Hitchhikers Guide\: Five Complete Novels and One Story/i)).toBeVisible()
    expect(screen.getByText(/99\.99/i)).toBeVisible()
    expect(screen.getByText(/Test Jest, Jest Test/i)).toBeVisible()
    expect(screen.getByText(/Molestias voluptates mollitia nemo blanditiis distinctio eum mollitia iure nulla./i)).toBeVisible()
    // const imageElement = screen.getByAltText(/book image/i) as HTMLImageElement
    const imageElement = screen.getByRole('img', { name: 'illustration image' }) as HTMLImageElement
    expect(imageElement.src).toBe('https://www.image.com/book.png')
  })
})

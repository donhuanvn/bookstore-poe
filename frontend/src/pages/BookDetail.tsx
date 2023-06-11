import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Book } from '../types';

import { useLoaderData, json, defer, Await, Navigate, useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import BookDetail from '../components/BookDetail';
import supabase from '../supabase';


export function BookDetailPage() {
  const navigate = useNavigate()
  const book = useSelector<RootState, Book | null>(({ book }) => book.chosenBookForDetail)

  useEffect(() => {
    document.title = `Book Detail | ${book!.title}`

    if (!!!book) {
      navigate('/')
    }
  }, [])

  /* React Router need a little time to navigate. This line to prevent from unexpected errors. */
  if (!!!book) { return <></> }

  return (
    <BookDetail
      id={book.id}
      title={book.title}
      creator={book.creator}
      price={book.price}
      image={book.image}
      authors={book.authors}
      description={book.description}
    />
  )
}

export function BookDetailPageWithLoader() {
  const { book } = useLoaderData() as { book: any }

  useEffect(()=>{
    const setDocTitle = async () => {
      document.title = `Book Detail | ${(await book).title}`
    }
    setDocTitle()
  }, [])

  const fallback = <p style={{ textAlign: 'center' }}>Loading...</p>
  return (
    <>
      <Suspense fallback={fallback}>
        <Await resolve={book} errorElement={<Navigate to='/' replace={true} />}>
          {(loadedBook) =>
            <BookDetail
              id={loadedBook.id}
              title={loadedBook.title}
              creator={loadedBook.creator}
              price={loadedBook.price}
              image={loadedBook.image}
              authors={loadedBook.authors}
              description={loadedBook.description}
            />
          }
        </Await>
      </Suspense>
    </>
  )
}

const loadBookDetail = async (id: string) => {
  const { data, error } = await supabase
    .from('books')
    .select("*")
    .eq('id', id)

  if (error) {
    throw json({ message: 'Could not fetch book detail.' }, { status: 500 })
  }

  if (data.length === 0) {
    throw json({ message: 'Not found any book with such ID.' }, { status: 404 })
  }

  return data[0]
}

export const loader = async ({ request, params }: any) => {
  const id = params.bookId
  return defer({
    book: loadBookDetail(id)
  })
}

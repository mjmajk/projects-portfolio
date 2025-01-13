'use client';

import { useBooksQuery } from '../../generated/generated';

export default function Home() {
  const { data } = useBooksQuery();

  return (
    <div>
      {data?.books?.map((book) => (
        <div key={book?.author}>{book?.author}</div>
      ))}
    </div>
  );
}

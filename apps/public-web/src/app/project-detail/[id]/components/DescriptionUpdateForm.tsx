'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const DescriptionUpdateForm = ({
  defaultValue,
  id,
}: {
  defaultValue: string;
  id: number;
}) => {
  const [description, setDescription] = useState(defaultValue);
  const router = useRouter();

  const handleUpdate = () => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateDescription($description: String!, $id: Int!) {
            updateDescription(description: $description, id: $id) {
                id
                description
            }
          }
        `,
        variables: { description, id },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
      });
  };

  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-[2rem] h-40 p-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleUpdate}
        className="mt-4 w-full p-4 bg-blue-500 text-white rounded-lg"
      >
        Update Description
      </button>
    </div>
  );
};

'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="cursor-pointer">
      <ArrowLeft className="size-5" />
    </button>
  );
}

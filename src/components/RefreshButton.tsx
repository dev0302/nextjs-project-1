'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  RefreshCcw,
  Loader2,
} from 'lucide-react';

export default function RefreshButton() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {

    setLoading(true);

    router.refresh();

    // small delay so spinner is visible
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (

    <button
      onClick={handleRefresh}
      disabled={loading}
      className="
        border
        px-6
        py-2
        rounded-md
        cursor-pointer
        my-2
        bg-amber-50/5
        flex
        items-center
        justify-center
      "
    >

      {
        loading
          ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            )
          : (
              <RefreshCcw className="w-4 h-4" />
            )
      }

    </button>

  );
}
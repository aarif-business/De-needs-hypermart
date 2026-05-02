'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  src: string | null
  alt: string
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export function ProductImage({ src, alt, fill, sizes, className, priority }: Props) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-brand-yellow/10 gap-1">
        <div className="w-12 h-12 rounded-full bg-brand-yellow/30 flex items-center justify-center">
          <span className="text-brand-red font-black text-sm">DN</span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium truncate px-2 text-center">{alt}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}

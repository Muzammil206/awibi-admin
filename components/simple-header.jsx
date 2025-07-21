import Link from "next/link"
import Image from "next/image"

export function SimpleHeader() {
  return (
    <header className="w-full bg-white py-4">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
            
          <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
            <div>
              <span className="text-xl font-bold text-gray-900">Awibi</span>
              <div className="text-sm text-gray-600">Institute</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

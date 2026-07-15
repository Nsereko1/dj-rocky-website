import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation with Dropdown */}
      <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">DJ ROCKY</h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <DropdownMenu title="Menu">
                <DropdownItem href="#">Music</DropdownItem>
                <DropdownItem href="#">Videos</DropdownItem>
                <DropdownItem href="#">Gallery</DropdownItem>
                <DropdownItem href="#">Shop</DropdownItem>
                <DropdownItem href="#">Tour</DropdownItem>
                <DropdownItem href="#">Bio</DropdownItem>
              </DropdownMenu>
            </div>

            {/* Contact Number */}
            <div className="text-white">
              <span className="hidden md:inline">📞 Tyla (917) 920-2019</span>
              <span className="md:hidden">📞</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-screen w-full">
        <Image
          src="/artwork.jpg"
          alt="DJ Rocky"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Footer */}
      <footer className="bg-black text-white/70 py-8 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p>© 2026 Sony Music Entertainment. All Rights Reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="#" className="hover:text-white transition">Send Us Feedback</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">How We Use Your Data</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">Do Not Sell My Personal Information</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">Your California Privacy Rights</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">Terms and Conditions</a>
            </div>
            <div>
              <p>Built by <span className="text-purple-400">45PRESS</span></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Dropdown Component
function DropdownMenu({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button className="text-white hover:text-purple-400 transition font-medium">
        {title} ▼
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {children}
      </div>
    </div>
  );
}

function DropdownItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-white hover:bg-purple-600 hover:text-white transition first:rounded-t-lg last:rounded-b-lg"
    >
      {children}
    </a>
  );
}
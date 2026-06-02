export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#232323]">

      {/* Main footer grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#232323] border-b border-[#232323]">
        <div className="col-span-2 md:col-span-2 p-8 md:p-10">
          <div className="font-serif text-[#F0EDE6] text-4xl mb-2">
            My<span className="text-[#E8892A]">Choice</span>
          </div>
          <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-xs mt-3">
            Mumbai's exclusive showroom for electric, hardware & sanitary ware. Expert guidance. Trusted brands.
          </p>
        </div>

        <div className="p-8">
          <p className="text-label-sm text-[#7A7A7A] mb-5">Explore</p>
          <div className="flex flex-col gap-3">
            {['#products:Products', '#arrivals:New Arrivals', '#trust:Our Story', '#faq:FAQs'].map(item => {
              const [href, label] = item.split(':')
              return (
                <a key={href} href={href}
                  className="text-sm text-[#7A7A7A] hover:text-[#F0EDE6] transition-colors">{label}</a>
              )
            })}
          </div>
        </div>

        <div className="p-8">
          <p className="text-label-sm text-[#7A7A7A] mb-5">Services</p>
          <div className="flex flex-col gap-3">
            {['#booking:Book 1:1', '#workers:Workers', '#products:Get a Quote', '#contact:Find Us'].map(item => {
              const [href, label] = item.split(':')
              return (
                <a key={href} href={href}
                  className="text-sm text-[#7A7A7A] hover:text-[#F0EDE6] transition-colors">{label}</a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-label-sm text-[#3A3A3A]">© {year} MyChoice Electric & Hardware. Mumbai.</p>
        <p className="text-label-sm text-[#3A3A3A]">Built with intention.</p>
      </div>
    </footer>
  )
}

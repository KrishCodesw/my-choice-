export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0f1923] border-t border-[#b87333]/20 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="font-playfair text-3xl font-bold text-[#f7f3ec] tracking-wide mb-2">
            My<span className="text-[#b87333]">Choice</span>
          </div>
          <p className="font-cormorant italic text-[#8899aa] text-lg mb-6">
            Mumbai's exclusive showroom for electric, hardware & sanitary ware.
          </p>
          <p className="text-[#8899aa] text-sm leading-relaxed">
            Expert guidance. Trusted brands. Verified professionals.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[2px] uppercase text-[#b87333] font-medium mb-5">Explore</h4>
          <ul className="space-y-3">
            {['#products:Products', '#arrivals:New Arrivals', '#trust:Our Story', '#faq:FAQs', '#workers:Workers'].map(item => {
              const [href, label] = item.split(':')
              return (
                <li key={href}>
                  <a href={href} className="text-sm text-[#8899aa] hover:text-[#d4956a] transition-colors">{label}</a>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[2px] uppercase text-[#b87333] font-medium mb-5">Connect</h4>
          <ul className="space-y-3">
            {['#booking:Book 1:1', '#workers:Request a Worker', '#contact:Find the Store', '#products:Get a Quote'].map(item => {
              const [href, label] = item.split(':')
              return (
                <li key={href}>
                  <a href={href} className="text-sm text-[#8899aa] hover:text-[#d4956a] transition-colors">{label}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#b87333]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#8899aa]">© {year} MyChoice Electric & Hardware. Mumbai.</p>
        <p className="text-xs text-[#8899aa]">Built with precision.</p>
      </div>
    </footer>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#1C2B1A] border-t border-[#2E3D2C]">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#2E3D2C] border-b border-[#2E3D2C]">
        <div className="col-span-2 p-8 md:p-10">
          <div className="font-fraunces text-[#F4F4F0] text-4xl mb-3">
            My<em className="text-[#3D6B45]">Choice</em>
          </div>
          <p className="text-sm text-[#8A8A7A] leading-relaxed max-w-xs">
            Mumbai's exclusive showroom for electric, hardware & sanitary ware. Expert guidance. Trusted brands.
          </p>
        </div>
        <div className="p-8">
          <p className="label-sm text-[#8A8A7A] mb-5">Explore</p>
          <div className="flex flex-col gap-3">
            {['#products:Products','#arrivals:New Arrivals','#trust:Our Story','#faq:FAQs'].map(item => {
              const [href, label] = item.split(':')
              return <a key={href} href={href} className="text-sm text-[#8A8A7A] hover:text-[#F4F4F0] transition-colors">{label}</a>
            })}
          </div>
        </div>
        <div className="p-8">
          <p className="label-sm text-[#8A8A7A] mb-5">Services</p>
          <div className="flex flex-col gap-3">
            {['#booking:Book 1:1','#workers:Workers Network','#products:Get a Quote','#contact:Find Us'].map(item => {
              const [href, label] = item.split(':')
              return <a key={href} href={href} className="text-sm text-[#8A8A7A] hover:text-[#F4F4F0] transition-colors">{label}</a>
            })}
          </div>
        </div>
      </div>
      <div className="px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="label-sm text-[#2E3D2C]">© {year} MyChoice Electric & Hardware. Mumbai.</p>
        <p className="label-sm text-[#2E3D2C]">Built with intention.</p>
      </div>
    </footer>
  )
}

const footerLinks = {
  explore: [
    { href: '#products', label: 'Products'     },
    { href: '#arrivals', label: 'New Arrivals'  },
    { href: '#trust',    label: 'Our Story'     },
    { href: '#faq',      label: 'FAQs'          },
  ],
  services: [
    { href: '#booking',  label: 'Book 1:1'          },
    { href: '#workers',  label: 'Workers Network'   },
    { href: '#products', label: 'Get a Quote'       },
    { href: '#contact',  label: 'Find Us'           },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#1C2B1A] border-t border-[#2E3D2C]">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#2E3D2C] border-b border-[#2E3D2C]">

        {/* Brand */}
        <div className="col-span-2 p-8 md:p-10">
          <div className="font-fraunces text-[#F4F4F0] text-4xl mb-3">
            My<em className="text-[#3D6B45]">Choice</em>
          </div>
          <p className="text-sm text-[#8A8A7A] leading-relaxed max-w-xs">
            Mumbai's exclusive showroom for electric, hardware &amp; sanitary ware.
            Expert guidance. Trusted brands.
          </p>
        </div>

        {/* Explore */}
        <div className="p-8">
          <p className="label-sm text-[#8A8A7A] mb-5">Explore</p>
          <div className="flex flex-col gap-3">
            {footerLinks.explore.map(l => (
              <a
                key={l.href + l.label}
                href={l.href}
                className="text-sm text-[#8A8A7A] hover:text-[#F4F4F0] transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="p-8">
          <p className="label-sm text-[#8A8A7A] mb-5">Services</p>
          <div className="flex flex-col gap-3">
            {footerLinks.services.map(l => (
              <a
                key={l.href + l.label}
                href={l.href}
                className="text-sm text-[#8A8A7A] hover:text-[#F4F4F0] transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="label-sm text-[#2E3D2C]">
          © {year} MyChoice Electric &amp; Hardware. Mumbai.
        </p>
        <p className="label-sm text-[#2E3D2C]">Built with intention.</p>
      </div>
    </footer>
  )
}

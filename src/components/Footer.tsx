export default function Footer() {
  const footerLinks = {
    product: [
      { name: "How It Works", href: "#how-it-works" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Security", href: "#security" }
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Press", href: "#press" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact", href: "#contact" },
      { name: "Creator Resources", href: "#resources" },
      { name: "Brand Guide", href: "#guide" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Escrow Terms", href: "#escrow" }
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">Moni</span>
              <span className="text-highlight">-Fest</span>
            </div>
            <p className="text-sm opacity-75 mb-4">
              Powering the creator economy, one micro-collaboration at a time.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm font-medium">
                T
              </div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm font-medium">
                L
              </div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-sm font-medium">
                I
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
            <div>© 2025 Moni-Fest. All rights reserved.</div>
            <div className="mt-4 md:mt-0">
              Moni-Fest — powering the creator economy, one micro-collaboration at a time.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
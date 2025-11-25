import { MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary py-16" id="contacto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-black text-lg">BH</span>
              </div>
              <span className="font-black text-xl text-foreground">
                Burger<span className="text-primary"> House</span>
              </span>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="text-lg">🔥</span> Burger, pizzas, lomos y panchos al paso
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                Av. El Libertador, al lado de Tiki Drinks
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                Todas las noches a partir de las 19hs
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menú
                </a>
              </li>
              <li>
                <a href="#especiales" className="text-muted-foreground hover:text-primary transition-colors">
                  Especiales
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Contact - WhatsApp */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-4">Contáctanos</h3>
            <a
              href="https://wa.me/5491112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar mensaje
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">©2025 Burger House. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

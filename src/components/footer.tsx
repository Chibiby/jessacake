import Link from "next/link";
import { Cake, MapPin, Clock, Phone, Mail, Facebook } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-rose-faint">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cake className="h-5 w-5 text-rose" />
              <span
                className="text-lg font-bold text-rose"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Jessa Cakes
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {BUSINESS.tagline}. Handcrafted cakes for every celebration since
              2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/cakes"
                  className="text-muted-foreground hover:text-rose transition-colors"
                >
                  Our Cakes
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-muted-foreground hover:text-rose transition-colors"
                >
                  Order Now
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-rose transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-rose transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-rose" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-rose" />
                <span>{BUSINESS.operatingHours}</span>
              </li>
              {BUSINESS.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-rose" />
                  <span>{BUSINESS.phone}</span>
                </li>
              )}
              {BUSINESS.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-rose" />
                  <span>{BUSINESS.email}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Follow Us
            </h3>
            <div className="space-y-2">
              {BUSINESS.socialFacebook && (
                <Link
                  href={BUSINESS.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-rose transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Link>
              )}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Follow us for updates, promotions, and cake showcases!
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-rose-soft pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

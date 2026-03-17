import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Jessa Cake Delights. Visit our shop in Malandag, Malungon, Sarangani Province or reach out via phone and email.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We&apos;d love to hear from you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            Get in Touch
          </h2>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
              <MapPin className="h-5 w-5 text-rose" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Visit Our Shop</h3>
              <p className="text-sm text-muted-foreground">{BUSINESS.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
              <Clock className="h-5 w-5 text-rose" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Business Hours</h3>
              <p className="text-sm text-muted-foreground">
                {BUSINESS.operatingHours}
              </p>
              <p className="text-sm text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>

          {BUSINESS.phone && (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
                <Phone className="h-5 w-5 text-rose" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Phone</h3>
                <p className="text-sm text-muted-foreground">{BUSINESS.phone}</p>
              </div>
            </div>
          )}

          {BUSINESS.email && (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
                <Mail className="h-5 w-5 text-rose" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">{BUSINESS.email}</p>
              </div>
            </div>
          )}

          {BUSINESS.socialFacebook && (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
                <Facebook className="h-5 w-5 text-rose" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Facebook</h3>
                <a
                  href={BUSINESS.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-rose hover:underline"
                >
                  Follow us on Facebook
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-xl border border-border overflow-hidden min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1667.3532872245266!2d125.2496074335888!3d6.3087417022418295!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1773774759514!5m2!1sen!2sph"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jessa Cake Delights Location"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

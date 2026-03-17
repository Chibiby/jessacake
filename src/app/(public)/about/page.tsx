import type { Metadata } from "next";
import { Cake, Heart, Store, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Jessa Cakes — our story, our passion for baking, and how we grew from a home kitchen to a beloved local bakery in Malandag.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground">About Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          The story behind Jessa Cakes
        </p>
      </div>

      {/* Story */}
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          Jessa Cakes began in <strong>2018</strong> as a small
          home-based cake business. The owner&apos;s passion for baking inspired
          her to create cakes and desserts for family, friends, and local
          customers. At first, orders were fulfilled through personal contacts
          and social media, as she shared her homemade creations online.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          During the <strong>pandemic era</strong>, when people were limited in
          going out, the demand for home-delivered cakes grew significantly.
          Jessa Cakes adapted by offering online ordering and delivery
          services, allowing customers to celebrate special occasions safely.
          This period became a crucial turning point for the business, helping it
          gain wider recognition and a loyal customer base.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          By <strong>2021</strong>, due to the increasing number of orders and
          growing popularity, Jessa Cakes expanded and secured its own
          dedicated shop in <strong>Malandag, Malungon, Sarangani Province</strong>. Having
          a physical location allowed the business to operate more efficiently,
          improve production capacity, and provide a better customer experience.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Today, Jessa Cakes continues to thrive, combining its
          homemade charm with professional service, delivering high-quality
          cakes, creative designs, and convenient online and in-store ordering
          options. The business aims to make every celebration sweeter and more
          memorable for its customers.
        </p>
      </div>

      {/* Milestones */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex items-start gap-4 p-6 rounded-xl bg-rose-faint">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
            <Heart className="h-5 w-5 text-rose" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">2018 — The Beginning</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Started as a home-based bakery, sharing creations with family and
              friends through social media.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-xl bg-rose-faint">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
            <Sparkles className="h-5 w-5 text-rose" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Pandemic — Growth
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Adapted to online ordering and delivery, gaining wider recognition
              and a loyal customer base.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-xl bg-rose-faint">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
            <Store className="h-5 w-5 text-rose" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              2021 — Our Own Shop
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Opened a dedicated shop in Malandag to serve customers better with
              improved capacity.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-xl bg-rose-faint">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-pale">
            <Cake className="h-5 w-5 text-rose" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Today — Thriving</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Combining homemade charm with professional service — delivering
              quality cakes for every celebration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

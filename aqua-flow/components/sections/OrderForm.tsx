"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/field";
import { whatsappBase } from "@/lib/site";

const deliveryWindows = [
  "Today — Morning (8:00–12:00)",
  "Today — Afternoon (12:00–17:00)",
  "Today — Evening (17:00–21:00)",
  "Tomorrow — Morning",
  "Tomorrow — Afternoon",
  "This week — flexible",
];

export function OrderForm() {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    location: "",
    gallons: "2",
    delivery: deliveryWindows[0],
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      "*New Water Order — Aqua Flow*",
      "",
      `👤 Name: ${form.name || "—"}`,
      `📞 Phone: ${form.phone || "—"}`,
      `📍 Location: ${form.location || "—"}`,
      `💧 Gallons (19L): ${form.gallons}`,
      `🕒 Delivery: ${form.delivery}`,
    ].join("\n");

    window.open(
      `${whatsappBase}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="order" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-navy-deep" />
      <div className="absolute inset-0 -z-10 aurora-deep opacity-70" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-aqua-bright">
              Order Online
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Pure water, just a message away
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Fill in your details and we’ll confirm your delivery instantly on
              WhatsApp. No account needed — fast, simple and reliable.
            </p>
            <div className="mt-8 flex items-center gap-3 text-white/70">
              <Droplets className="h-5 w-5 text-aqua-bright" />
              <span className="text-sm">
                Daily delivery across the Emirates — fresh, every day.
              </span>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-dark rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
                <div>
                  <Label htmlFor="gallons">Number of gallons (19L)</Label>
                  <Input
                    id="gallons"
                    type="number"
                    min={1}
                    required
                    value={form.gallons}
                    onChange={update("gallons")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location / address</Label>
                <Input
                  id="location"
                  required
                  placeholder="Area, building, villa no."
                  value={form.location}
                  onChange={update("location")}
                />
              </div>

              <div>
                <Label htmlFor="delivery">Preferred delivery moment</Label>
                <Select
                  id="delivery"
                  value={form.delivery}
                  onChange={update("delivery")}
                >
                  {deliveryWindows.map((w) => (
                    <option key={w} value={w} className="bg-navy-deep">
                      {w}
                    </option>
                  ))}
                </Select>
              </div>

              <Button type="submit" size="lg" className="mt-1 w-full">
                <MessageCircle className="h-4 w-4" />
                Send order via WhatsApp
              </Button>
              <p className="text-center text-xs text-white/45">
                Opens WhatsApp with your order pre-filled — review and send.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

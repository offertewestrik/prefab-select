"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/field";
import { whatsappBase } from "@/lib/site";

const deliveryWindows = [
  "اليوم — صباحاً (8:00–12:00)",
  "اليوم — ظهراً (12:00–17:00)",
  "اليوم — مساءً (17:00–21:00)",
  "غداً — صباحاً",
  "غداً — ظهراً",
  "هذا الأسبوع — مرن",
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
      "*طلب مياه جديد — النقاء*",
      "",
      `👤 الاسم: ${form.name || "—"}`,
      `📞 الهاتف: ${form.phone || "—"}`,
      `📍 الموقع: ${form.location || "—"}`,
      `💧 الغالونات (19 لتر): ${form.gallons}`,
      `🕒 التوصيل: ${form.delivery}`,
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
            <p className="text-sm font-bold text-aqua-bright">
              اطلب أونلاين
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              مياه نقية على بُعد رسالة واحدة
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              املأ بياناتك وسنؤكّد توصيلك فوراً عبر واتساب. دون أي حساب — سريع
              وبسيط وموثوق.
            </p>
            <div className="mt-8 flex items-center gap-3 text-white/70">
              <Droplets className="h-5 w-5 text-aqua-bright" />
              <span className="text-sm">
                توصيل يومي في جميع أنحاء الإمارات — طازجة، كل يوم.
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
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  required
                  placeholder="اسمك"
                  value={form.name}
                  onChange={update("name")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="+971 50 000 0000"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
                <div>
                  <Label htmlFor="gallons">عدد الغالونات (19 لتر)</Label>
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
                <Label htmlFor="location">الموقع / العنوان</Label>
                <Input
                  id="location"
                  required
                  placeholder="المنطقة، المبنى، رقم الفيلا"
                  value={form.location}
                  onChange={update("location")}
                />
              </div>

              <div>
                <Label htmlFor="delivery">وقت التوصيل المفضّل</Label>
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
                أرسل الطلب عبر واتساب
              </Button>
              <p className="text-center text-xs text-white/45">
                يفتح واتساب مع طلبك جاهزاً — راجِع وأرسِل.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

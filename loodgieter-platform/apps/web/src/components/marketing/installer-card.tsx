/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "@repo/ui";
import { urls } from "@repo/seo";
import { C, HEAD, monogram, IcStar, IcPin, IcShield } from "@/components/marketing/ds";
import type { InstallerCardData } from "@/features/installers/server/directory";

/** Eén vakman-kaart in het overzicht. Toont uitsluitend publieke gegevens. */
export function InstallerCard({ c }: { c: InstallerCardData }) {
  const profileHref = urls.installer(c.slug);
  const quoteParams = new URLSearchParams();
  if (c.services[0]) quoteParams.set("dienst", c.services[0].slug);
  const quoteHref = quoteParams.toString() ? `/aanvraag?${quoteParams}` : "/aanvraag";

  return (
    <article
      className="lph-card"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 6px 18px rgba(15,27,51,.05)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `.lph-card{transition:transform .25s ease, box-shadow .25s ease}.lph-card:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}`,
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        {c.logoUrl ? (
          <img
            src={c.logoUrl}
            alt={c.name}
            style={{ width: 54, height: 54, flexShrink: 0, borderRadius: 13, objectFit: "cover" }}
          />
        ) : (
          <span
            aria-hidden
            style={{
              width: 54,
              height: 54,
              flexShrink: 0,
              borderRadius: 13,
              background: "#EFF4FF",
              color: C.blueDark,
              fontFamily: HEAD,
              fontWeight: 800,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {monogram(c.name)}
          </span>
        )}

        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            style={{
              fontFamily: HEAD,
              fontWeight: 700,
              fontSize: 17,
              color: C.ink,
              lineHeight: 1.25,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Link href={profileHref} style={{ color: "inherit", textDecoration: "none" }}>
              {c.name}
            </Link>
          </h3>
          <div
            style={{
              marginTop: 6,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "5px 12px",
              fontSize: 13,
              color: C.muted,
            }}
          >
            {c.ratingCount > 0 ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "#FFF8E8",
                  border: "1px solid #FCE9C0",
                  borderRadius: 8,
                  padding: "3px 8px",
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: C.ink,
                }}
              >
                <IcStar /> {c.ratingAvg.toFixed(1).replace(".", ",")}
                <span style={{ color: C.muted3, fontWeight: 600 }}>({c.ratingCount})</span>
              </span>
            ) : (
              <span style={{ color: C.muted3, fontWeight: 600 }}>Nog geen reviews</span>
            )}
            {c.city && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <IcPin s={15} /> {c.city}
              </span>
            )}
            {c.distanceKm != null && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700, color: C.blueDark }}>
                ± {Math.round(c.distanceKm)} km
              </span>
            )}
          </div>
        </div>

        {c.emergencyService && (
          <span
            style={{
              marginLeft: "auto",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "#FFF3E9",
              border: "1px solid #FBE0CB",
              borderRadius: 999,
              padding: "4px 10px",
              fontSize: 11.5,
              fontWeight: 800,
              color: C.orange,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill={C.orange} aria-hidden>
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8Z" />
            </svg>
            24/7 spoed
          </span>
        )}
      </div>

      {c.shortDescription && (
        <p
          style={{
            marginTop: 13,
            fontSize: 13.5,
            lineHeight: 1.55,
            color: C.muted,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {c.shortDescription}
        </p>
      )}

      {c.services.length > 0 && (
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {c.services.slice(0, 5).map((s) => (
            <span
              key={s.slug}
              style={{
                background: "#F4F7FB",
                border: "1px solid #E6ECF5",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 600,
                color: "#475069",
              }}
            >
              {s.name}
            </span>
          ))}
          {c.services.length > 5 && (
            <span style={{ alignSelf: "center", padding: "0 2px", fontSize: 12, color: C.muted3, fontWeight: 600 }}>
              +{c.services.length - 5}
            </span>
          )}
        </div>
      )}

      <div style={{ marginTop: 13, display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: C.muted }}>
        {c.provinces.length > 0 && (
          <p style={{ margin: 0 }}>
            <span style={{ color: C.muted3 }}>Werkgebied:</span> {c.provinces.join(", ")}
            {c.coverageCount > 0 && ` · ${c.coverageCount} gemeenten`}
          </p>
        )}
        {c.certifications.length > 0 && (
          <p style={{ margin: 0, display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
            <IcShield stroke={C.green} s={15} />
            {c.certifications.slice(0, 4).join(", ")}
          </p>
        )}
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 10, paddingTop: 6 }}>
        <Link href={profileHref} style={{ flex: 1 }}>
          <Button variant="outline" className="w-full">
            Bekijk profiel
          </Button>
        </Link>
        <Link href={quoteHref} style={{ flex: 1 }}>
          <Button variant="accent" className="w-full">
            Vraag offerte aan
          </Button>
        </Link>
      </div>
    </article>
  );
}

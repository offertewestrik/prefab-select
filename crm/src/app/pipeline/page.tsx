"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { STAGE_META, STAGE_ORDER, PRODUCT_LABEL } from "@/lib/constants";
import { euro } from "@/lib/format";
import { Avatar } from "@/components/ui/Badge";
import type { Lead, PipelineStage } from "@/lib/types";
import { MapPin, Phone } from "lucide-react";

export default function PipelinePage() {
  const mounted = useMounted();
  const leads = useCrm((s) => s.leads);
  const moveLead = useCrm((s) => s.moveLead);
  const reorderInStage = useCrm((s) => s.reorderInStage);

  const kolommen = useMemo(() => {
    const map = {} as Record<PipelineStage, Lead[]>;
    for (const stage of STAGE_ORDER) {
      map[stage] = leads
        .filter((l) => l.stage === stage)
        .sort((a, b) => a.positie - b.positie);
    }
    return map;
  }, [leads]);

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const bronStage = source.droppableId as PipelineStage;
    const doelStage = destination.droppableId as PipelineStage;

    if (bronStage === doelStage) {
      // Herordenen binnen dezelfde kolom
      const ids = kolommen[bronStage].map((l) => l.id);
      ids.splice(source.index, 1);
      ids.splice(destination.index, 0, draggableId);
      reorderInStage(bronStage, ids);
    } else {
      // Verplaatsen naar andere kolom op de juiste positie
      moveLead(draggableId, doelStage, destination.index);
      const doelIds = kolommen[doelStage].map((l) => l.id);
      doelIds.splice(destination.index, 0, draggableId);
      reorderInStage(doelStage, doelIds);
    }
  }

  if (!mounted) {
    return (
      <div>
        <PageHeader titel="Pijplijn" subtitel="Sleep leads tussen de fases" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        titel="Pijplijn"
        subtitel="Sleep leads tussen de fases om de status bij te werken"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="thin-scroll flex gap-4 overflow-x-auto pb-4">
          {STAGE_ORDER.map((stage) => {
            const items = kolommen[stage];
            const waarde = items.reduce((s, l) => s + l.waarde, 0);
            return (
              <div key={stage} className="flex w-72 shrink-0 flex-col">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${STAGE_META[stage].dot}`} />
                    <h3 className="text-sm font-bold text-slate-700">{STAGE_META[stage].label}</h3>
                    <span className="rounded-full bg-slate-100 px-1.5 text-xs font-semibold text-slate-500">
                      {items.length}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{euro(waarde)}</span>
                </div>

                <Droppable droppableId={stage}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-2.5 rounded-2xl border p-2 transition ${
                        snapshot.isDraggingOver
                          ? "border-brand-300 bg-brand-50/50"
                          : "border-slate-100 bg-slate-50/60"
                      }`}
                      style={{ minHeight: 120 }}
                    >
                      {items.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              className={`rounded-xl border border-slate-100 bg-white p-3 shadow-soft transition ${
                                snap.isDragging ? "dragging" : "hover:shadow-md"
                              }`}
                            >
                              <PipelineCard lead={lead} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {items.length === 0 && !snapshot.isDraggingOver && (
                        <p className="py-6 text-center text-xs text-slate-300">Sleep hier een lead</p>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

function PipelineCard({ lead }: { lead: Lead }) {
  return (
    <Link href={`/leads/${lead.id}`} className="block">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-slate-800">{lead.naam}</p>
        <Avatar naam={lead.toegewezenAan} />
      </div>
      <p className="mb-2 text-xs font-medium text-brand-600">{PRODUCT_LABEL[lead.product]}</p>
      <div className="space-y-1 text-[11px] text-slate-400">
        {lead.plaats && (
          <p className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {lead.plaats}
          </p>
        )}
        <p className="flex items-center gap-1">
          <Phone className="h-3 w-3" /> {lead.telefoon}
        </p>
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-slate-50 pt-2">
        <span className="text-sm font-black text-slate-900">{euro(lead.waarde)}</span>
        <span className="text-[11px] font-semibold text-slate-400">{lead.kans}% kans</span>
      </div>
    </Link>
  );
}

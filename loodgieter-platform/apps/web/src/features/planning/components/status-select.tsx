"use client";

import { setAppointmentStatusAction } from "../server/actions";

const STATUS_LABEL: Record<string, string> = {
  PLANNED: "Gepland", CONFIRMED: "Bevestigd", COMPLETED: "Afgerond", CANCELLED: "Geannuleerd", NO_SHOW: "Niet verschenen",
};

export function AppointmentStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <form action={setAppointmentStatusAction}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        {Object.entries(STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </form>
  );
}

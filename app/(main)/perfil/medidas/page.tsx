"use client";
import { useState } from "react";
import { IconRuler, IconUser, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const MEDIDAS = [
  { key: "altura",     label: "Altura",         unit: "cm", desc: "De pie, sin zapatos" },
  { key: "peso",       label: "Peso",           unit: "kg", desc: "Aproximado" },
  { key: "busto",      label: "Busto / Pecho",  unit: "cm", desc: "La parte mas ancha" },
  { key: "cintura",    label: "Cintura",        unit: "cm", desc: "La parte mas delgada" },
  { key: "cadera",     label: "Cadera",         unit: "cm", desc: "La parte mas ancha" },
  { key: "muslo",      label: "Muslo",          unit: "cm", desc: "La parte mas ancha del muslo" },
  { key: "hombros",    label: "Hombros",        unit: "cm", desc: "De hombro a hombro" },
  { key: "largo_torso",label: "Largo de torso", unit: "cm", desc: "De hombro a cintura" },
];

export default function MedidasPage() {
  const router = useRouter();
  const [medidas, setMedidas] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const completed = Object.keys(medidas).filter(k => medidas[k]).length;

  const handleSave = () => {
    // TODO: save to Firestore user profile
    setSaved(true);
    setTimeout(() => router.push("/perfil"), 1500);
  };

  return (
    <div className="px-4 pb-6">
      <div className="flex items-center gap-3 py-4 mb-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--muted)" }}>
          <IconRuler size={20} style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Mis medidas</h2>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{completed}/{MEDIDAS.length} completadas</p>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 rounded-full mb-5" style={{ background: "var(--muted)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(completed / MEDIDAS.length) * 100}%`, background: "var(--primary)" }} />
      </div>

      {/* Avatar placeholder */}
      <div className="rounded-2xl flex flex-col items-center justify-center gap-2 mb-5"
        style={{ height: 160, background: "linear-gradient(135deg, var(--muted), var(--border))", border: "1px solid var(--border)" }}>
        <IconUser size={48} style={{ color: "var(--primary)", opacity: 0.5 }} />
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Tu avatar aparece aqui al completar medidas</p>
      </div>

      {/* Medidas inputs */}
      <div className="space-y-3">
        {MEDIDAS.map(({ key, label, unit, desc }) => (
          <div key={key} className="p-3 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{label}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
              </div>
              {medidas[key] && <IconCheck size={16} style={{ color: "var(--success)" }} />}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="number" value={medidas[key] || ""} onChange={e => setMedidas(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder="0"
                className="flex-1 py-2 px-3 rounded-xl text-sm"
                style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }} />
              <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)", minWidth: 28 }}>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={completed === 0}
        className="mt-5 w-full py-4 rounded-2xl font-bold text-base"
        style={{ background: completed > 0 ? "var(--primary)" : "var(--muted)", color: completed > 0 ? "white" : "var(--muted-foreground)" }}>
        {saved ? "Guardado!" : "Guardar mis medidas"}
      </button>
    </div>
  );
}

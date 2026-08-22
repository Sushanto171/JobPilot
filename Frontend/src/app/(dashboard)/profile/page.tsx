"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SEED_APPLICATIONS, USER_PROFILE } from "@/lib/mock-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, Upload, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({ name: z.string().min(2), email: z.email(), location: z.string().min(2), targetRole: z.string().min(2) });
type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const form = useForm<ProfileForm>({ resolver: zodResolver(profileSchema), defaultValues: USER_PROFILE });
  const interviews = SEED_APPLICATIONS.filter((application) => application.stage === "INTERVIEW").length;
  return <div className="max-w-2xl space-y-5 px-6 py-6"><Card><div className="flex items-center gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-jp-cyan text-lg font-bold text-jp-base">{USER_PROFILE.initials}</div><div className="flex-1"><div className="text-base font-semibold text-jp-paper">{USER_PROFILE.name}</div><div className="mt-0.5 text-xs text-jp-text-dim">{USER_PROFILE.headline}</div><button type="button" className="mt-2 flex items-center gap-1.5 rounded-md border border-jp-border px-2.5 py-1 text-xs text-jp-paper"><Upload size={11} /> Change avatar</button></div></div></Card><div className="grid grid-cols-3 gap-3"><Card><div className="text-xs text-jp-text-dim2">Applications</div><div className="mt-1 font-mono text-lg font-bold text-jp-paper">{SEED_APPLICATIONS.length}</div></Card><Card><div className="text-xs text-jp-text-dim2">Response rate</div><div className="mt-1 font-mono text-lg font-bold text-jp-paper">33%</div></Card><Card><div className="text-xs text-jp-text-dim2">Interviews</div><div className="mt-1 font-mono text-lg font-bold text-jp-paper">{interviews}</div></Card></div><Card><div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-jp-text-dim"><User size={12} /> Personal info</div><form onSubmit={form.handleSubmit(() => undefined)} className="space-y-3">{(["name", "email", "location", "targetRole"] as const).map((field) => <label key={field} className="block text-xs text-jp-text-dim2"><span className="font-mono uppercase">{field === "targetRole" ? "TARGET ROLE" : field}</span><Input className="mt-1 w-full" {...form.register(field)} />{form.formState.errors[field] && <span className="mt-1 block text-jp-rose">{form.formState.errors[field]?.message}</span>}</label>)}<div className="mt-4 flex gap-2"><button type="submit" className="rounded-md bg-jp-amber px-3.5 py-1.5 text-xs font-semibold text-jp-base">Save changes</button><button type="button" onClick={() => form.reset()} className="rounded-md border border-jp-border px-3.5 py-1.5 text-xs text-jp-text-dim">Cancel</button></div></form></Card><button type="button" className="flex items-center gap-2 px-1 text-xs text-jp-rose"><LogOut size={13} /> Sign out</button></div>;
}

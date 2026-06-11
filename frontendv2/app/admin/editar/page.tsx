"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import axios from "axios";
import { api } from "@/services/api";

interface BaseItem {
  id: string;
  title: string;
  technologies: string;
  imgcapa_url: string;
}

interface ProjectFull extends BaseItem {
  goal: string;
  features: string;
  linkgihub: string;
  linklivedemo: string;
}

interface FreelancerFull extends BaseItem {
  headline: string;
  subheadline: string;
  linkgithub: string;
  linklivedemo: string;
}

type EditType = "project" | "freelancer";
type Mode = "editar" | "criar";
type CreateType = "project" | "freelancer" | "landingpage";

interface EditState {
  type: EditType;
  data: ProjectFull | FreelancerFull;
}

const PROJECT_FIELDS = [
  { key: "title", label: "Título", type: "text" },
  { key: "technologies", label: "Tecnologias", type: "text" },
  { key: "goal", label: "Objetivo", type: "textarea" },
  { key: "features", label: "Sobre o Software", type: "textarea" },
  { key: "linkgihub", label: "Link GitHub", type: "text" },
  { key: "linklivedemo", label: "Link Live Demo", type: "text" },
] as const;

const FREELANCER_FIELDS = [
  { key: "title", label: "Título", type: "text" },
  { key: "headline", label: "Headline", type: "text" },
  { key: "subheadline", label: "Subheadline", type: "textarea" },
  { key: "technologies", label: "Tecnologias", type: "text" },
  { key: "linkgithub", label: "Link GitHub", type: "text" },
  { key: "linklivedemo", label: "Link Live Demo", type: "text" },
] as const;

const LANDING_PAGE_FIELDS = FREELANCER_FIELDS;

const EMPTY_PROJECT_FORM: Record<string, string> = {
  title: "", technologies: "", goal: "", features: "", linkgihub: "", linklivedemo: "",
};

const EMPTY_SHARED_FORM: Record<string, string> = {
  title: "", headline: "", subheadline: "", technologies: "", linkgithub: "", linklivedemo: "",
};

const CREATE_FIELDS = {
  project: PROJECT_FIELDS,
  freelancer: FREELANCER_FIELDS,
  landingpage: LANDING_PAGE_FIELDS,
} as const;

function flattenToForm(type: EditType, data: any): Record<string, string> {
  if (type === "project") {
    return {
      title: data.title ?? "",
      technologies: data.technologies ?? "",
      goal: data.goal ?? "",
      features: data.features ?? "",
      linkgihub: data.linkgihub ?? "",
      linklivedemo: data.linklivedemo ?? "",
    };
  }
  return {
    title: data.title ?? "",
    headline: data.headline ?? "",
    subheadline: data.subheadline ?? "",
    technologies: data.technologies ?? "",
    linkgithub: data.linkgithub ?? "",
    linklivedemo: data.linklivedemo ?? "",
  };
}

export default function AdminEditar() {
  const [mode, setMode] = useState<Mode>("editar");
  const [createType, setCreateType] = useState<CreateType>("project");
  const [createForm, setCreateForm] = useState<Record<string, string>>({ ...EMPTY_PROJECT_FORM });
  const [creating, setCreating] = useState(false);
  const [createFeedback, setCreateFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "freelancers">("projects");
  const [projects, setProjects] = useState<BaseItem[]>([]);
  const [freelancers, setFreelancers] = useState<BaseItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [loadingItem, setLoadingItem] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const capaRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const createCapaRef = useRef<HTMLInputElement>(null);
  const createGalleryRef = useRef<HTMLInputElement>(null);

  async function fetchLists() {
    try {
      const [resProj, resFree] = await Promise.all([
        api.get("/listproject"),
        api.get("/listfreelancer"),
      ]);
      setProjects(resProj.data);
      setFreelancers(resFree.data);
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => { fetchLists(); }, []);

  async function openEdit(id: string, type: EditType) {
    setLoadingItem(true);
    setEditing(null);
    setFeedback(null);
    try {
      // /listfeelancer is a backend typo — kept intentionally
      const endpoint = type === "project" ? `/listproject/${id}` : `/listfeelancer/${id}`;
      const res = await api.get(endpoint);
      setEditing({ type, data: res.data });
      setForm(flattenToForm(type, res.data));
      if (capaRef.current) capaRef.current.value = "";
      if (galleryRef.current) galleryRef.current.value = "";
    } finally {
      setLoadingItem(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSubmitting(true);
    setFeedback(null);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (capaRef.current?.files?.[0]) fd.append("imgcapa", capaRef.current.files[0]);
    if (galleryRef.current?.files) {
      Array.from(galleryRef.current.files).forEach(f => fd.append("files", f));
    }

    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = editing.type === "project"
        ? `${base}/project/${editing.data.id}`
        : `${base}/freelancer/${editing.data.id}`;

      await axios.patch(endpoint, fd);
      setFeedback({ ok: true, msg: "Projeto atualizado com sucesso!" });
      await fetchLists();
    } catch (err: any) {
      setFeedback({ ok: false, msg: err?.response?.data?.error ?? "Erro ao atualizar." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateFeedback(null);

    const fd = new FormData();
    Object.entries(createForm).forEach(([k, v]) => fd.append(k, v));
    if (createCapaRef.current?.files?.[0]) fd.append("imgcapa", createCapaRef.current.files[0]);
    if (createGalleryRef.current?.files) {
      Array.from(createGalleryRef.current.files).forEach(f => fd.append("files", f));
    }

    const base = process.env.NEXT_PUBLIC_API_URL;
    const endpoints: Record<CreateType, string> = {
      project: `${base}/project`,
      freelancer: `${base}/freelancer`,
      landingpage: `${base}/landingpages`,
    };

    try {
      await axios.post(endpoints[createType], fd);
      setCreateFeedback({ ok: true, msg: "Criado com sucesso!" });
      setCreateForm(createType === "project" ? { ...EMPTY_PROJECT_FORM } : { ...EMPTY_SHARED_FORM });
      if (createCapaRef.current) createCapaRef.current.value = "";
      if (createGalleryRef.current) createGalleryRef.current.value = "";
      await fetchLists();
    } catch (err: any) {
      setCreateFeedback({ ok: false, msg: err?.response?.data?.error ?? "Erro ao criar." });
    } finally {
      setCreating(false);
    }
  }

  const activeList = activeTab === "projects" ? projects : freelancers;
  const activeType: EditType = activeTab === "projects" ? "project" : "freelancer";
  const activeFields = editing?.type === "project" ? PROJECT_FIELDS : FREELANCER_FIELDS;

  return (
    <div className="min-h-screen bg-[#050709] text-white pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Painel de Administração</h1>
            <p className="text-gray-500 text-sm">Gerencie os projetos do portfólio.</p>
          </div>
          <div className="flex gap-2 mt-1">
            {(["editar", "criar"] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all capitalize ${
                  mode === m
                    ? "bg-cyan-600 text-white"
                    : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {mode === "criar" && (
          <div>
            <div className="flex gap-1 mb-8 border-b border-white/10">
              {([
                { key: "project", label: "Plataforma / Dashboard" },
                { key: "freelancer", label: "Freelancer" },
                { key: "landingpage", label: "Landing Page" },
              ] as { key: CreateType; label: string }[]).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCreateType(key)}
                  className={`pb-3 px-5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                    createType === key
                      ? "border-cyan-500 text-cyan-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <form onSubmit={handleCreate} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-bold text-cyan-400">Novo registro</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Imagem Capa <span className="text-red-400">*</span>
                </label>
                <input
                  ref={createCapaRef}
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-cyan-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Galeria de Imagens <span className="text-gray-500 font-normal">(opcional)</span>
                </label>
                <input
                  ref={createGalleryRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-white/20 transition-all"
                />
              </div>
              {CREATE_FIELDS[createType].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={createForm[field.key] ?? ""}
                      onChange={e => setCreateForm(f => ({ ...f, [field.key]: e.target.value }))}
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 resize-y transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      value={createForm[field.key] ?? ""}
                      onChange={e => setCreateForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  )}
                </div>
              ))}

              {createFeedback && (
                <p className={`text-sm font-semibold ${createFeedback.ok ? "text-green-400" : "text-red-400"}`}>
                  {createFeedback.ok ? "✓ " : "✗ "}{createFeedback.msg}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all"
                >
                  {creating ? "Criando..." : "Criar Projeto"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreateForm(createType === "project" ? { ...EMPTY_PROJECT_FORM } : { ...EMPTY_SHARED_FORM });
                    setCreateFeedback(null);
                    if (createCapaRef.current) createCapaRef.current.value = "";
                    if (createGalleryRef.current) createGalleryRef.current.value = "";
                  }}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all"
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>
        )}

        {mode === "editar" && (<>
          <div className="flex gap-1 mb-8 border-b border-white/10">
          {(["projects", "freelancers"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditing(null); setFeedback(null); }}
              className={`pb-3 px-5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab === "projects" ? "Plataformas & Dashboards" : "Freelancer"}
            </button>
          ))}
          </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            {loadingList ? (
              <p className="text-gray-500 text-sm animate-pulse">Carregando projetos...</p>
            ) : activeList.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum item encontrado.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {activeList.map(item => (
                  <button
                    key={item.id}
                    onClick={() => openEdit(item.id, activeType)}
                    className={`text-left px-4 py-3 rounded-xl border transition-all ${
                      editing?.data.id === item.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-white/5 hover:border-cyan-500/40 hover:bg-white/8"
                    }`}
                  >
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{item.technologies}</p>
                  </button>
                ))}
              </div>
            )}
          </aside>

          <main className="flex-1 min-w-0">
            {loadingItem && (
              <p className="text-gray-400 text-sm animate-pulse">Carregando dados do projeto...</p>
            )}

            {!editing && !loadingItem && (
              <div className="flex items-center justify-center h-64 border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-sm">Selecione um item na lista.</p>
              </div>
            )}

            {editing && !loadingItem && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-base font-bold text-cyan-400">
                  Editando:{" "}
                  <span className="text-white">{editing.data.title}</span>
                </h2>

                {activeFields.map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={form[field.key] ?? ""}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        rows={4}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 resize-y transition-colors"
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[field.key] ?? ""}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Imagem Capa{" "}
                    <span className="text-gray-500 font-normal">(opcional — substitui a atual)</span>
                  </label>
                  <input
                    ref={capaRef}
                    type="file"
                    accept="image/*"
                    className="text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Galeria de Imagens{" "}
                    <span className="text-gray-500 font-normal">(opcional — substitui as atuais)</span>
                  </label>
                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-white/20 transition-all"
                  />
                </div>

                {feedback && (
                  <p className={`text-sm font-semibold ${feedback.ok ? "text-green-400" : "text-red-400"}`}>
                    {feedback.ok ? "✓ " : "✗ "}{feedback.msg}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all"
                  >
                    {submitting ? "Salvando..." : "Salvar Alterações"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditing(null); setFeedback(null); }}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
        </>)}
      </div>
    </div>
  );
}

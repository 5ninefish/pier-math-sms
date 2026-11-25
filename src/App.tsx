import { useMemo, useState } from "react";
import {
  activity as seedActivity,
  campaigns as seedCampaigns,
  contacts,
  keywords,
  stats,
  type Campaign,
  type CampaignStatus,
  type ContactStatus,
} from "./data";

type Page = "dashboard" | "contacts" | "keywords" | "send" | "history";

const pages: { id: Page; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "contacts", label: "Contacts" },
  { id: "keywords", label: "Keywords" },
  { id: "send", label: "Send Message" },
  { id: "history", label: "Message History" },
];

const audienceOptions = ["All subscribers", ...keywords.filter((k) => k.active).map((k) => k.code)];

function statusClass(status: ContactStatus | CampaignStatus) {
  if (status === "Active" || status === "Delivered") return "bg-emerald-50 text-emerald-700 ring-emerald-600/15";
  if (status === "Pending" || status === "Scheduled" || status === "Sending") {
    return "bg-amber-50 text-amber-700 ring-amber-600/15";
  }
  return "bg-rose-50 text-rose-700 ring-rose-600/15";
}

function Pill({ status }: { status: ContactStatus | CampaignStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClass(status)}`}>
      {status}
    </span>
  );
}

function Icon({ name }: { name: Page | "search" | "menu" }) {
  const common = "h-5 w-5";
  if (name === "search") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "menu") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      </svg>
    );
  }
  const paths: Record<Page, string> = {
    dashboard: "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z",
    contacts: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.5 1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4 19.5c.4-2.4 2.2-3.5 4-3.5s3.6 1.1 4 3.5M14 16.2c1.2-.5 2.6-.4 4 .8.8.7 1.3 1.6 1.5 2.5",
    keywords: "M7 8h10M7 12h10M7 16h6",
    send: "M5 12h9M14 8l5 4-5 4",
    history: "M12 7v5l3 2M12 21a9 9 0 1 0-9-9",
  };
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [query, setQuery] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [message, setMessage] = useState(
    "Weekend drop is live through Sunday. Show this text at either shop for 15% off one full-price item.",
  );
  const [audience, setAudience] = useState("DEALS");
  const [notice, setNotice] = useState("");
  const [keywordNote, setKeywordNote] = useState(false);
  const [history, setHistory] = useState<Campaign[]>(seedCampaigns);

  const q = query.trim().toLowerCase();
  const title = pages.find((item) => item.id === page)?.label ?? "Dashboard";

  const filteredContacts = useMemo(
    () =>
      contacts.filter((person) =>
        [person.name, person.phone, person.keyword, person.status].join(" ").toLowerCase().includes(q),
      ),
    [q],
  );
  const filteredKeywords = useMemo(
    () => keywords.filter((item) => `${item.code} ${item.reply}`.toLowerCase().includes(q)),
    [q],
  );
  const filteredHistory = useMemo(
    () => history.filter((item) => `${item.preview} ${item.audience} ${item.status}`.toLowerCase().includes(q)),
    [history, q],
  );
  const filteredActivity = useMemo(
    () => seedActivity.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(q)),
    [q],
  );

  function openPage(next: Page) {
    setPage(next);
    setNavOpen(false);
    setNotice("");
  }

  function sendMessage() {
    const body = message.trim();
    if (!body) {
      setNotice("Write a message before sending.");
      return;
    }
    const match = keywords.find((item) => item.code === audience);
    const recipients = audience === "All subscribers" ? 12486 : (match?.subscribers ?? 0);
    const next: Campaign = {
      id: `local-${Date.now()}`,
      date: "Nov 25, 2026",
      preview: body,
      recipients,
      audience,
      status: "Sending",
    };
    setHistory((current) => [next, ...current]);
    setNotice(`Queued for ${recipients.toLocaleString()} people on ${audience}. This preview does not send a text.`);
    setPage("history");
  }

  const segments = Math.max(1, Math.ceil(message.length / 160));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {navOpen && (
          <button
            className="fixed inset-0 z-20 bg-slate-900/40 lg:hidden"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-3 px-5 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
              PS
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Peak SMS</p>
              <p className="text-xs text-slate-500">Staff Dashboard</p>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Primary">
            {pages.map((item) => {
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openPage(item.id)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${
                    active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon name={item.id} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="m-3 rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
            Preview only. No texts leave this page, and subscriber rows are sample data.
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open navigation"
              onClick={() => setNavOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold">{title}</p>
            </div>
            <label className="relative hidden w-full max-w-sm md:block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Icon name="search" />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${title.toLowerCase()}`}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2"
              />
            </label>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">Alex Reyes</p>
                <p className="text-xs text-slate-500">Staff</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                AR
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
            <label className="relative mb-4 block md:hidden">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Icon name="search" />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${title.toLowerCase()}`}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-10 text-sm outline-none ring-indigo-500 focus:ring-2"
              />
            </label>

            {page === "dashboard" && (
              <section className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
                      <p className="mt-2 text-xs font-medium text-indigo-600">{stat.note}</p>
                    </article>
                  ))}
                </div>
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-4">
                    <h2 className="text-sm font-semibold">Recent activity</h2>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {filteredActivity.length === 0 && <Empty label="No activity matches that search." />}
                    {filteredActivity.map((item) => (
                      <li key={item.id} className="flex items-start justify-between gap-4 px-5 py-4">
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                        </div>
                        <p className="shrink-0 text-xs text-slate-400">{item.time}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>
            )}

            {page === "contacts" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <h2 className="text-sm font-semibold">Subscribers</h2>
                  <p className="text-xs text-slate-500">{filteredContacts.length} shown</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                      <tr>
                        {["Name", "Phone", "Keyword source", "Date joined", "Status"].map((heading) => (
                          <th key={heading} className="px-5 py-3 font-medium">
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredContacts.length === 0 && (
                        <tr>
                          <td colSpan={5}>
                            <Empty label="No subscribers match that search." />
                          </td>
                        </tr>
                      )}
                      {filteredContacts.map((person) => (
                        <tr key={person.id} className="hover:bg-slate-50/80">
                          <td className="px-5 py-3.5 font-medium">{person.name}</td>
                          <td className="px-5 py-3.5 text-slate-600 tabular-nums">{person.phone}</td>
                          <td className="px-5 py-3.5">
                            <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                              {person.keyword}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-600">{person.joined}</td>
                          <td className="px-5 py-3.5">
                            <Pill status={person.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {page === "keywords" && (
              <section>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">Keyword replies fire when someone texts the word to the shop number.</p>
                  <button
                    type="button"
                    onClick={() => setKeywordNote(true)}
                    className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Create Keyword
                  </button>
                </div>
                {keywordNote && (
                  <p className="mb-4 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800" role="status">
                    Keyword creation is preview-only. Nothing is saved.
                  </p>
                )}
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredKeywords.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white md:col-span-2">
                      <Empty label="No keywords match that search." />
                    </div>
                  )}
                  {filteredKeywords.map((item) => (
                    <article key={item.code} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-lg font-semibold tracking-tight">{item.code}</h2>
                        {item.active ? (
                          <Pill status="Active" />
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/15">
                            Paused
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.reply}</p>
                      <p className="mt-4 text-sm font-medium text-slate-900 tabular-nums">
                        {item.subscribers.toLocaleString()} subscribers
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {page === "send" && (
              <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <form
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage();
                  }}
                >
                  <label className="block text-sm font-medium" htmlFor="audience">
                    Audience
                  </label>
                  <select
                    id="audience"
                    value={audience}
                    onChange={(event) => setAudience(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-indigo-500 focus:ring-2"
                  >
                    {audienceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <label className="mt-5 block text-sm font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={7}
                    className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none ring-indigo-500 focus:ring-2"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="tabular-nums">
                      {message.length} characters · {segments} segment{segments === 1 ? "" : "s"}
                    </span>
                    <span>160 characters per segment</span>
                  </div>
                  {notice && page === "send" && (
                    <p className="mt-4 text-sm text-rose-600" role="status">
                      {notice}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Send
                  </button>
                </form>
                <aside className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
                  <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Phone preview</p>
                  <div className="mt-4 rounded-2xl bg-slate-800 p-4">
                    <p className="text-xs text-slate-400">Peak Outdoor</p>
                    <p className="mt-2 text-sm leading-6 text-slate-100">{message.trim() || "Your message will show here."}</p>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">To {audience}</p>
                </aside>
              </section>
            )}

            {page === "history" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {notice && (
                  <p className="border-b border-emerald-100 bg-emerald-50 px-5 py-3 text-sm text-emerald-800" role="status">
                    {notice}
                  </p>
                )}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                      <tr>
                        {["Date", "Message", "Recipients", "Status"].map((heading) => (
                          <th key={heading} className="px-5 py-3 font-medium">
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredHistory.length === 0 && (
                        <tr>
                          <td colSpan={4}>
                            <Empty label="No campaigns match that search." />
                          </td>
                        </tr>
                      )}
                      {filteredHistory.map((item) => (
                        <tr key={item.id}>
                          <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">{item.date}</td>
                          <td className="max-w-xl px-5 py-3.5">
                            <p className="line-clamp-2 font-medium">{item.preview}</p>
                            <p className="mt-1 text-xs text-slate-500">{item.audience}</p>
                          </td>
                          <td className="px-5 py-3.5 tabular-nums">{item.recipients.toLocaleString()}</td>
                          <td className="px-5 py-3.5">
                            <Pill status={item.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="px-5 py-10 text-center text-sm text-slate-500">{label}</p>;
}

export type ContactStatus = "Active" | "Unsubscribed" | "Pending";
export type CampaignStatus = "Delivered" | "Scheduled" | "Failed" | "Sending";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  keyword: string;
  joined: string;
  status: ContactStatus;
};

export type Keyword = {
  code: string;
  reply: string;
  subscribers: number;
  active: boolean;
};

export type Campaign = {
  id: string;
  date: string;
  preview: string;
  recipients: number;
  audience: string;
  status: CampaignStatus;
};

export type Activity = {
  id: string;
  time: string;
  title: string;
  detail: string;
};

export const familyCount = 64;

export const keywords: Keyword[] = [
  {
    code: "JOIN",
    reply: "You are on the PIER-Math family list. Reply STOP to opt out. Msg & data rates may apply.",
    subscribers: 58,
    active: true,
  },
  {
    code: "DAY",
    reply: "Tier 1 is five in-person days: Fun, Beautiful, Yummy, Alive, and Home. The evening text names tomorrow’s room.",
    subscribers: 51,
    active: true,
  },
  {
    code: "ABSENT",
    reply: "Text ABSENT and your child’s first name if they will miss a day. A staff member will confirm.",
    subscribers: 19,
    active: true,
  },
  {
    code: "HELP",
    reply: "A PIER-Math staff member will reply during program hours. For an emergency, call the site office.",
    subscribers: 12,
    active: true,
  },
  {
    code: "TIER1",
    reply: "Tier 1 is the in-person week for students finishing grade 6. This list is families for that week only.",
    subscribers: 58,
    active: true,
  },
  {
    code: "WAIT",
    reply: "You are on the Tier 1 waitlist. We will text if a seat opens. Reply STOP to leave the list.",
    subscribers: 9,
    active: false,
  },
];

export const contacts: Contact[] = [
  { id: "c1", name: "Maya Chen", phone: "(808) 555-0142", keyword: "JOIN", joined: "Nov 24, 2026", status: "Active" },
  { id: "c2", name: "Jonah Kaleo", phone: "(808) 555-0194", keyword: "DAY", joined: "Nov 22, 2026", status: "Active" },
  { id: "c3", name: "Priya Shah", phone: "(808) 555-0177", keyword: "TIER1", joined: "Nov 18, 2026", status: "Active" },
  { id: "c4", name: "Eli Nakamura", phone: "(808) 555-0118", keyword: "HELP", joined: "Nov 16, 2026", status: "Pending" },
  { id: "c5", name: "Sofia Alvarez", phone: "(808) 555-0160", keyword: "ABSENT", joined: "Nov 12, 2026", status: "Active" },
  { id: "c6", name: "Chris Dalton", phone: "(808) 555-0133", keyword: "JOIN", joined: "Nov 9, 2026", status: "Unsubscribed" },
  { id: "c7", name: "Leilani Park", phone: "(808) 555-0188", keyword: "DAY", joined: "Nov 7, 2026", status: "Active" },
  { id: "c8", name: "Noah Brooks", phone: "(808) 555-0121", keyword: "TIER1", joined: "Oct 29, 2026", status: "Active" },
  { id: "c9", name: "Hana Fujimoto", phone: "(808) 555-0155", keyword: "WAIT", joined: "Oct 21, 2026", status: "Active" },
  { id: "c10", name: "Owen Briggs", phone: "(808) 555-0104", keyword: "JOIN", joined: "Oct 14, 2026", status: "Active" },
  { id: "c11", name: "Amina Rahman", phone: "(808) 555-0190", keyword: "HELP", joined: "Oct 2, 2026", status: "Pending" },
  { id: "c12", name: "Kai Mendes", phone: "(808) 555-0166", keyword: "ABSENT", joined: "Sep 28, 2026", status: "Active" },
];

export const campaigns: Campaign[] = [
  {
    id: "m1",
    date: "Nov 24, 2026",
    preview: "Tomorrow’s room is Fun. Students need a pencil and a charged iPad if the site issued one.",
    recipients: 51,
    audience: "DAY",
    status: "Delivered",
  },
  {
    id: "m2",
    date: "Nov 22, 2026",
    preview: "Tier 1 is the in-person week for students finishing grade 6. Five days: Fun, Beautiful, Yummy, Alive, Home.",
    recipients: 58,
    audience: "TIER1",
    status: "Delivered",
  },
  {
    id: "m3",
    date: "Nov 26, 2026",
    preview: "Family welcome is the evening before Day 1. Reply HELP if you need the site address again.",
    recipients: 58,
    audience: "JOIN",
    status: "Scheduled",
  },
  {
    id: "m4",
    date: "Nov 18, 2026",
    preview: "PIER-Math will text the day plan the evening before each Tier 1 day. Reply STOP to leave this list.",
    recipients: 64,
    audience: "All subscribers",
    status: "Delivered",
  },
  {
    id: "m5",
    date: "Nov 11, 2026",
    preview: "Waitlist update: no new Tier 1 seat today. A carrier filter blocked 2 numbers.",
    recipients: 9,
    audience: "WAIT",
    status: "Failed",
  },
];

export const activity: Activity[] = [
  { id: "a1", time: "8 min ago", title: "Maya Chen joined", detail: "Texted JOIN to the PIER-Math number" },
  { id: "a2", time: "34 min ago", title: "DAY reminder delivered", detail: "51 families · Fun room plan" },
  { id: "a3", time: "2 hr ago", title: "HELP reply edited", detail: "Office hours line updated by Dalen Kahiapo" },
  { id: "a4", time: "Yesterday", title: "Welcome text scheduled", detail: "JOIN · Nov 26 · 58 families" },
  { id: "a5", time: "Yesterday", title: "Chris Dalton opted out", detail: "STOP received on the JOIN list" },
  { id: "a6", time: "Nov 18", title: "List notice sent", detail: "All subscribers · 64 families" },
];

export const stats = [
  { label: "Total Subscribers", value: "64", note: "+6 this week" },
  { label: "Messages Sent This Month", value: "186", note: "4 campaigns" },
  { label: "Active Keywords", value: "5", note: "1 paused" },
  { label: "Delivery Rate", value: "98.4%", note: "Last 30 days" },
];

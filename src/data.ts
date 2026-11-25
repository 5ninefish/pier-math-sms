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

export const keywords: Keyword[] = [
  {
    code: "JOIN",
    reply: "You are on the Peak Outdoor list. Reply STOP to opt out. Msg & data rates may apply.",
    subscribers: 8420,
    active: true,
  },
  {
    code: "DEALS",
    reply: "Deals are on. We will text weekday drops before they hit the floor. Reply STOP to leave.",
    subscribers: 3104,
    active: true,
  },
  {
    code: "VIP",
    reply: "Welcome to VIP. Early access opens 24 hours before the public drop.",
    subscribers: 486,
    active: true,
  },
  {
    code: "HOURS",
    reply: "Kapahulu: 10–7 daily. Kakaako: 11–6 Tue–Sun. Holiday hours post here first.",
    subscribers: 1290,
    active: true,
  },
  {
    code: "EVENTS",
    reply: "You will get trail-night and demo-day reminders. One text per event.",
    subscribers: 742,
    active: true,
  },
  {
    code: "RESTOCK",
    reply: "We will text when the item you asked about is back in the shop.",
    subscribers: 218,
    active: false,
  },
];

export const contacts: Contact[] = [
  { id: "c1", name: "Maya Chen", phone: "(808) 555-0142", keyword: "JOIN", joined: "Nov 24, 2026", status: "Active" },
  { id: "c2", name: "Jonah Kaleo", phone: "(808) 555-0194", keyword: "DEALS", joined: "Nov 22, 2026", status: "Active" },
  { id: "c3", name: "Priya Shah", phone: "(808) 555-0177", keyword: "VIP", joined: "Nov 18, 2026", status: "Active" },
  { id: "c4", name: "Eli Nakamura", phone: "(808) 555-0118", keyword: "HOURS", joined: "Nov 16, 2026", status: "Pending" },
  { id: "c5", name: "Sofia Alvarez", phone: "(808) 555-0160", keyword: "EVENTS", joined: "Nov 12, 2026", status: "Active" },
  { id: "c6", name: "Chris Dalton", phone: "(808) 555-0133", keyword: "JOIN", joined: "Nov 9, 2026", status: "Unsubscribed" },
  { id: "c7", name: "Leilani Park", phone: "(808) 555-0188", keyword: "DEALS", joined: "Nov 7, 2026", status: "Active" },
  { id: "c8", name: "Noah Brooks", phone: "(808) 555-0121", keyword: "VIP", joined: "Oct 29, 2026", status: "Active" },
  { id: "c9", name: "Hana Fujimoto", phone: "(808) 555-0155", keyword: "RESTOCK", joined: "Oct 21, 2026", status: "Active" },
  { id: "c10", name: "Owen Briggs", phone: "(808) 555-0104", keyword: "JOIN", joined: "Oct 14, 2026", status: "Active" },
  { id: "c11", name: "Amina Rahman", phone: "(808) 555-0190", keyword: "EVENTS", joined: "Oct 2, 2026", status: "Pending" },
  { id: "c12", name: "Kai Mendes", phone: "(808) 555-0166", keyword: "DEALS", joined: "Sep 28, 2026", status: "Active" },
];

export const campaigns: Campaign[] = [
  {
    id: "m1",
    date: "Nov 24, 2026",
    preview: "Black Friday early list: 20% off packs until Sunday. Show this text at checkout.",
    recipients: 3104,
    audience: "DEALS",
    status: "Delivered",
  },
  {
    id: "m2",
    date: "Nov 22, 2026",
    preview: "VIP window opens at 8am. The Ridge 38 is limited to one per member.",
    recipients: 486,
    audience: "VIP",
    status: "Delivered",
  },
  {
    id: "m3",
    date: "Nov 26, 2026",
    preview: "Trail night Thursday at Kakaako, 6pm. Bring the shoes you want fitted.",
    recipients: 742,
    audience: "EVENTS",
    status: "Scheduled",
  },
  {
    id: "m4",
    date: "Nov 18, 2026",
    preview: "Holiday hours: both shops close at 4pm on Thanksgiving.",
    recipients: 12486,
    audience: "All subscribers",
    status: "Delivered",
  },
  {
    id: "m5",
    date: "Nov 11, 2026",
    preview: "Restock ping for the Coast shell. A carrier filter blocked 14 handsets.",
    recipients: 218,
    audience: "RESTOCK",
    status: "Failed",
  },
];

export const activity: Activity[] = [
  { id: "a1", time: "8 min ago", title: "Maya Chen joined", detail: "Texted JOIN to (808) 555-0100" },
  { id: "a2", time: "34 min ago", title: "DEALS campaign delivered", detail: "3,104 recipients · 98.7% delivered" },
  { id: "a3", time: "2 hr ago", title: "VIP auto-reply edited", detail: "Early-access line updated by Alex Reyes" },
  { id: "a4", time: "Yesterday", title: "Trail night scheduled", detail: "EVENTS · Nov 26 · 742 recipients" },
  { id: "a5", time: "Yesterday", title: "Chris Dalton opted out", detail: "STOP received on the JOIN list" },
  { id: "a6", time: "Nov 18", title: "Holiday hours sent", detail: "All subscribers · 12,486 recipients" },
];

export const stats = [
  { label: "Total Subscribers", value: "12,486", note: "+186 this week" },
  { label: "Messages Sent This Month", value: "48,320", note: "6 campaigns" },
  { label: "Active Keywords", value: "5", note: "1 paused" },
  { label: "Delivery Rate", value: "98.4%", note: "Last 30 days" },
];

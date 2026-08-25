"use client";

import { useState } from "react";

type Channel = { name: string; role: string; task: string; proof: string };
type Campaign = { id: string; mark: string; title: string; hook: string; audience: string; channels: Channel[] };

const campaigns: Campaign[] = [
  { id: "field-notes", mark: "FN", title: "Field Notes for a Solo Empire", hook: "Build a life that can explain itself.", audience: "operators who want a calmer system", channels: [
    { name: "Landing page", role: "anchor", task: "Clarify the promise in one screen and give the reader a reason to keep the note.", proof: "one sentence / one action" },
    { name: "Essay", role: "depth", task: "Tell the operating story through one constraint, one failure, and the rule that survived.", proof: "900 words / one lived example" },
    { name: "Newsletter", role: "return", task: "Send the smallest useful excerpt with a clear invitation to read the full field note.", proof: "Friday / direct reply" },
  ] },
  { id: "quiet-tools", mark: "QT", title: "Quiet Tools", hook: "Software that leaves room for the work.", audience: "independent makers choosing less noise", channels: [
    { name: "Positioning", role: "anchor", task: "Name the noisy category and draw a clean boundary around the tool's one job.", proof: "three contrasts / no jargon" },
    { name: "Demo script", role: "depth", task: "Show the tool handling a real small task from first input to a visible handoff.", proof: "90 seconds / one task" },
    { name: "Community note", role: "return", task: "Ask one honest question that lets early readers shape the next useful release.", proof: "one prompt / open replies" },
  ] },
  { id: "maker-log", mark: "ML", title: "The Maker Log", hook: "A public record of what actually shipped.", audience: "curious builders who value evidence", channels: [
    { name: "Case study", role: "anchor", task: "Put the shipped artifact before the backstory and let the evidence carry the claim.", proof: "artifact / decision / result" },
    { name: "Short post", role: "depth", task: "Compress one tradeoff into a note that another builder could use this week.", proof: "120 words / one rule" },
    { name: "Follow-up", role: "return", task: "Return to the original promise with what changed after real use.", proof: "two weeks / one revision" },
  ] },
];

export default function Home() {
  const [campaignId, setCampaignId] = useState("field-notes");
  const [channelIndex, setChannelIndex] = useState(0);
  const [completed, setCompleted] = useState<Record<string, number[]>>({});
  const campaign = campaigns.find((item) => item.id === campaignId) ?? campaigns[0];
  const channel = campaign.channels[channelIndex] ?? campaign.channels[0];
  const finished = completed[campaign.id] ?? [];
  const currentDone = finished.includes(channelIndex);

  function chooseCampaign(id: string) { setCampaignId(id); setChannelIndex(0); }
  function advance() {
    setCompleted((current) => ({ ...current, [campaign.id]: Array.from(new Set([...(current[campaign.id] ?? []), channelIndex])) }));
    if (channelIndex < campaign.channels.length - 1) setChannelIndex((current) => current + 1);
  }
  function resetCampaign() { setCompleted((current) => ({ ...current, [campaign.id]: [] })); setChannelIndex(0); }

  return (
    <main className="marketing-page">
      <div className="marketing-sheet">
        <header className="marketing-header"><div className="marketing-brand"><span className="brand-mark">BM</span><span>BOOKMARKETING</span></div><nav aria-label="Primary"><a href="#campaigns">Campaigns</a><a href="#sequence">Sequence</a><a href="#notes">Notes</a></nav><span className="issue-mark">ISSUE 04 / 2026</span></header>
        <section className="marketing-intro"><div><h1>One promise.<br /><em>Many echoes.</em></h1><p>A campaign desk for turning a book&apos;s clearest idea into a sequence of useful things to publish.</p></div><div className="editor-stamp"><span>EDITOR&apos;S DESK</span><strong>BM</strong><small>synthetic campaign study<br />not live analytics</small></div></section>
        <section className="campaign-workbench" id="campaigns"><aside className="campaign-rail"><div className="rail-cap"><span>CAMPAIGN FILES</span><strong>{campaigns.length} OPEN</strong></div>{campaigns.map((item) => <button key={item.id} type="button" className={item.id === campaign.id ? "campaign-row is-active" : "campaign-row"} onClick={() => chooseCampaign(item.id)} aria-pressed={item.id === campaign.id}><span>{item.mark}</span><strong>{item.title}</strong><small>{item.audience}</small></button>)}<div className="rail-caption"><span>WORKING RULE</span><p>Start with the sentence readers can repeat. Every channel earns its place by carrying it somewhere new.</p></div></aside>
          <div className="campaign-sheet" id="sequence"><div className="sheet-heading"><div><span>CAMPAIGN / {campaign.mark}</span><h2>{campaign.title}</h2><p>{campaign.audience}</p></div><div className="promise-quote">&ldquo;{campaign.hook}&rdquo;</div></div><div className="channel-track" aria-label="Campaign channel sequence">{campaign.channels.map((item, index) => <button key={item.name} type="button" className={index === channelIndex ? "channel-tab is-active" : "channel-tab"} onClick={() => setChannelIndex(index)} aria-pressed={index === channelIndex}><span className={finished.includes(index) ? "channel-check is-done" : "channel-check"}>{finished.includes(index) ? "DONE" : "NEXT"}</span><strong>{item.name}</strong><small>{item.role}</small></button>)}</div><div className="channel-brief"><div className="brief-label"><span>EDITORIAL MOVE</span><span>{String(channelIndex + 1).padStart(2, "0")} / {campaign.channels.length}</span></div><h3>{channel.name}</h3><p>{channel.task}</p><div className="proof-line"><span>HANDOFF PROOF</span><strong>{channel.proof}</strong></div><div className="brief-actions"><button type="button" className="ink-action" onClick={advance} disabled={currentDone}>{currentDone ? "Move logged" : channelIndex === campaign.channels.length - 1 ? "Log final move" : "Log and open next"}</button><button type="button" className="paper-action" onClick={resetCampaign}>Reset file</button></div></div></div>
        </section>
        <section className="notes-strip" id="notes"><div><span>THE SIGNAL</span><strong>{campaign.hook}</strong></div><p>Each campaign in this desk is synthetic. The useful output is the sequence: a clear anchor, a deeper proof, and a reason to return.</p></section>
        <footer className="marketing-footer"><span>BOOKCHAOWALIT / BOOKMARKETING</span><span>EDITORIAL CAMPAIGN DESK · SYNTHETIC DATA</span></footer>
      </div>
    </main>
  );
}

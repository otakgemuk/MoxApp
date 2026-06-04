import { useState, CSSProperties } from "react";

const FIRMS = [
  "Alpha Futures","Apex Trader Funding","Bulenox","DayTraders","E8 Futures",
  "Earn2Trade","Funded Futures Network","Legends Trading","Lucid Trading",
  "MyFundedFutures","OneUp","PhidiasPropfirm","Phoenix Trader Funding",
  "Purdia Capital","TakeProfitTrader","TradeDay","Tradeify","Trading Pit"
];
const ANGLES = [
  { id:"pain",       label:"Trader Pain Point" },
  { id:"promo",      label:"Discount Promo" },
  { id:"lifestyle",  label:"Funded Lifestyle" },
  { id:"lowbarrier", label:"Low Barrier to Entry" },
  { id:"volatility", label:"Market Volatility" },
  { id:"story",      label:"Success Story" },
];
const PLATFORMS = ["Twitter","Facebook","Instagram"];
const PILLARS   = ["Redundancy","Economics","Speed","Scalability"];
const HOOTSUITE_NETWORK: Record<string, string> = { Twitter:"TWITTER", Facebook:"FACEBOOK", Instagram:"INSTAGRAM" };
const CODE = "MOT";

// ─── CONTENT LIBRARY ───────────────────────────────────────────────────────
const buildLibrary = (firm: string) => ({
  pain:{
    Redundancy:{
      Twitter:[
        `Most futures traders blow up before they find their edge.\n\nNot because they're bad traders. Because they were undercapitalized.\n\n${firm} gives you the redundancy to keep trading when markets correct.`,
        `One bad week shouldn't end your trading career.\n\nWith ${firm}, it doesn't.\n\nMultiple account options. Restart protocols. Built-in redundancy.\n\nCode ${CODE}. Link in bio.\n\n#FundedTrader`,
        `Personal account blown. Again.\n\nThe cycle ends when you stop using scared money.\n\n${firm} funds you. You trade the plan.\n\nCode ${CODE} → link in bio.\n\n#PropFirm #ScaredMoney`,
        `Redundancy isn't weakness. It's strategy.\n\n${firm} traders don't rely on one account. They build systems.\n\nCode ${CODE}. Link in bio.\n\n#FuturesTrading #FundedTrader`,
      ],
      Facebook:[
        `Let me be direct with you.\n\nThe reason most futures traders fail isn't their strategy. It's that they have no redundancy. One bad week wipes them out entirely.\n\n${firm} solves this structural problem.`,
        `Week two of the month and you've already hit your personal account's pain threshold.\n\nSound familiar?\n\n${firm} builds redundancy into your trading operation. Funded accounts don't punish you for drawdowns.`,
        `Three things that drain trading accounts fast:\n\n→ No defined max loss\n→ Revenge trading after losses\n→ Scared money decisions\n\n${firm} addresses all three at the structural level.`,
        `If your trading relies on one account with no backup plan, that's not a business. That's a gamble.\n\n${firm} funded traders operate differently. Multiple accounts. Clear drawdown rules. Real redundancy.`,
      ],
      Instagram:[
        `One blown account shouldn't end your trading career.\n\n${firm} builds redundancy into your operation.\n\nTrade their capital. Protect yours.\n\nCode ${CODE} — link in bio.\n\n#PropFirm`,
        `Scared money destroys good traders.\n\nThe fix is structural — not psychological.\n\n${firm} removes personal capital from the equation.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrading`,
        `Your edge is real. Your capital is the problem.\n\n${firm} solves the capital problem.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrader #PropFirm #GetFunded #TradeSharp #DayTrader`,
        `Built-in redundancy. Clear rules. Real payouts.\n\nThat's what ${firm} offers funded traders.\n\nCode ${CODE} — link in bio.\n\n#FundedTrader #PropFirm #FuturesTrading #MightyOxTrading`,
      ],
    },
    Economics:{
      Twitter:[
        `The math on self-funding a futures account doesn't work for most traders.\n\n${firm} changes the economics entirely.\n\nYou pass. You get funded. You keep the majority of profits.\n\nCode ${CODE}.`,
        `Eval fee vs. 6 months of blown personal accounts.\n\nRun the numbers.\n\n${firm} + code ${CODE} is the better economic decision.\n\nLink in bio.\n\n#FundedTrader #PropFirm`,
        `The economics of prop trading:\n\n→ Pay a small eval fee\n→ Trade firm capital\n→ Keep 80-90% of profits\n→ Scale up over time\n\n${firm} runs this model. Code ${CODE} at checkout.`,
        `Stop paying tuition to the market with your own money.\n\n${firm} changes the risk/reward economics of your trading career.\n\nCode ${CODE}. Link in bio.\n\n#FuturesTrader #PropFirm #GetFunded`,
      ],
      Facebook:[
        `Let's talk economics.\n\nA typical futures trader self-funding a $50k account risks real capital every session. One bad week = a significant personal loss.\n\n${firm}'s evaluation model flips this.`,
        `Here's a number most traders don't calculate: the true cost of trading undercapitalized.\n\nIt's not just the losses. It's the psychological cost of trading scared. The bad decisions that follow.`,
        `Prop trading economics in plain terms:\n\n1. Eval fee (small)\n2. Hit profit target within rules\n3. Get funded\n4. Keep 80-90% of profits\n5. Scale\n\nThat's the model. ${firm} executes it perfectly.`,
        `The question isn't whether the eval fee is worth it.\n\nThe question is what it costs you to keep trading undercapitalized for another year.\n\n${firm} + code ${CODE}. Link in bio.`,
      ],
      Instagram:[
        `The economics of futures trading change entirely when it's not your money at risk.\n\n${firm} funds you. You trade. You split profits.\n\nCode ${CODE} — link in bio.\n\n#PropFirm #FuturesTrading`,
        `Eval fee vs. year of losses.\n\nRun the math.\n\n${firm} + code ${CODE} wins.\n\nLink in bio.\n\n#PropFirm #FundedTrader #FuturesTrading #MightyOxTrading`,
        `Trading their capital. Keeping your profits.\n\nThat's the ${firm} economic model.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrader #GetFunded #PropFirm #TradeSharp`,
        `Stop using your savings as trading capital.\n\n${firm} changes the equation.\n\nCode ${CODE} — link in bio.\n\n#FundedTrader #PropFirm #FuturesTrading #DayTrader`,
      ],
    },
    Speed:{
      Twitter:[
        `How long does it take to get funded with ${firm}?\n\nAs long as it takes you to hit the profit target within the rules.\n\nNo arbitrary time limits. You trade your plan at your pace.\n\nCode ${CODE}.`,
        `Traders who rush the eval fail.\n\nTraders who trade their process pass.\n\n${firm} rewards consistency, not speed.\n\nCode ${CODE}. Link in bio.\n\n#PropFirm #TradingDiscipline`,
        `The fastest path to a funded account isn't trading faster.\n\nIt's trading cleaner.\n\n${firm} rewards that approach.\n\nCode ${CODE}. Link in bio.\n\n#FuturesTrading #FundedTrader`,
        `Fast-tracked or methodical — ${firm}'s eval process accommodates your trading style.\n\nHit the target. Respect the rules. Get funded.\n\nCode ${CODE}. Link in bio.\n\n#FundedTrader #FuturesTrading`,
      ],
      Facebook:[
        `One question I get often: "How fast can I pass the ${firm} eval?"\n\nHonest answer: as fast as your trading edge allows.\n\nIf you have a real process, some traders pass in days. Others take weeks.`,
        `Rushing the evaluation is one of the top reasons traders fail.\n\nThey see the profit target and size up. Overtrade. Blow the drawdown.\n\n${firm}'s rules exist to protect both sides. Work WITH them.`,
        `The traders who pass ${firm} evals quickly aren't the most aggressive ones.\n\nThey're the most disciplined ones.\n\nConsistent daily process. Respect the max loss. Hit singles.\n\nCode ${CODE}.`,
        `Speed is a byproduct of process — not a goal in itself.\n\nThe traders I see pass ${firm} evals fastest are following a defined trading plan. Session by session.\n\nCode ${CODE} at checkout.`,
      ],
      Instagram:[
        `Fast eval or slow eval — the only metric that matters is: did you follow the rules?\n\n${firm} rewards clean process, not speed.\n\nCode ${CODE} — link in bio.\n\n#PropFirm #TradingDiscipline`,
        `Singles over home runs.\n\nThat's how funded traders pass ${firm} evals.\n\nCode ${CODE} — link in bio.\n\n#FundedTrader #PropFirm #DisciplineWins #FuturesTrader`,
        `Your edge doesn't need speed. It needs repetition.\n\n${firm} gives you the environment to prove that.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrading #PropFirm #TradeSharp #MightyOxTrading`,
        `Rushed the eval. Blew the drawdown. Back to square one.\n\nTrade your process. ${firm} rewards consistency.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrading #TradingMindset #PropFirm`,
      ],
    },
    Scalability:{
      Twitter:[
        `Getting funded with ${firm} isn't the destination.\n\nIt's the starting point.\n\nConsistent traders scale. Multiple accounts. Higher targets. Real income.\n\nCode ${CODE}. Link in bio.\n\n#PropFirm`,
        `Scalability is why prop trading beats personal accounts long term.\n\nWith ${firm}: prove your edge → get funded → scale capital → grow payouts.\n\nCode ${CODE}. Link in bio.\n\n#FuturesTrading`,
        `One funded account becomes two. Two becomes a system.\n\nThat's how ${firm} traders build scalable income streams.\n\nCode ${CODE}. Link in bio.\n\n#FuturesTrading #PropFirm`,
        `The ceiling on personal account trading is your savings.\n\nThe ceiling on ${firm} trading is your consistency.\n\nCode ${CODE}. Link in bio.\n\n#PropFirm #FuturesTrading #ScaleUp`,
      ],
      Facebook:[
        `Most traders think of a funded account as a goal.\n\nThe smarter traders think of it as infrastructure.\n\n${firm} lets consistent traders run multiple funded accounts simultaneously. You focus on trading.`,
        `Here's how the ${firm} scalability model works in practice:\n\nPass eval → get funded → trade consistently → request payout → add second account → repeat.\n\nYour personal capital stays untouched.`,
        `Scaling a trading operation used to require serious personal capital.\n\n${firm} changes that. Your edge is the asset. Their capital is the infrastructure.\n\nCode ${CODE}. Link in bio.`,
        `A question worth sitting with: what does your trading operation look like at 5x the current account size?\n\n${firm} makes that question answerable without risking your own money.\n\nCode ${CODE}.`,
      ],
      Instagram:[
        `One account is a start. Five accounts is a system.\n\n${firm} traders build scalable operations.\n\nCode ${CODE} — link in bio.\n\n#FundedTrader #PropFirm #ScaleUp #FuturesTrader`,
        `Eval → funded → consistent → scale.\n\nThat's the ${firm} growth path.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrader #PropFirm #TradeSharp #GetFunded`,
        `Your edge scales. Your capital doesn't have to.\n\n${firm} funds the growth.\n\nCode ${CODE} — link in bio.\n\n#PropFirm #FuturesTrading #MightyOxTrading #FundedTrader`,
        `The ceiling on your trading income is your consistency — not your savings.\n\n${firm} makes that real.\n\nCode ${CODE} — link in bio.\n\n#FundedTrader #ScaleUp #PropFirm #FuturesTrading`,
      ],
    },
  },
  promo:{
    Redundancy:{
      Twitter:[`Promo live: ${firm} eval discount + code ${CODE}.\n\nFewer excuses. More funded accounts.\n\nLink in bio.\n\n#PropFirm #FuturesTrading`,`${firm} discount still running.\n\nCode ${CODE}. Link in bio.`],
      Facebook:[`Quick heads-up — ${firm} is running a discount on evaluation accounts.\n\nStack with affiliate code ${CODE} for extra savings.\n\nI've personally vetted this firm: transparent rules, real results.`],
      Instagram:[`Promo alert: ${firm} eval fees just dropped.\n\nCode ${CODE} at checkout.\n\nLink in bio.\n\n#PropFirm #FundedFutures #TradingPromo #FuturesTrader #TradeSharp`,`${firm} discount active now.`],
    },
    Economics:{
      Twitter:[`${firm} eval cost vs. months of personal account losses.\n\nRun the math.\n\nCode ${CODE}. Link in bio.\n\n#PropFirm #FuturesTrading`,`The economics of getting funded have never been better.`],
      Facebook:[`The economic argument for ${firm} is simple: a discounted eval fee vs. trading undercapitalized for another quarter.\n\nThe numbers favor the eval. Code ${CODE} at checkout.`,`${firm} + code ${CODE} = competitive advantage.`],
      Instagram:[`${firm} eval economics → code ${CODE} makes it cheaper.\n\nLink in bio.\n\n#PropFirm #FuturesTrader #TradeSharp`,`Low eval fee. Firm capital. Real payouts.\n\n${firm} + code ${CODE}.`],
    },
    Speed:{
      Twitter:[`Pass the ${firm} eval at your pace.\n\nNo time limits. Just process.\n\nCode ${CODE}. Link in bio.\n\n#PropFirm #FuturesTrading`,`Discount on ${firm} evals = lower cost per attempt.`],
      Facebook:[`The ${firm} eval has no arbitrary time limit. Trade your process until you hit the target.\n\nThe promo makes the entry cost lower. Code ${CODE} at checkout.`,`Speed tip for the ${firm} eval: focus on consistency.`],
      Instagram:[`No time limit. Just process.\n\n${firm} + code ${CODE}.\n\nLink in bio.\n\n#PropFirm #FundedTrader #FuturesTrader`,`Cheaper entry = less pressure on the eval.\n\n${firm} promo active.`],
    },
    Scalability:{
      Twitter:[`Start with one ${firm} eval. Scale to multiple funded accounts.\n\nCode ${CODE} makes the first step cheaper.\n\nLink in bio.\n\n#PropFirm #FuturesTrading`,`${firm} promo = lower barrier to scaling.`],
      Facebook:[`Every scalable ${firm} trading operation started with a single eval.\n\nThe promo makes that first step cheaper. Code ${CODE} at checkout.`,`${firm} traders who scale run multiple accounts simultaneously.`],
      Instagram:[`One funded account is the start.\n\n${firm} promo makes it cheaper to begin.\n\nCode ${CODE} — link in bio.\n\n#PropFirm #FundedTrader #ScaleUp`,`Scale starts with step one.\n${firm} makes it affordable.`],
    },
  },
});

// Inline single-post templates (one-time / weekly preview)
const singlePost = {
  pain:{
    Twitter:(f: string)=>`Most futures traders fail because of undercapitalization — not bad strategy.\n\n${f} gives you the capital. You bring the edge.\n\nCode ${CODE} → link in bio.\n\n#PropFirm #FuturesTrading`,
    Facebook:(f: string)=>`Let me be honest with you.\n\nMost aspiring futures traders don't fail because they lack skill. They fail because they're undercapitalized, overleveraged, and trading scared money.\n\n${f} fixes this.`,
    Instagram:(f: string)=>`Trading with scared money is the #1 reason most futures traders blow up.\n\nNot lack of skill. Not bad setups. Scared money.\n\n${f} removes that from the equation.\n\nCode ${CODE} — link in bio.`,
  },
  promo:{
    Twitter:(f: string)=>`${f} promo is live.\n\nUse code ${CODE} at checkout.\n\nFewer excuses. More funded accounts.\n\n#PropFirm #FuturesTrading #FundedTrader`,
    Facebook:(f: string)=>`Quick heads-up — ${f} currently has a discount on evaluation accounts.\n\nStack with code ${CODE} for additional savings.\n\nI've personally vetted this firm — solid rules, real support.`,
    Instagram:(f: string)=>`Promo alert — ${f} eval fees just got cheaper.\n\nCode ${CODE} at checkout.\n\nThe cost of entry is lower than your last losing trade.\n\nLink in bio.\n\n#PropFirm #FundedFutures`,
  },
  lifestyle:{
    Twitter:(f: string)=>`Funded trader life isn't glamorous.\n\nIt's discipline. Process. Consistency.\n\n${f} gives you the capital to execute that process at scale.\n\nCode ${CODE}. Link in bio.\n\n#FuturesTrading`,
    Facebook:(f: string)=>`I want to paint a realistic picture of what getting funded actually looks like.\n\nIt's not lambos and beach trades. It's waking up at market open, executing your plan without emotion.`,
    Instagram:(f: string)=>`Wake up. Review the plan. Execute. Log off.\n\nThat's the funded trader routine.\n\n${f} funds traders who can do that consistently.\n\nCode ${CODE} — link in bio.\n\n#FundedTrader`,
  },
  lowbarrier:{
    Twitter:(f: string)=>`You don't need $50k to trade futures seriously.\n\n${f} eval accounts start at a fraction of that.\n\nCode ${CODE} makes it even cheaper.\n\n#FuturesTrading #PropFirm #GetFunded`,
    Facebook:(f: string)=>`The barrier to getting a funded futures account is lower than most people think.\n\n${f} has evaluation accounts at multiple sizes — you pick what fits your skill level and budget.`,
    Instagram:(f: string)=>`Getting funded doesn't require a massive bankroll.\n\n${f} eval → prove your edge → get funded → split profits.\n\nCode ${CODE} cuts the upfront cost.\n\nLink in bio.\n\n#FundedTrader`,
  },
  volatility:{
    Twitter:(f: string)=>`Volatility is back. ES and NQ are moving.\n\nThis is when funded traders make their month.\n\n${f} — code ${CODE}. Link in bio.\n\n#ESFutures #NQFutures #FuturesTrading`,
    Facebook:(f: string)=>`Markets are moving right now. If you've been waiting for "the right time" to get a funded account — this is it.\n\nVolatility creates opportunity. Opportunity rewards prepared traders.`,
    Instagram:(f: string)=>`ES and NQ are moving.\n\nThis is what funded traders train for.\n\n${f} puts capital behind traders who are ready for moments like this.\n\nCode ${CODE} — link in bio.\n\n#FuturesTrading`,
  },
  story:{
    Twitter:(f: string)=>`Trader passes ${f} eval on the second attempt.\n\nFirst attempt: revenge traded after a bad session.\nSecond attempt: followed the plan. Hit the target.\n\nProcess > emotion. Always.\n\nCode ${CODE}.`,
    Facebook:(f: string)=>`Here's a story I hear a lot.\n\nTrader blows their personal account. Frustrated, they almost quit. Then they discover prop firms — specifically ${f}.\n\nThey take the eval seriously. They pass. They rebuild.`,
    Instagram:(f: string)=>`From blown account to funded trader.\n\nThat's the story ${f} makes possible.\n\nYou don't need a perfect record. You need a proven process.\n\nCode ${CODE} at checkout.\n\nLink in bio.\n\n#FundedTrader`,
  },
} as const;

// ─── SCHEDULE BUILDERS ──────────────────────────────────────────────────────
function fmtDate(date: Date, time: string): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mo = String(date.getMonth()+1).padStart(2,"0");
  const dd = String(date.getDate()).padStart(2,"0");
  return `${yy}/${mo}/${dd} ${time}`;
}

interface ScheduleItem {
  date: string;
  message: string;
  network: string;
  platform: string;
  pillar: string;
  week: number;
  day: number;
}

function buildOneTime(firm: string, angle: string, platforms: string[], startDate: Date, postTime: string): ScheduleItem[] {
  const lib = (singlePost as Record<string, any>)[angle] || singlePost.pain;
  return platforms.map((p, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return { date: fmtDate(d, postTime), message: (lib[p as keyof typeof lib]||lib.Twitter)(firm), network: HOOTSUITE_NETWORK[p], platform: p, pillar:"—", week:1, day:i+1 };
  });
}

function buildWeekly(firm: string, angle: string, platforms: string[], startDate: Date, postTime: string): ScheduleItem[] {
  const lib = buildLibrary(firm);
  const angleData = (lib as Record<string, any>)[angle] || (lib as Record<string, any>).pain;
  const rows: ScheduleItem[] = [];
  PILLARS.forEach((pillar, pIdx) => {
    const pillarData = angleData[pillar] || angleData[PILLARS[0]];
    platforms.forEach((platform, platIdx) => {
      const postArr = pillarData[platform] || pillarData[platforms[0]];
      const text = postArr[pIdx % postArr.length];
      const d = new Date(startDate);
      d.setDate(d.getDate() + pIdx * 7 + platIdx);
      rows.push({ date: fmtDate(d, postTime), message: text.replace(/"/g,'""'), network: HOOTSUITE_NETWORK[platform], platform, pillar, week: pIdx+1, day: pIdx*7+platIdx+1 });
    });
  });
  return rows;
}

function buildFourWeek(firm: string, angle: string, platforms: string[], startDate: Date, postTime: string): ScheduleItem[] {
  const lib = buildLibrary(firm);
  const angleData = (lib as Record<string, any>)[angle] || (lib as Record<string, any>).pain;
  const rows: ScheduleItem[] = [];
  let dayCount = 0;
  PILLARS.forEach((pillar, pillarIdx) => {
    const pillarData = angleData[pillar] || angleData[PILLARS[0]];
    for (let d = 0; d < 7; d++) {
      const platform = platforms[d % platforms.length];
      const weekPostIdx = Math.floor(d / platforms.length) % 4;
      const postArr = pillarData[platform] || pillarData[platforms[0]];
      const text = postArr[weekPostIdx % postArr.length];
      const date = new Date(startDate);
      date.setDate(date.getDate() + dayCount);
      rows.push({ date: fmtDate(date, postTime), message: text.replace(/"/g,'""'), network: HOOTSUITE_NETWORK[platform], platform, pillar, week: pillarIdx+1, day: dayCount+1 });
      dayCount++;
    }
  });
  return rows;
}

function toCSV(rows: ScheduleItem[]): string {
  const lines = [["Date","Message","Networks"].join(",")];
  rows.forEach((r) => lines.push([`"${r.date}"`,`"${r.message}"`,`"${r.network}"`].join(",")));
  return lines.join("\n");
}

function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type:"text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ─── STYLES ──────────────────────────────────────────────────────────
const C = { bg:"#0a0c0f", card:"#0f1623", border:"#1e2a3a", gold:"#f5c842", green:"#22c87a", blue:"#3b82f6", text:"#e2e8f0", muted:"#64748b" };
const pColor: Record<string, string> = { Redundancy:"#3b82f6", Economics:"#22c87a", Speed:"#f5c842", Scalability:"#a78bfa" };

const s: Record<string, any> = {
  wrap:     { fontFamily:"'DM Mono','Space Mono',monospace", background:C.bg, minHeight:"100vh", padding:"20px 18px", color:C.text, boxSizing:"border-box" } as CSSProperties,
  brand:    { color:C.green, fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", margin:"0 0 3px" } as CSSProperties,
  title:    { color:C.gold,  fontSize:"18px", fontWeight:"bold", margin:"0 0 18px" } as CSSProperties,
  label:    { color:C.muted, fontSize:"10px", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"5px", display:"block" } as CSSProperties,
  select:   { width:"100%", background:C.card, border:`1px solid ${C.border}`, color:C.text, padding:"9px 10px", borderRadius:"5px", fontSize:"12px", fontFamily:"inherit", cursor:"pointer", boxSizing:"border-box" } as CSSProperties,
  input:    { width:"100%", background:C.card, border:`1px solid ${C.border}`, color:C.text, padding:"9px 10px", borderRadius:"5px", fontSize:"12px", fontFamily:"inherit", boxSizing:"border-box" } as CSSProperties,
  grid2:    { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"12px" } as CSSProperties,
  tabRow:   { display:"flex", gap:"6px", marginBottom:"12px", flexWrap:"wrap" } as CSSProperties,
  tab:   (a: boolean): CSSProperties => ({ padding:"7px 13px", borderRadius:"5px", fontSize:"11px", fontFamily:"inherit", cursor:"pointer", border:a?`1px solid ${C.gold}`:`1px solid ${C.border}`, background:a?"#1a1400":C.card } as CSSProperties),
  modeTab:(a: boolean): CSSProperties => ({ padding:"9px 16px", borderRadius:"5px", fontSize:"11px", fontFamily:"inherit", cursor:"pointer", border:a?`1px solid ${C.green}`:`1px solid ${C.border}`, background:a?"#0d2e1f":C.card } as CSSProperties),
  platBtn:(a: boolean): CSSProperties => ({ padding:"6px 13px", borderRadius:"5px", fontSize:"11px", fontFamily:"inherit", cursor:"pointer", border:a?`1px solid ${C.blue}`:`1px solid ${C.border}`, background:a?"#0d1f3c":C.card } as CSSProperties),
  genBtn: (d: boolean): CSSProperties => ({ width:"100%", padding:"13px", background:d?C.card:C.green, border:"none", borderRadius:"5px", color:d?C.muted:C.bg, fontSize:"12px", fontWeight:"bold", fontFamily:"inherit", cursor:"pointer" } as CSSProperties),
  csvBtn:   { padding:"9px 16px", background:C.gold, border:"none", borderRadius:"5px", color:C.bg, fontSize:"11px", fontWeight:"bold", fontFamily:"inherit", cursor:"pointer", letterSpacing:"1px" } as CSSProperties,
  divider:  { borderTop:`1px solid ${C.border}`, margin:"18px 0" } as CSSProperties,
  postCard:(p: string): CSSProperties => ({ background:C.card, border:`1px solid ${C.border}`, borderLeft:`3px solid ${pColor[p]||C.gold}`, borderRadius:"7px", padding:"14px", marginBottom:"8px" } as CSSProperties),
  metaRow:  { display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"8px" } as CSSProperties,
  tag:   (c: string): CSSProperties => ({ fontSize:"10px", letterSpacing:"1px", textTransform:"uppercase", color:c, border:`1px solid ${c}`, borderRadius:"3px", padding:"2px 7px" } as CSSProperties),
  postText: { color:C.text, fontSize:"11px", lineHeight:"1.8", whiteSpace:"pre-wrap", margin:0, fontFamily:"inherit" } as CSSProperties,
  row:      { display:"flex", justifyContent:"space-between", alignItems:"center" } as CSSProperties,
  copyBtn:(ok: boolean): CSSProperties => ({ padding:"4px 10px", background:"transparent", border:ok?`1px solid ${C.green}`:`1px solid ${C.border}`, borderRadius:"4px", color:ok?C.green:C.muted, fontSize:"10px", fontFamily:"inherit" } as CSSProperties),
  summBox:  { background:C.card, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"14px", marginBottom:"14px" } as CSSProperties,
  statGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginTop:"10px" } as CSSProperties,
  statNum:  { color:C.gold, fontSize:"20px", fontWeight:"bold", textAlign:"center" } as CSSProperties,
  statLbl:  { color:C.muted, fontSize:"9px", letterSpacing:"1px", textTransform:"uppercase", marginTop:"2px", textAlign:"center" } as CSSProperties,
  filterBtn:(a: boolean): CSSProperties => ({ padding:"5px 11px", borderRadius:"4px", fontSize:"10px", fontFamily:"inherit", cursor:"pointer", border:a?`1px solid ${C.gold}`:`1px solid ${C.border}`, background:a?"#1a1400":C.card } as CSSProperties),
  infoBox:  { background:"#0a1628", border:`1px solid ${C.border}`, borderRadius:"6px", padding:"10px 14px", marginBottom:"12px" } as CSSProperties,
};

const MODES = [
  { id:"onetime",  label:"One-Time Post" },
  { id:"weekly",   label:"Weekly Program" },
  { id:"campaign", label:"4-Week Campaign" },
];

const modeDesc: Record<string, string> = {
  onetime:  "Generates one post per selected platform, scheduled on consecutive days. Exports a ready-to-import HootSuite CSV.",
  weekly:   "One post per pillar per platform across 4 weeks (Redundancy → Economics → Speed → Scalability). Ideal for a steady evergreen drip.",
  campaign: "Full 28-post campaign. 7 days per pillar. Platforms rotate daily. Complete HootSuite CSV with YY/MM/DD scheduling.",
};

export default function ContentGenerator() {
  const [mode,       setMode]       = useState<string>("onetime");
  const [firm,       setFirm]       = useState<string>("");
  const [angle,      setAngle]      = useState<string>("pain");
  const [platforms,  setPlatforms]  = useState<string[]>(["Twitter"]);
  const [startDate,  setStartDate]  = useState<string>(()=>new Date().toISOString().split("T")[0]);
  const [postTime,   setPostTime]   = useState<string>("09:00");
  const [schedule,   setSchedule]   = useState<ScheduleItem[] | null>(null);
  const [copied,     setCopied]     = useState<Record<string|number, boolean>>({});
  const [filterWeek, setFilterWeek] = useState<number>(0);
  const [filterPillar,setFilterPillar]=useState<string>("All");

  const togglePlat = (p: string) => setPlatforms(prev =>
    prev.includes(p) ? (prev.length > 1 ? prev.filter(x=>x!==p) : prev) : [...prev,p]
  );

  const copy = (key: string | number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(p=>({...p,[key]:true}));
    setTimeout(()=>setCopied(p=>({...p,[key]:false})),2000);
  };

  const generate = () => {
    if (!firm) return;
    const d = new Date(startDate);
    let rows: ScheduleItem[];
    if      (mode==="onetime")  rows = buildOneTime(firm,angle,platforms,d,postTime);
    else if (mode==="weekly")   rows = buildWeekly(firm,angle,platforms,d,postTime);
    else                         rows = buildFourWeek(firm,angle,platforms,d,postTime);
    setSchedule(rows);
    setFilterWeek(0); setFilterPillar("All"); setCopied({});
  };

  const handleExport = () => {
    if (!schedule) return;
    const csv  = toCSV(schedule);
    const slug = firm.replace(/\s+/g,"_");
    const d    = new Date(startDate);
    const ds   = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
    downloadCSV(csv, `MightyOx_${slug}_${mode}_${angle}_${ds}.csv`);
  };

  const displayed = (schedule||[]).filter(r=>
    (filterWeek===0 || r.week===filterWeek) &&
    (filterPillar==="All" || r.pillar===filterPillar)
  );

  const totalPosts   = schedule?.length || 0;
  const totalWeeks   = mode==="onetime" ? 1 : 4;
  const totalPillars = mode==="onetime" ? 1 : 4;
  const disabled     = !firm || platforms.length===0;

  return (
    <div style={s.wrap}>
      <p style={s.brand}>MightyOx Trading · Affiliate Campaign Suite</p>
      <h1 style={s.title}>Content Generator & HootSuite Exporter</h1>

      {/* Mode selector */}
      <span style={s.label}>Campaign Mode</span>
      <div style={{...s.tabRow, gap:"8px", marginBottom:"8px"}}>
        {MODES.map(m=>(
          <button key={m.id} style={s.modeTab(mode===m.id)} onClick={()=>{setMode(m.id);setSchedule(null);}}>
            {m.label}
          </button>
        ))}
      </div>
      <div style={{...s.infoBox, marginBottom:"14px"}}>
        <span style={{color:C.muted, fontSize:"10px"}}>{modeDesc[mode]}</span>
      </div>

      {/* Firm + Angle */}
      <div style={s.grid2}>
        <div>
          <span style={s.label}>Prop Firm</span>
          <select style={s.select} value={firm} onChange={e=>{setFirm(e.target.value);setSchedule(null);}}>
            <option value="">— Select firm —</option>
            {FIRMS.map(f=><option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <span style={s.label}>Campaign Angle</span>
          <select style={s.select} value={angle} onChange={e=>{setAngle(e.target.value);setSchedule(null);}}>
            {ANGLES.map(a=><option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
        </div>
      </div>

      {/* Date + Time */}
      <div style={s.grid2}>
        <div>
          <span style={s.label}>Start Date</span>
          <input style={s.input} type="date" value={startDate} onChange={e=>{setStartDate(e.target.value);setSchedule(null);}} />
        </div>
        <div>
          <span style={s.label}>Post Time</span>
          <input style={s.input} type="time" value={postTime} onChange={e=>{setPostTime(e.target.value);setSchedule(null);}} />
        </div>
      </div>

      {/* Platforms */}
      <span style={s.label}>Platforms</span>
      <div style={s.tabRow}>
        {PLATFORMS.map(p=>(
          <button key={p} style={s.platBtn(platforms.includes(p))} onClick={()=>{togglePlat(p);setSchedule(null);}}>
            {p}
          </button>
        ))}
      </div>

      {/* Pillar info — only for multi-week modes */}
      {mode!=="onetime" && (
        <div style={{...s.infoBox,marginBottom:"14px"}}>
          <span style={{color:C.muted,fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase"}}>Pillar Rotation</span>
          <div style={{...s.metaRow,marginTop:"6px"}}>
            {PILLARS.map(p=><span key={p} style={s.tag(pColor[p])}>{`Wk ${PILLARS.indexOf(p)+1}: ${p}`}</span>)}
          </div>
        </div>
      )}

      <button style={s.genBtn(disabled)} onClick={generate} disabled={disabled}>
        Generate {mode==="onetime"?"Posts":mode==="weekly"?"Weekly Schedule":"4-Week Campaign"}
      </button>

      {/* ── OUTPUT ── */}
      {schedule && (
        <>
          <div style={s.divider} />

          {/* Summary bar */}
          <div style={s.summBox}>
            <div style={s.row}>
              <span style={{color:C.gold,fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>
                {firm} · {ANGLES.find(a=>a.id===angle)?.label} · {MODES.find(m=>m.id===mode)?.label}
              </span>
              <button style={s.csvBtn} onClick={handleExport}>⬇ Export CSV</button>
            </div>
            <div style={s.statGrid}>
              <div><div style={s.statNum}>{totalPosts}</div><div style={s.statLbl}>Posts</div></div>
              <div><div style={s.statNum}>{totalWeeks}</div><div style={s.statLbl}>Weeks</div></div>
              <div><div style={s.statNum}>{totalPillars}</div><div style={s.statLbl}>Pillars</div></div>
              <div><div style={s.statNum}>{platforms.length}</div><div style={s.statLbl}>Platform{platforms.length>1?"s":""}</div></div>
            </div>
            <div style={{marginTop:"10px",color:C.muted,fontSize:"10px"}}>
              Date format: <span style={{color:C.green}}>YY/MM/DD HH:MM</span> · HootSuite-compatible · Code: <span style={{color:C.gold}}>{CODE}</span>
            </div>
          </div>

          {/* Filters — only useful for multi-post outputs */}
          {mode!=="onetime" && (
            <>
              <span style={s.label}>Filter Week</span>
              <div style={{...s.tabRow,marginBottom:"10px"}}>
                {[0,1,2,3,4].map(w=>(
                  <button key={w} style={s.filterBtn(filterWeek===w)} onClick={()=>setFilterWeek(w)}>
                    {w===0?"All":  `Wk ${w}`}
                  </button>
                ))}
              </div>
              <span style={s.label}>Filter Pillar</span>
              <div style={{...s.tabRow,marginBottom:"14px"}}>
                {["All",...PILLARS].map(p=>(
                  <button key={p} style={s.filterBtn(filterPillar===p)} onClick={()=>setFilterPillar(p)}>{p}</button>
                ))}
              </div>
            </>
          )}

          {/* Post cards */}
          {displayed.map((r,i)=>(
            <div key={i} style={s.postCard(r.pillar)}>
              <div style={s.metaRow}>
                {r.pillar!=="—" && <span style={s.tag(pColor[r.pillar]||C.gold)}>{r.pillar}</span>}
                <span style={s.tag(C.blue)}>{r.platform}</span>
                <span style={s.tag(C.muted)}>Day {r.day}</span>
                <span style={s.tag(C.green)}>{r.date}</span>
              </div>
              <pre style={s.postText}>{r.message}</pre>
              <div style={{...s.row,marginTop:"10px"}}>
                <span style={{color:C.border,fontSize:"10px"}}>{r.message.length} chars</span>
                <button style={s.copyBtn(copied[i])} onClick={()=>copy(i,r.message)}>
                  {copied[i]?"Copied ✓":"Copy"}
                </button>
              </div>
            </div>
          ))}

          <div style={{textAlign:"center",marginTop:"16px",paddingBottom:"20px"}}>
            <button style={s.csvBtn} onClick={handleExport}>⬇ Export HootSuite CSV</button>
          </div>
        </>
      )}
    </div>
  );
}

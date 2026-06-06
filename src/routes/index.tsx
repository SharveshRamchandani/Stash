import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Lock,
  TrendingUp,
  TrendingDown,
  Coins,
  PiggyBank,
  LineChart,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  Share2,
  HandCoins,
  Wallet,
  AlertTriangle,
  Target,
  Loader2,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stash — Start Investing, Gently" },
      { name: "description", content: "A calm, beginner-friendly first investing app." },
    ],
  }),
  component: Stash,
});

type Goal = "Emergency Fund" | "Buying Something" | "Travel" | "Future Security";
type OptionKey = "fd" | "sip" | "gold";

const OPTIONS: Record<
  OptionKey,
  { name: string; rate: number; risk: number; line: string; how: string; badge: string; badgeColor: string }
> = {
  fd: {
    name: "Fixed Deposit",
    rate: 0.065,
    risk: 1,
    line: "Like a bank locker for your money.",
    how: "You park money with a bank for a fixed time. The bank pays a guaranteed interest. Very low risk, low-but-steady returns.",
    badge: "Safest",
    badgeColor: "bg-primary-soft text-foreground",
  },
  sip: {
    name: "Mutual Fund SIP",
    rate: 0.11,
    risk: 3,
    line: "A small amount auto-invested every month into a basket of companies.",
    how: "Fund managers pool money from many people and invest it across many companies. You buy a tiny slice every month, so ups and downs even out over time.",
    badge: "Recommended",
    badgeColor: "bg-primary text-primary-foreground",
  },
  gold: {
    name: "Digital Gold",
    rate: 0.085,
    risk: 2,
    line: "You buy small amounts of real gold, stored safely online.",
    how: "Every rupee buys you a fraction of real, vaulted gold. Its value moves with gold prices — generally steady, sometimes shiny.",
    badge: "Shiny pick",
    badgeColor: "bg-[color:var(--gold)] text-foreground",
  },
};

function Stash() {
  const [step, setStep] = useState(1);
  const total = 7;
  const [monthly, setMonthly] = useState(200);
  const [goal, setGoal] = useState<Goal>("Emergency Fund");
  const [choice, setChoice] = useState<OptionKey>("sip");

  // Calculator state
  const [calcAmt, setCalcAmt] = useState(200);
  const [calcYears, setCalcYears] = useState(2);

  useEffect(() => {
    if (step === 7) {
      // Big initial pop!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#A2B997", "#B997A2", "#E8D9A8"],
      });

      const end = Date.now() + 1500;
      const colors = ["#A2B997", "#B997A2", "#E8D9A8"];
      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [step]);

  const go = (n: number) => setStep(Math.max(1, Math.min(total, n)));

  return (
    <div className="min-h-screen flex justify-center bg-muted">
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col relative shadow-soft-lg">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur px-5 pt-4 pb-3 border-b border-border">
          <div className="flex items-center justify-between mb-3 h-8">
            {step > 1 ? (
              <button
                onClick={() => go(step - 1)}
                className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            ) : (
              <span className="text-sm font-display font-semibold">Stash</span>
            )}
            <span className="text-xs text-muted-foreground">
              Step {step} of {total}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(step / total) * 100}%` }}
            />
          </div>
        </div>

        <div key={step} className="flex-1 px-5 py-6 animate-fade-slide">
          {step === 1 && <Welcome onNext={() => go(2)} />}
          {step === 2 && <Problem onNext={() => go(3)} />}
          {step === 3 && (
            <Quiz
              monthly={monthly}
              setMonthly={setMonthly}
              goal={goal}
              setGoal={setGoal}
              onNext={() => {
                setCalcAmt(monthly);
                go(4);
              }}
            />
          )}
          {step === 4 && (
            <Options monthly={monthly} choice={choice} setChoice={setChoice} onNext={() => go(5)} />
          )}
          {step === 5 && (
            <Calculator
              amt={calcAmt}
              setAmt={setCalcAmt}
              years={calcYears}
              setYears={setCalcYears}
              choice={choice}
              onNext={() => go(6)}
            />
          )}
          {step === 6 && (
            <MockInvest
              choice={choice}
              monthly={monthly}
              goal={goal}
              years={calcYears}
              onNext={() => go(7)}
            />
          )}
          {step === 7 && <Success choice={choice} monthly={monthly} years={calcYears} onHome={() => go(1)} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Screens ---------------- */

function Welcome({ onNext }: { onNext: () => void }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-full animate-fade-slide">
      <div className="flex-1 flex flex-col justify-center">
        <div className="size-16 rounded-2xl bg-primary-soft flex items-center justify-center mb-6 shadow-soft">
          <HandCoins className="size-8 text-foreground" />
        </div>
        <h1 className="text-4xl font-display font-semibold leading-tight mb-3">
          Hi Abhishek 👋
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Your friend thought you were ready to start investing. We think so too. Let's take it slow,
          together.
        </p>

        {/* Suggested paths section */}
        <div className="mb-8">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Suggested paths for you
          </h3>
          <div className="space-y-3">
            {/* Card 1: Automatic Micro-Savings */}
            <div
              onClick={() => toggle("savings")}
              className="p-3.5 bg-primary-soft/40 border border-primary/20 rounded-2xl flex flex-col hover:bg-primary-soft/60 transition-all cursor-pointer shadow-soft/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start gap-3 w-full">
                <div className="size-8 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0 mt-0.5 text-primary">
                  <Coins className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-foreground">Automatic Micro-Savings</h4>
                    {expandedCard === "savings" ? (
                      <ChevronUp className="size-4 text-primary" />
                    ) : (
                      <ChevronDown className="size-4 text-primary/70" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-sans leading-normal">
                    Save ₹100 every week automatically to build compounding habits.
                  </p>
                </div>
              </div>
              {expandedCard === "savings" && (
                <div className="mt-3 pt-3 border-t border-primary/10 text-[11px] text-foreground/85 leading-relaxed font-sans animate-fade-slide">
                  Automate your savings by investing small amounts weekly. Stash sets aside tiny bits of money so you build an investing discipline without even noticing.
                </div>
              )}
            </div>

            {/* Card 2: Rainy Day Buffer */}
            <div
              onClick={() => toggle("rainy")}
              className="p-3.5 bg-secondary-soft/40 border border-secondary/20 rounded-2xl flex flex-col hover:bg-secondary-soft/60 transition-all cursor-pointer shadow-soft/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start gap-3 w-full">
                <div className="size-8 rounded-xl bg-secondary-soft flex items-center justify-center flex-shrink-0 mt-0.5 text-secondary">
                  <Target className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-foreground">Rainy Day Buffer</h4>
                    {expandedCard === "rainy" ? (
                      <ChevronUp className="size-4 text-secondary" />
                    ) : (
                      <ChevronDown className="size-4 text-secondary/70" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-sans leading-normal">
                    Create a separate 3-month expense cushion with fixed low-risk growth.
                  </p>
                </div>
              </div>
              {expandedCard === "rainy" && (
                <div className="mt-3 pt-3 border-t border-secondary/10 text-[11px] text-foreground/85 leading-relaxed font-sans animate-fade-slide">
                  An emergency reserve ensures you don't have to borrow money when surprise expenses hit. It's stored in liquid assets that grow steadily and can be withdrawn instantly.
                </div>
              )}
            </div>

            {/* Card 3: Smart Inflation Guard */}
            <div
              onClick={() => toggle("inflation")}
              className="p-3.5 bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/20 rounded-2xl flex flex-col hover:bg-[color:var(--gold)]/15 transition-all cursor-pointer shadow-soft/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start gap-3 w-full">
                <div className="size-8 rounded-xl bg-[color:var(--gold)]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[color:var(--gold)]">
                  <TrendingUp className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-foreground">Smart Inflation Guard</h4>
                    {expandedCard === "inflation" ? (
                      <ChevronUp className="size-4 text-[color:var(--gold)]" />
                    ) : (
                      <ChevronDown className="size-4 text-[color:var(--gold)]/70" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-sans leading-normal">
                    Explore digital gold purchases starting from just ₹10.
                  </p>
                </div>
              </div>
              {expandedCard === "inflation" && (
                <div className="mt-3 pt-3 border-t border-[color:var(--gold)]/25 text-[11px] text-foreground/85 leading-relaxed font-sans animate-fade-slide">
                  Gold historically preserves its purchasing power as currency values decrease. Stash lets you buy pure, certified physical gold stored securely in local institutional vaults.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <PrimaryButton onClick={onNext}>Let's start</PrimaryButton>
    </div>
  );
}

function Problem({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-display font-semibold mb-2">Why invest at all?</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Money left alone quietly loses value. Here's what ₹1,000 looks like after one year.
      </p>

      <div className="space-y-4 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="size-4 text-secondary" />
            <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Kept in hand
            </span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-sm text-muted-foreground">₹1,000 today</span>
            <span className="text-2xl font-display font-semibold">₹940</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-secondary">
            <TrendingDown className="size-3.5" /> Inflation slowly eats it
          </div>
        </div>

        <div className="rounded-2xl border-2 border-primary bg-primary-soft p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <LineChart className="size-4 text-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Invested gently
            </span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-sm text-foreground/70">₹1,000 today</span>
            <span className="text-2xl font-display font-semibold">~₹1,100</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
            <TrendingUp className="size-3.5" /> Grows quietly while you sleep
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic mb-6">
        Not magic, just math. Markets do wobble — we'll explain that too.
      </p>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>Okay, show me how</PrimaryButton>
      </div>
    </div>
  );
}

function Quiz({
  monthly,
  setMonthly,
  goal,
  setGoal,
  onNext,
}: {
  monthly: number;
  setMonthly: (n: number) => void;
  goal: Goal;
  setGoal: (g: Goal) => void;
  onNext: () => void;
}) {
  const goals: Goal[] = ["Emergency Fund", "Buying Something", "Travel", "Future Security"];
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-display font-semibold mb-2">A couple of quick questions</h2>
      <p className="text-sm text-muted-foreground mb-7">No wrong answers, promise.</p>

      <div className="mb-7">
        <label className="text-sm font-medium block mb-3">How much can you save per month?</label>
        <div className="grid grid-cols-3 gap-2">
          {[100, 200, 300].map((v) => (
            <button
              key={v}
              onClick={() => setMonthly(v)}
              className={cn(
                "py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer shadow-soft",
                monthly === v
                  ? "bg-primary text-primary-foreground border-primary scale-[1.02]"
                  : "bg-card border-border hover:border-primary/50",
              )}
            >
              ₹{v}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="text-sm font-medium block mb-3">What are you saving for?</label>
        <div className="grid grid-cols-2 gap-2">
          {goals.map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={cn(
                "py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left shadow-soft",
                goal === g
                  ? "bg-secondary-soft border-secondary"
                  : "bg-card border-border hover:border-secondary/50",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>Show me my options</PrimaryButton>
      </div>
    </div>
  );
}

function Options({
  monthly,
  choice,
  setChoice,
  onNext,
}: {
  monthly: number;
  choice: OptionKey;
  setChoice: (c: OptionKey) => void;
  onNext: () => void;
}) {
  const [open, setOpen] = useState<OptionKey | null>(null);
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-display font-semibold mb-1">3 options that fit you</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Based on saving ₹{monthly}/month. Tap to pick one.
      </p>

      <div className="space-y-3 mb-5">
        {(Object.keys(OPTIONS) as OptionKey[]).map((k) => {
          const o = OPTIONS[k];
          const yearly = Math.round(monthly * 12 * (1 + o.rate));
          const threeYr = Math.round(monthly * 12 * 3 * (1 + o.rate * 1.6));
          const selected = choice === k;
          return (
            <div
              key={k}
              onClick={() => setChoice(k)}
              className={cn(
                "rounded-2xl border-2 bg-card p-4 shadow-soft cursor-pointer transition-all",
                selected
                  ? "border-primary bg-primary-soft scale-[1.01]"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md", o.badgeColor)}>
                  {o.badge}
                  {k === "sip" && <Star className="inline size-3 ml-1 -mt-0.5 fill-current" />}
                </span>
                {selected && (
                  <span className="size-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="size-3.5 text-primary-foreground" />
                  </span>
                )}
              </div>
              <h3 className="text-lg font-display font-semibold mb-1">{o.name}</h3>
              <p className="text-xs text-muted-foreground italic mb-3">{o.line}</p>

              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <Stat label="Risk" value={`${o.risk}/5`} />
                <Stat label="Returns" value={`~${(o.rate * 100).toFixed(1)}%`} />
                <Stat label="1 yr" value={`₹${yearly.toLocaleString()}`} />
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={cn(
                      "h-1.5 flex-1 rounded-full",
                      n <= o.risk
                        ? n <= 2
                          ? "bg-primary"
                          : n <= 3
                            ? "bg-gold"
                            : "bg-destructive"
                        : "bg-muted",
                    )}
                  />
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">In 3 years: ~₹{threeYr.toLocaleString()}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(open === k ? null : k);
                }}
                className="text-xs font-medium text-foreground/70 flex items-center gap-1 cursor-pointer hover:text-foreground"
              >
                How does it work?
                {open === k ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
              </button>
              {open === k && (
                <p className="text-xs text-foreground/70 mt-2 leading-relaxed animate-fade-slide">
                  {o.how}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <PrimaryButton onClick={onNext}>I'll go with this</PrimaryButton>
    </div>
  );
}

function Calculator({
  amt,
  setAmt,
  years,
  setYears,
  choice,
  onNext,
}: {
  amt: number;
  setAmt: (n: number) => void;
  years: number;
  setYears: (n: number) => void;
  choice: OptionKey;
  onNext: () => void;
}) {
  const o = OPTIONS[choice];
  const { good, bad, invested } = useMemo(() => {
    const months = years * 12;
    const invested = amt * months;
    const good = Math.round(invested * (1 + o.rate * years));
    const bad = Math.round(invested * (1 - 0.05 * years));
    return { good, bad, invested };
  }, [amt, years, o.rate]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-display font-semibold mb-1">See your money grow</h2>
      <p className="text-sm text-muted-foreground mb-7">
        Move the sliders and watch what happens.
      </p>

      <div className="space-y-6 mb-6">
        <SliderRow
          label="Monthly amount"
          value={`₹${amt}`}
          min={100}
          max={2000}
          step={50}
          v={amt}
          onChange={setAmt}
        />
        <SliderRow
          label="Time period"
          value={`${years} ${years === 1 ? "year" : "years"}`}
          min={1}
          max={10}
          step={1}
          v={years}
          onChange={setYears}
        />
      </div>

      <p className="text-xs text-muted-foreground mb-3">You'd invest ₹{invested.toLocaleString()} total.</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl bg-primary-soft border-2 border-primary p-4 shadow-soft">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="size-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Good</span>
          </div>
          <div className="text-xl font-display font-semibold">₹{good.toLocaleString()}</div>
          <div className="text-[11px] text-foreground/60 mt-1">If markets are kind</div>
        </div>
        <div className="rounded-2xl bg-secondary-soft border-2 border-destructive/40 p-4 shadow-soft">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingDown className="size-3.5 text-destructive" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">Bad</span>
          </div>
          <div className="text-xl font-display font-semibold">₹{bad.toLocaleString()}</div>
          <div className="text-[11px] text-foreground/60 mt-1">If markets dip</div>
        </div>
      </div>

      <div className="rounded-xl bg-muted p-4 mb-6 border border-border">
        <p className="text-xs text-foreground/70 leading-relaxed">
          <AlertTriangle className="inline size-3.5 mr-1 text-destructive -mt-0.5" />
          Markets go up <em>and</em> down. The bad scenario is real. Only invest if you're okay with a
          little loss along the way.
        </p>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext}>Looks good, continue</PrimaryButton>
      </div>
    </div>
  );
}

function MockInvest({
  choice,
  monthly,
  goal,
  years,
  onNext,
}: {
  choice: OptionKey;
  monthly: number;
  goal: Goal;
  years: number;
  onNext: () => void;
}) {
  const o = OPTIONS[choice];
  const total = monthly * 12 * years;
  const low = Math.round(total * (1 - 0.05 * years));
  const high = Math.round(total * (1 + o.rate * years));

  const steps = [
    "Choose your investment",
    "Set your amount",
    "Complete KYC",
    "Link your bank account",
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) return;

    // Sequential timing: Choose investment (1200ms), Set amount (1200ms), Complete KYC (1500ms), Link bank (1500ms)
    const durations = [1200, 1200, 1500, 1500];
    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, durations[currentStepIndex]);

    return () => clearTimeout(timer);
  }, [currentStepIndex, steps.length]);

  const allDone = currentStepIndex === steps.length;

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-4xl font-display font-semibold leading-tight mb-1">
        Your first investment
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Here's a summary of what you're doing
      </p>

      {/* Investment Summary Card */}
      <div className="rounded-3xl bg-card border border-border/80 p-5 mb-6 shadow-soft space-y-4">
        <div className="flex justify-between items-center pb-3.5 border-b border-border/60 text-sm">
          <span className="text-muted-foreground">What</span>
          <span className="font-semibold text-foreground">{o.name}</span>
        </div>
        <div className="flex justify-between items-center pb-3.5 border-b border-border/60 text-sm">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-semibold text-foreground">₹{monthly}/month</span>
        </div>
        <div className="flex justify-between items-center pb-3.5 border-b border-border/60 text-sm">
          <span className="text-muted-foreground">Goal</span>
          <span className="font-semibold text-foreground">{goal}</span>
        </div>
        <div className="flex justify-between items-center pb-3.5 border-b border-border/60 text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-semibold text-foreground">{years} {years === 1 ? "year" : "years"}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Expected range</span>
          <span className="font-semibold text-foreground">
            ₹{low.toLocaleString()} – ₹{high.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Setting things up Card */}
      <div className="rounded-3xl bg-card border border-border/80 p-5 mb-6 shadow-soft">
        <h3 className="text-base font-semibold text-foreground mb-4">Setting things up...</h3>
        <div className="space-y-4">
          {steps.map((s, i) => {
            const isCompleted = i < currentStepIndex;
            const isInProgress = i === currentStepIndex;
            const isPending = i > currentStepIndex;

            return (
              <div key={s} className="flex items-center gap-3.5">
                <div className="size-6 flex-shrink-0 flex items-center justify-center">
                  {isCompleted && (
                    <div className="size-6 rounded-full border border-primary flex items-center justify-center bg-primary-soft/50 text-primary animate-fade-slide">
                      <Check className="size-3.5" strokeWidth={3} />
                    </div>
                  )}
                  {isInProgress && (
                    <div className="size-6 rounded-full border border-primary/40 flex items-center justify-center text-primary animate-pulse">
                      <Loader2 className="size-3.5 animate-spin" />
                    </div>
                  )}
                  {isPending && (
                    <div className="size-6 rounded-full border border-muted-foreground/30 flex items-center justify-center bg-transparent" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isCompleted && "text-foreground font-medium",
                    isInProgress && "text-foreground font-semibold animate-pulse",
                    isPending && "text-muted-foreground font-medium opacity-60"
                  )}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice Run Warning Box */}
      <div className="rounded-2xl bg-secondary-soft p-4 mb-6 flex gap-3 shadow-soft/30 border-0">
        <AlertCircle className="size-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/75 leading-relaxed">
          This is a practice run — no real money is involved. When you're ready, you can do this for real with a registered investment app.
        </p>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={onNext} disabled={!allDone}>
          Complete my investment
        </PrimaryButton>
      </div>
    </div>
  );
}

function Success({
  choice,
  monthly,
  years,
  onHome,
}: {
  choice: OptionKey;
  monthly: number;
  years: number;
  onHome: () => void;
}) {
  const o = OPTIONS[choice];
  const total = monthly * 12 * years;
  const good = Math.round(total * (1 + o.rate * years));
  const bad = Math.round(total * (1 - 0.05 * years));
  const [copied, setCopied] = useState(false);
  const shareText = "I just made my first investment with Stash! Starting small, thinking big. 🌱";

  const copy = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full animate-fade-slide">
      {/* Centered emoji circular badge */}
      <div className="size-20 rounded-full bg-primary-soft flex items-center justify-center mb-6 mx-auto text-4xl shadow-soft">
        🎉
      </div>

      <h1 className="text-4xl font-display font-semibold mb-2 text-center text-foreground">
        You did it, Abhishek!
      </h1>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        You just made your first investment.
      </p>

      {/* Investment Summary Card */}
      <div className="rounded-3xl bg-card border border-border/80 p-5 mb-6 shadow-soft">
        <h3 className="font-display font-semibold text-lg mb-4 text-left text-foreground">
          Your investment summary
        </h3>
        <div className="space-y-3.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Chosen</span>
            <span className="font-semibold text-foreground">{o.name}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monthly</span>
            <span className="font-semibold text-foreground">₹{monthly.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pb-3.5 border-b border-border/60 text-sm">
            <span className="text-muted-foreground">Total you'll put in</span>
            <span className="font-semibold text-foreground">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-1">
            <span className="text-muted-foreground">Good scenario</span>
            <span className="font-semibold text-success">₹{good.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Bad scenario</span>
            <span className="font-semibold text-destructive">₹{bad.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <p className="text-sm text-foreground/80 italic text-center px-2 mb-6 leading-relaxed">
        "The best time to start was yesterday. The next best time is now. You just did it." 🌱
      </p>

      {/* Share Box */}
      <div className="rounded-3xl bg-secondary-soft p-5 mb-6 shadow-soft/30 space-y-4 border-0">
        <div className="flex items-center gap-2 text-secondary-foreground font-semibold text-sm">
          <Share2 className="size-4" />
          <span>Share with friends</span>
        </div>
        <p className="text-sm text-foreground/85 leading-relaxed">
          "{shareText}"
        </p>
        <button
          onClick={copy}
          className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary/90 transition-colors shadow-soft"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied!" : "Copy to share"}
        </button>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={onHome}
        className="w-full py-3.5 rounded-2xl border border-border bg-transparent hover:bg-muted font-semibold text-sm transition-all text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center mb-6 shadow-soft/20 hover:scale-[1.01] active:scale-[0.99]"
      >
        Back to home
      </button>

      {/* Footer Info Book Icon */}
      <div className="mt-auto pt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <BookOpen className="size-4 flex-shrink-0" />
        <span>Want to learn more about your money when it's invested?</span>
      </div>
    </div>
  );
}

/* ---------------- Small bits ---------------- */

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-13 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-soft hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99]"
    >
      {children}
    </Button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/60 rounded-lg py-1.5 px-1">
      <div className="text-[9px] uppercase tracking-wider text-foreground/50">{label}</div>
      <div className="text-xs font-semibold">{value}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-foreground/60" />
        <span className="text-xs text-foreground/60">{label}</span>
      </div>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  v,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  v: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-display font-semibold">{value}</span>
      </div>
      <Slider value={[v]} min={min} max={max} step={step} onValueChange={(val) => onChange(val[0])} />
    </div>
  );
}

export const checkedOn = "4 Oct 2026";

export type Tier = "house" | "vetted" | "open";

export type CategoryId =
  | "operating-system"
  | "outbound"
  | "lists"
  | "clay"
  | "icp"
  | "copy"
  | "deliverability"
  | "positioning"
  | "devtools"
  | "linkedin"
  | "measurement"
  | "context"
  | "growth";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "operating-system", label: "Operating system" },
  { id: "outbound", label: "Outbound" },
  { id: "lists", label: "Lists" },
  { id: "clay", label: "Clay" },
  { id: "icp", label: "ICP" },
  { id: "copy", label: "Copy" },
  { id: "deliverability", label: "Deliverability" },
  { id: "positioning", label: "Positioning" },
  { id: "devtools", label: "Devtools" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "measurement", label: "Measurement" },
  { id: "context", label: "Context" },
  { id: "growth", label: "Growth" },
];

export type Author = {
  slug: string;
  name: string;
  org: string;
  url: string;
};

export const authors: Author[] = [
  {
    slug: "emanuel",
    name: "Emanuel",
    org: "GTM Adviser",
    url: "https://github.com/gtmadviser",
  },
  {
    slug: "eric",
    name: "Eric Nowoslawski",
    org: "Growth Engine X",
    url: "https://github.com/growthenginenowoslawski",
  },
  {
    slug: "coldiq",
    name: "ColdIQ",
    org: "ColdIQ",
    url: "https://github.com/Cold-IQ",
  },
  {
    slug: "aidevgtm",
    name: "AIDevGTM",
    org: "GTM Cofounder",
    url: "https://gtmcofounder.com",
  },
  {
    slug: "corey",
    name: "Corey Haines",
    org: "Marketing Skills",
    url: "https://github.com/coreyhaines31",
  },
  {
    slug: "workflows",
    name: "Workflows.io",
    org: "Company OS",
    url: "https://github.com/Workflowsio",
  },
  {
    slug: "swan",
    name: "Swan",
    org: "swan-gtm",
    url: "https://github.com/swan-gtm",
  },
  {
    slug: "explorium",
    name: "Explorium",
    org: "Explorium",
    url: "https://github.com/explorium-ai",
  },
  {
    slug: "gtm-skills",
    name: "gtm-skills",
    org: "gtm-skills",
    url: "https://github.com/gtm-skills",
  },
  {
    slug: "gtm-strategist",
    name: "GTM Strategist",
    org: "GTM Strategist",
    url: "https://github.com/GTM-Strategist",
  },
  {
    slug: "onvoyage",
    name: "Onvoyage",
    org: "Onvoyage",
    url: "https://github.com/onvoyage-ai",
  },
];

export type Command = { label: string; value: string };

export type Repo = {
  slug: string;
  name: string;
  github: string;
  tier: Tier;
  summary: string;
  why: string;
  author: string;
  stars: number;
  license?: string;
  homepage?: string;
  categories: CategoryId[];
  commands: Command[];
  skillCountNote?: string;
};

export type Skill = {
  slug: string;
  name: string;
  summary: string;
  repo: string;
  categories: CategoryId[];
};

export const repos: Repo[] = [
  {
    slug: "agentic-gtm",
    name: "Agentic GTM",
    github: "gtmadviser/agentic-gtm",
    tier: "house",
    summary:
      "Local-first GTM operating system. Fifteen published agent skills, a deterministic CLI, and approval before any external write.",
    why: "This is the pack we maintain and want other operators to run. It carries the playbooks from live outbound work: evidence-labelled context, a preregistered experiment, copy gates, deliverability thresholds, and a handover. Public alpha 0.2.0, MIT. Credentials stay in the environment. Nothing sends on its own.",
    author: "emanuel",
    stars: 0,
    license: "MIT",
    homepage: "https://gtmadviser.com/agentic-gtm",
    categories: ["operating-system", "outbound", "icp", "copy", "deliverability"],
    commands: [
      { label: "Install the skills", value: "npx skills add gtmadviser/agentic-gtm" },
      {
        label: "Install the CLI",
        value: "uv tool install git+https://github.com/gtmadviser/agentic-gtm.git",
      },
    ],
  },
  {
    slug: "cold-outbound",
    name: "Cold outbound skills",
    github: "growthenginenowoslawski/coldoutboundskills",
    tier: "vetted",
    summary:
      "Eric Nowoslawski's Claude Code system for cold email: ICP, lists, copy, Smartlead, and deliverability.",
    why: "The free outbound pack we point people to. It is built around a real sending stack, Prospeo and Blitz and Smartlead, and it includes the unglamorous parts: inbox lifecycle, incident response, and a list scorecard before anyone hits send. Fifty-two skills in the repo. The shelf lists the ones to open first.",
    author: "eric",
    stars: 736,
    license: "see repo",
    categories: ["outbound", "lists", "copy", "deliverability", "icp"],
    commands: [
      {
        label: "Install the skills",
        value: "npx skills add growthenginenowoslawski/coldoutboundskills",
      },
    ],
    skillCountNote: "52 skills in the repo. Twenty-two are listed here as the start.",
  },
  {
    slug: "gtm-cofounder",
    name: "GTM Cofounder",
    github: "AIDevGTM/gtm-cofounder",
    tier: "vetted",
    summary:
      "A nineteen-skill curriculum for founder-led GTM on a developer tool: ICP, positioning, homepage, pricing, first users, launch.",
    why: "The right pack when the product is a devtool and the founder is still the GTM team. It starts from a founder brief and refuses generic advice. Public description credits Frankl and Czakon. MIT. Product Hunt's top product the day it launched.",
    author: "aidevgtm",
    stars: 309,
    license: "MIT",
    homepage: "https://gtmcofounder.com",
    categories: ["devtools", "positioning", "copy", "growth"],
    commands: [
      { label: "Install the skills", value: "npx skills add AIDevGTM/gtm-cofounder" },
    ],
  },
  {
    slug: "coldiq",
    name: "ColdIQ GTM skills",
    github: "Cold-IQ/ColdIQ-s-GTM-Skills",
    tier: "vetted",
    summary:
      "ColdIQ's library of triggers, email frameworks, list hygiene, and GTM plays for Claude Code.",
    why: "A working agency's play library, published. The repo is large, including a LinkedIn ads and content set, and the quality is uneven across ninety-plus skill files. The shelf lists the outbound core: first touch, follow-up, ICP, contacts, and list hygiene.",
    author: "coldiq",
    stars: 293,
    categories: ["outbound", "copy", "lists", "icp", "linkedin"],
    commands: [
      { label: "Install the skills", value: "npx skills add Cold-IQ/ColdIQ-s-GTM-Skills" },
    ],
    skillCountNote: "91 skill files in the repo. Seventeen are listed here.",
  },
  {
    slug: "marketing-skills",
    name: "Marketing skills",
    github: "coreyhaines31/marketingskills",
    tier: "vetted",
    summary:
      "Corey Haines' marketing skill pack: copy, CRO, pricing, launch, research, and cold email.",
    why: "The growth layer a GTM agent should load next to an outbound system. Fifty skills cover ads, SEO, and lifecycle. We list the thirteen that change an offer, a page, a price, or a first email. The rest of the repo is public if you want it.",
    author: "corey",
    stars: 52806,
    categories: ["growth", "copy", "positioning"],
    commands: [
      { label: "Install the skills", value: "npx skills add coreyhaines31/marketingskills" },
    ],
    skillCountNote: "50 skills in the repo. Thirteen are listed here.",
  },
  {
    slug: "company-os",
    name: "Company OS starter kit",
    github: "Workflowsio/company-os-starter-kit",
    tier: "open",
    summary:
      "A CLAUDE.md company brain, five GTM skills, safety hooks, and a blueprint for running the business in Claude Code.",
    why: "A useful blank structure: a blueprint, five markdown skills, and safety hooks. Each skill file says it is a template to customize, not a finished skill. That keeps it on the open shelf. Agentic GTM is the operating system. This is a lighter starter.",
    author: "workflows",
    stars: 91,
    categories: ["context", "operating-system", "copy"],
    commands: [
      {
        label: "Clone the kit",
        value: "git clone https://github.com/Workflowsio/company-os-starter-kit.git",
      },
    ],
  },
  {
    slug: "autoclay",
    name: "Autoclaybuilder",
    github: "growthenginenowoslawski/autoclaybuilder",
    tier: "vetted",
    summary:
      "Eric Nowoslawski's builder for Clay tables that are checked before they are trusted.",
    why: "Clay work fails in the columns nobody re-reads. This repo treats a correct table as the product: plan first, then a clone suite that checks the build. Small, specific, and from the same shop as the outbound skills.",
    author: "eric",
    stars: 24,
    categories: ["clay", "lists"],
    commands: [
      {
        label: "Clone the repo",
        value: "git clone https://github.com/growthenginenowoslawski/autoclaybuilder.git",
      },
    ],
  },
  {
    slug: "google-maps",
    name: "Google Maps scraper",
    github: "growthenginenowoslawski/google-maps-scraper",
    tier: "vetted",
    summary:
      "Local-business lists across US zip codes, with a bundled zip database.",
    why: "The data tool behind the Google Maps list skill in the outbound pack. Useful when the ICP is a place and a category: clinics, shops, local services. Companion repo, not a skill curriculum.",
    author: "eric",
    stars: 27,
    categories: ["lists"],
    commands: [
      {
        label: "Clone the repo",
        value: "git clone https://github.com/growthenginenowoslawski/google-maps-scraper.git",
      },
    ],
  },
  {
    slug: "linkedin-writer",
    name: "LinkedIn writer learner",
    github: "growthenginenowoslawski/nowoslawski-linkedin-writer-learner",
    tier: "vetted",
    summary:
      "Learns which LinkedIn posts are working, from your account and from competitors, and writes from that.",
    why: "A small free tool from Eric for the content side of outbound. It keeps the learning local, in markdown and JSON, instead of a hosted prompt. Install it when LinkedIn is part of the motion and you want the agent's taste tied to posts that already performed.",
    author: "eric",
    stars: 18,
    categories: ["linkedin", "copy"],
    commands: [
      {
        label: "Clone the repo",
        value:
          "git clone https://github.com/growthenginenowoslawski/nowoslawski-linkedin-writer-learner.git",
      },
    ],
  },
  {
    slug: "swan",
    name: "Swan GTM skills",
    github: "swan-gtm/gtm-skills",
    tier: "open",
    summary: "Public GTM skills described by the authors as production-grade.",
    why: "On the open shelf because the repo is on-topic and public. We have not run it on an engagement, so it does not sit with the vetted packs.",
    author: "swan",
    stars: 164,
    categories: ["outbound", "operating-system"],
    commands: [{ label: "Repository", value: "https://github.com/swan-gtm/gtm-skills" }],
  },
  {
    slug: "explorium",
    name: "Explorium GTM skills",
    github: "explorium-ai/gtm-skills",
    tier: "open",
    summary: "Explorium's GTM skills for Claude and Codex: research, enrichment, and prospecting.",
    why: "A data vendor's skill pack. Useful to read if you already use Explorium. Open shelf until we have used it beside a source we already trust.",
    author: "explorium",
    stars: 138,
    categories: ["lists", "icp"],
    commands: [{ label: "Repository", value: "https://github.com/explorium-ai/gtm-skills" }],
  },
  {
    slug: "gtm-toolkit",
    name: "GTM toolkit",
    github: "gtm-skills/gtm",
    tier: "open",
    summary: "Agent toolkit for research, intel, outreach, and CRM.",
    why: "Public and clearly GTM. The README is short. Open shelf until someone here has run the toolkit on a live account.",
    author: "gtm-skills",
    stars: 171,
    categories: ["outbound", "context"],
    commands: [{ label: "Repository", value: "https://github.com/gtm-skills/gtm" }],
  },
  {
    slug: "gtm-strategist",
    name: "GTM Strategist skills",
    github: "GTM-Strategist/gtm-strategist-skills",
    tier: "open",
    summary: "A public go-to-market copilot skill repo.",
    why: "The description is broad. Stars are not a review. It stays on the open shelf until the skills have been read against a real ICP.",
    author: "gtm-strategist",
    stars: 260,
    categories: ["positioning", "growth"],
    commands: [
      { label: "Repository", value: "https://github.com/GTM-Strategist/gtm-strategist-skills" },
    ],
  },
  {
    slug: "geo-engineer",
    name: "AEO and GEO skill",
    github: "onvoyage-ai/gtm-engineer-skills",
    tier: "open",
    summary:
      "A Claude Code skill that scores a site for AI-engine and generative-engine optimization.",
    why: "Popular, and narrow. It is a page-audit skill for being cited by answer engines. Useful context for a launch, and a different job from outbound. Open shelf as a specialist, not as a GTM system.",
    author: "onvoyage",
    stars: 1314,
    categories: ["growth"],
    commands: [
      { label: "Repository", value: "https://github.com/onvoyage-ai/gtm-engineer-skills" },
    ],
  },
];

const house = "agentic-gtm";
const eric = "cold-outbound";
const cofounder = "gtm-cofounder";
const coldiq = "coldiq";
const corey = "marketing-skills";
const company = "company-os";

export const skills: Skill[] = [
  {
    slug: "agentic-gtm--gtm-kickoff",
    name: "gtm-kickoff",
    repo: house,
    categories: ["operating-system"],
    summary:
      "Guided entry point. Runs the stage check, explains the model, and routes a new company through the first session.",
  },
  {
    slug: "agentic-gtm--onboard-company-brain",
    name: "onboard-company-brain",
    repo: house,
    categories: ["context"],
    summary:
      "Captures product, customers, positioning, constraints, and decisions, with every statement labelled belief, evidence, hypothesis, or decision.",
  },
  {
    slug: "agentic-gtm--map-market",
    name: "map-market",
    repo: house,
    categories: ["positioning"],
    summary:
      "Builds sourced competitor profiles and positioning hypotheses. Every claim is dated and attributed.",
  },
  {
    slug: "agentic-gtm--refine-icp",
    name: "refine-icp",
    repo: house,
    categories: ["icp"],
    summary:
      "Turns declared ICP beliefs and observed deals into a working ICP and an anti-ICP, with confidence and evidence.",
  },
  {
    slug: "agentic-gtm--inspect-crm",
    name: "inspect-crm",
    repo: house,
    categories: ["measurement", "icp"],
    summary:
      "Reads HubSpot properties and pipelines, confirms the field map with a human, then analyses won, lost, and open deals separately.",
  },
  {
    slug: "agentic-gtm--design-gtm-experiment",
    name: "design-gtm-experiment",
    repo: house,
    categories: ["measurement", "outbound"],
    summary:
      "Preregisters one falsifiable experiment: audience, trigger, hypothesis, sample, and a continue, change, or stop rule.",
  },
  {
    slug: "agentic-gtm--source-tam",
    name: "source-tam",
    repo: house,
    categories: ["lists", "icp"],
    summary:
      "Sizes the market and sources accounts through the configured provider, with provenance, suppression, and verification.",
  },
  {
    slug: "agentic-gtm--research-accounts",
    name: "research-accounts",
    repo: house,
    categories: ["lists", "copy"],
    summary:
      "Prioritises accounts with public signals, evidence-tagged pain, and separate fit and urgency scores for the copy.",
  },
  {
    slug: "agentic-gtm--write-outreach",
    name: "write-outreach",
    repo: house,
    categories: ["copy", "outbound"],
    summary:
      "Writes cold email and LinkedIn that has to pass quality gates before it can become a campaign draft.",
  },
  {
    slug: "agentic-gtm--stage-campaign",
    name: "stage-campaign",
    repo: house,
    categories: ["outbound"],
    summary:
      "Turns approved copy and an audience into a paused campaign draft in lemlist or Instantly, after the pre-launch filters.",
  },
  {
    slug: "agentic-gtm--audit-deliverability",
    name: "audit-deliverability",
    repo: house,
    categories: ["deliverability"],
    summary:
      "Read-only audit of domains, DNS, mailbox health, warm-up, and burn risk. Findings are blocking, material, or informational.",
  },
  {
    slug: "agentic-gtm--review-outreach",
    name: "review-outreach",
    repo: house,
    categories: ["measurement"],
    summary:
      "Classifies replies and judges an experiment only against the decision rule that was written before launch.",
  },
  {
    slug: "agentic-gtm--weekly-gtm-review",
    name: "weekly-gtm-review",
    repo: house,
    categories: ["measurement", "operating-system"],
    summary:
      "Weekly operating review of pipeline, experiments, risks, and owners, with an optional monthly sweep.",
  },
  {
    slug: "agentic-gtm--advance-deals",
    name: "advance-deals",
    repo: house,
    categories: ["operating-system"],
    summary:
      "Prepares a live deal from CRM, meetings, and email, and separates what the buyer said from what the seller inferred.",
  },
  {
    slug: "agentic-gtm--handover-gtm-engine",
    name: "handover-gtm-engine",
    repo: house,
    categories: ["operating-system", "context"],
    summary:
      "Packages a running engine for a new operator: source of truth, decisions, ownership, automations, and the weekly routine.",
  },
  {
    slug: "cold-outbound--cold-email-kickoff",
    name: "cold-email-kickoff",
    repo: eric,
    categories: ["outbound", "operating-system"],
    summary:
      "Start-here orchestrator. Asks about infrastructure first, then runs ICP, offer, strategy, and the path to a first campaign.",
  },
  {
    slug: "cold-outbound--icp-onboarding",
    name: "icp-onboarding",
    repo: eric,
    categories: ["icp"],
    summary:
      "Interviews the operator on the business, the ICP, the offer, and the hard filters, and writes it down.",
  },
  {
    slug: "cold-outbound--campaign-strategy",
    name: "campaign-strategy",
    repo: eric,
    categories: ["outbound"],
    summary:
      "Produces a slate of outbound campaign ideas with targeting, a personalization approach, and the value proposition.",
  },
  {
    slug: "cold-outbound--campaign-copywriting",
    name: "campaign-copywriting",
    repo: eric,
    categories: ["copy"],
    summary:
      "Writes the sequence in steps and confirms direction before the copy is finished.",
  },
  {
    slug: "cold-outbound--cold-email-starter-kit",
    name: "cold-email-starter-kit",
    repo: eric,
    categories: ["outbound", "deliverability"],
    summary:
      "Beginner path from domains and inboxes through list, copy, enrichment, and a Smartlead send.",
  },
  {
    slug: "cold-outbound--cold-email-weekly-rhythm",
    name: "cold-email-weekly-rhythm",
    repo: eric,
    categories: ["operating-system"],
    summary:
      "The weekly, monthly, and quarterly cadence once a cold email program is already running.",
  },
  {
    slug: "cold-outbound--list-builder",
    name: "list-builder",
    repo: eric,
    categories: ["lists"],
    summary:
      "Builds the largest qualified list it can by orchestrating Prospeo, Blitz, maps, and lookalikes.",
  },
  {
    slug: "cold-outbound--perfect-company-list",
    name: "perfect-company-list",
    repo: eric,
    categories: ["lists", "icp"],
    summary:
      "Learns how real customers describe themselves, then pulls the company universe that uses those words.",
  },
  {
    slug: "cold-outbound--list-quality-scorecard",
    name: "list-quality-scorecard",
    repo: eric,
    categories: ["lists"],
    summary:
      "Grades a list before send: duplicates, title mix, catch-all density, ICP fit, and verification coverage.",
  },
  {
    slug: "cold-outbound--blitz-list-builder",
    name: "blitz-list-builder",
    repo: eric,
    categories: ["lists"],
    summary:
      "Finds decision-makers at companies whose domains you already have, via the Blitz API.",
  },
  {
    slug: "cold-outbound--disco-like",
    name: "disco-like",
    repo: eric,
    categories: ["lists"],
    summary:
      "Lookalike companies from DiscoLike, from seed domains or a plain-language ICP.",
  },
  {
    slug: "cold-outbound--google-maps-list-builder",
    name: "google-maps-list-builder",
    repo: eric,
    categories: ["lists"],
    summary:
      "Scrapes Google Maps for a category and a place, and outputs a CSV ready for enrichment.",
  },
  {
    slug: "cold-outbound--competitor-engagers",
    name: "competitor-engagers",
    repo: eric,
    categories: ["linkedin", "lists"],
    summary:
      "Finds people commenting and reacting on competitor LinkedIn posts, given a website to start from.",
  },
  {
    slug: "cold-outbound--email-deliverability-audit",
    name: "email-deliverability-audit",
    repo: eric,
    categories: ["deliverability"],
    summary:
      "Checks SPF, DKIM, DMARC, Smartlead inbox health, and bounce rate by inbox type.",
  },
  {
    slug: "cold-outbound--deliverability-incident-response",
    name: "deliverability-incident-response",
    repo: eric,
    categories: ["deliverability"],
    summary:
      "Triage for spam placement, bounce spikes, blacklists, and inboxes blocked in warm-up.",
  },
  {
    slug: "cold-outbound--inbox-lifecycle-manager",
    name: "inbox-lifecycle-manager",
    repo: eric,
    categories: ["deliverability"],
    summary:
      "Weekly keep, cancel, promote, and buy decisions for the sending domains and the reserve fleet.",
  },
  {
    slug: "cold-outbound--experiment-design",
    name: "experiment-design",
    repo: eric,
    categories: ["measurement"],
    summary:
      "Single-variable cold email experiments, with sample sizes and what counts as a result.",
  },
  {
    slug: "cold-outbound--icp-prompt-builder",
    name: "icp-prompt-builder",
    repo: eric,
    categories: ["icp"],
    summary:
      "Tunes the prompt that judges whether a company belongs on the list.",
  },
  {
    slug: "cold-outbound--lead-magnet-brainstorm",
    name: "lead-magnet-brainstorm",
    repo: eric,
    categories: ["copy"],
    summary:
      "Finds a giveaway the operator can actually offer, and that the buyer would want.",
  },
  {
    slug: "cold-outbound--personalization-subagent-pattern",
    name: "personalization-subagent-pattern",
    repo: eric,
    categories: ["copy"],
    summary:
      "Shows one sample personalization, takes edits, then fans the pattern out across sub-agents.",
  },
  {
    slug: "cold-outbound--clay-playbooks",
    name: "clay-playbooks",
    repo: eric,
    categories: ["clay", "lists"],
    summary:
      "Index of signal playbooks. Each one turns a buying signal into a list filter and a line of copy.",
  },
  {
    slug: "cold-outbound--auto-research-public",
    name: "auto-research-public",
    repo: eric,
    categories: ["outbound"],
    summary:
      "From one domain: scrape the site, draft an ICP, pull Prospeo leads, enrich, and draft the campaign.",
  },
  {
    slug: "gtm-cofounder--start-here",
    name: "start-here",
    repo: cofounder,
    categories: ["context", "devtools"],
    summary:
      "Interviews the founder once and writes the brief every other skill has to read.",
  },
  {
    slug: "gtm-cofounder--strategy-and-roadmap",
    name: "strategy-and-roadmap",
    repo: cofounder,
    categories: ["operating-system", "devtools"],
    summary:
      "Turns the brief into a stage-aware GTM roadmap the founder can come back to.",
  },
  {
    slug: "gtm-cofounder--who-is-this-for",
    name: "who-is-this-for",
    repo: cofounder,
    categories: ["icp", "devtools"],
    summary:
      "Names the developer personas and the people who would say no.",
  },
  {
    slug: "gtm-cofounder--talk-to-users",
    name: "talk-to-users",
    repo: cofounder,
    categories: ["devtools"],
    summary:
      "Sets up developer discovery through a technical advisory board, past friends and conference notes.",
  },
  {
    slug: "gtm-cofounder--positioning-and-story",
    name: "positioning-and-story",
    repo: cofounder,
    categories: ["positioning"],
    summary:
      "Builds a narrative where the developer is the hero and a real trend is the pressure.",
  },
  {
    slug: "gtm-cofounder--beyond-the-wrapper",
    name: "beyond-the-wrapper",
    repo: cofounder,
    categories: ["positioning", "devtools"],
    summary:
      "Finds the wedge, data, workflow, trust, or domain, when every competitor says they are AI.",
  },
  {
    slug: "gtm-cofounder--value-prop-that-converts",
    name: "value-prop-that-converts",
    repo: cofounder,
    categories: ["copy"],
    summary:
      "Writes a value proposition that is specific and provable, and strips the puffery.",
  },
  {
    slug: "gtm-cofounder--the-homepage",
    name: "the-homepage",
    repo: cofounder,
    categories: ["copy", "growth"],
    summary:
      "Structures a devtool homepage for the developer who has to champion it, and shows the product early.",
  },
  {
    slug: "gtm-cofounder--time-to-first-value",
    name: "time-to-first-value",
    repo: cofounder,
    categories: ["devtools", "growth"],
    summary:
      "Designs the quickstart and first-run path to a real win.",
  },
  {
    slug: "gtm-cofounder--first-50-users",
    name: "first-50-users",
    repo: cofounder,
    categories: ["growth"],
    summary:
      "Gets the first fifty users through channels the ICP already uses.",
  },
  {
    slug: "gtm-cofounder--launch-it",
    name: "launch-it",
    repo: cofounder,
    categories: ["growth"],
    summary:
      "Plans a Show HN, Reddit, or Product Hunt launch that earns the room.",
  },
  {
    slug: "gtm-cofounder--market-to-devs-sell-to-buyers",
    name: "market-to-devs-sell-to-buyers",
    repo: cofounder,
    categories: ["devtools", "positioning"],
    summary:
      "Turns developer adoption into a sale by enabling the champion and picking a GTM model.",
  },
  {
    slug: "gtm-cofounder--pricing",
    name: "pricing",
    repo: cofounder,
    categories: ["growth"],
    summary:
      "Chooses the value metric, the tiers, the free line, and the actual number.",
  },
  {
    slug: "gtm-cofounder--founder-led-sales",
    name: "founder-led-sales",
    repo: cofounder,
    categories: ["outbound"],
    summary:
      "Coaches the first sales conversations: champion, buyer, demo, and the stall.",
  },
  {
    slug: "gtm-cofounder--founder-led-content",
    name: "founder-led-content",
    repo: cofounder,
    categories: ["copy"],
    summary:
      "Builds authority by teaching the problem, and leaves feature announcements for later.",
  },
  {
    slug: "gtm-cofounder--know-if-its-working",
    name: "know-if-its-working",
    repo: cofounder,
    categories: ["measurement"],
    summary:
      "Measures developer retention and the funnel that leads to revenue, and ignores the vanity charts.",
  },
  {
    slug: "gtm-cofounder--market-scan",
    name: "market-scan",
    repo: cofounder,
    categories: ["positioning"],
    summary:
      "Re-scans rivals and the category for what changed since the brief was written.",
  },
  {
    slug: "gtm-cofounder--review-the-work",
    name: "review-the-work",
    repo: cofounder,
    categories: ["operating-system"],
    summary:
      "Stress-tests a deliverable against the brief before it is shown to the founder.",
  },
  {
    slug: "gtm-cofounder--growth-loops",
    name: "growth-loops",
    repo: cofounder,
    categories: ["growth"],
    summary:
      "Turns the first fifty users into loops so the next thousand do not depend on founder hours.",
  },
  {
    slug: "coldiq--first-touch",
    name: "first-touch",
    repo: coldiq,
    categories: ["copy", "outbound"],
    summary: "Writes the first cold email for a B2B outbound campaign.",
  },
  {
    slug: "coldiq--follow-up",
    name: "follow-up",
    repo: coldiq,
    categories: ["copy", "outbound"],
    summary: "Writes the later emails in a sequence, for the people who did not reply.",
  },
  {
    slug: "coldiq--copywriting",
    name: "copywriting",
    repo: coldiq,
    categories: ["copy"],
    summary: "Cold email frameworks, principles, and how a sequence is structured.",
  },
  {
    slug: "coldiq--subject-lines",
    name: "subject-lines",
    repo: coldiq,
    categories: ["copy"],
    summary: "Writes and compares subject lines for cold email.",
  },
  {
    slug: "coldiq--personalization",
    name: "personalization",
    repo: coldiq,
    categories: ["copy"],
    summary: "Personalization strategy and the prompts used to do it at list scale.",
  },
  {
    slug: "coldiq--atl-messaging",
    name: "atl-messaging",
    repo: coldiq,
    categories: ["copy"],
    summary: "Cold email aimed at VPs, directors, and the C-level.",
  },
  {
    slug: "coldiq--btl-messaging",
    name: "btl-messaging",
    repo: coldiq,
    categories: ["copy"],
    summary: "Cold email aimed at managers and individual contributors.",
  },
  {
    slug: "coldiq--re-engagement",
    name: "re-engagement",
    repo: coldiq,
    categories: ["outbound"],
    summary: "Writes back to cold or closed-lost leads.",
  },
  {
    slug: "coldiq--email-infra",
    name: "email-infra",
    repo: coldiq,
    categories: ["deliverability"],
    summary: "Domain setup, DNS, warm-up, and troubleshooting for cold email infrastructure.",
  },
  {
    slug: "coldiq--define-icp",
    name: "define-icp",
    repo: coldiq,
    categories: ["icp"],
    summary: "Defines the ICP with firmographic, technographic, and behavioral tiers.",
  },
  {
    slug: "coldiq--source-companies",
    name: "source-companies",
    repo: coldiq,
    categories: ["lists"],
    summary: "Finds target companies from a reverse ICP, lookalikes, and website filters.",
  },
  {
    slug: "coldiq--find-contacts",
    name: "find-contacts",
    repo: coldiq,
    categories: ["lists"],
    summary: "Finds the decision-makers at those companies and expands titles.",
  },
  {
    slug: "coldiq--qualify-accounts",
    name: "qualify-accounts",
    repo: coldiq,
    categories: ["icp", "lists"],
    summary: "Scores accounts into ABM tiers and layers intent on top of fit.",
  },
  {
    slug: "coldiq--persona-mapping",
    name: "persona-mapping",
    repo: coldiq,
    categories: ["icp"],
    summary: "Maps the buying committee inside a target account.",
  },
  {
    slug: "coldiq--account-selection",
    name: "account-selection",
    repo: coldiq,
    categories: ["lists"],
    summary: "Builds, scores, and stages the target account list.",
  },
  {
    slug: "coldiq--clean-validate",
    name: "clean-validate",
    repo: coldiq,
    categories: ["lists", "deliverability"],
    summary: "Verifies emails and phones, dedupes, and keeps bounce rate in check.",
  },
  {
    slug: "coldiq--deduplicate",
    name: "deduplicate",
    repo: coldiq,
    categories: ["lists"],
    summary: "Merges prospect lists that arrived from more than one source.",
  },
  {
    slug: "marketing-skills--cold-email",
    name: "cold-email",
    repo: corey,
    categories: ["copy", "outbound"],
    summary: "Writes B2B cold emails and the follow-ups that ask for a reply.",
  },
  {
    slug: "marketing-skills--copywriting",
    name: "copywriting",
    repo: corey,
    categories: ["copy"],
    summary: "Writes and rewrites marketing pages: home, pricing, feature, and product.",
  },
  {
    slug: "marketing-skills--cro",
    name: "cro",
    repo: corey,
    categories: ["growth"],
    summary: "Improves conversion on a page or a form.",
  },
  {
    slug: "marketing-skills--pricing",
    name: "pricing",
    repo: corey,
    categories: ["growth"],
    summary: "Pricing, packaging, and the free-to-paid line.",
  },
  {
    slug: "marketing-skills--offers",
    name: "offers",
    repo: corey,
    categories: ["copy", "growth"],
    summary: "Designs the offer itself: value, bonus, guarantee, and the name.",
  },
  {
    slug: "marketing-skills--launch",
    name: "launch",
    repo: corey,
    categories: ["growth"],
    summary: "Plans a product launch or a feature announcement.",
  },
  {
    slug: "marketing-skills--customer-research",
    name: "customer-research",
    repo: corey,
    categories: ["icp"],
    summary: "Synthesises customer research, calls, and transcripts into an ICP.",
  },
  {
    slug: "marketing-skills--competitor-profiling",
    name: "competitor-profiling",
    repo: corey,
    categories: ["positioning"],
    summary: "Profiles competitors from their URLs.",
  },
  {
    slug: "marketing-skills--product-marketing",
    name: "product-marketing",
    repo: corey,
    categories: ["positioning", "context"],
    summary: "Writes the product marketing context the other skills should read.",
  },
  {
    slug: "marketing-skills--prospecting",
    name: "prospecting",
    repo: corey,
    categories: ["lists"],
    summary: "Finds and qualifies a prospect list for B2B or local businesses.",
  },
  {
    slug: "marketing-skills--onboarding",
    name: "onboarding",
    repo: corey,
    categories: ["growth"],
    summary: "Improves the path from signup to a first real use.",
  },
  {
    slug: "marketing-skills--ai-seo",
    name: "ai-seo",
    repo: corey,
    categories: ["growth"],
    summary: "Shapes content so answer engines can cite it.",
  },
  {
    slug: "marketing-skills--marketing-plan",
    name: "marketing-plan",
    repo: corey,
    categories: ["operating-system", "growth"],
    summary: "Writes a marketing plan for a company or a client.",
  },
  {
    slug: "company-os--gtm-strategist",
    name: "gtm-strategist",
    repo: company,
    categories: ["operating-system", "context"],
    summary: "Strategy skill shipped inside the Company OS starter kit.",
  },
  {
    slug: "company-os--icp-modeller",
    name: "icp-modeller",
    repo: company,
    categories: ["icp", "context"],
    summary: "ICP skill shipped inside the Company OS starter kit.",
  },
  {
    slug: "company-os--outbound-copywriter",
    name: "outbound-copywriter",
    repo: company,
    categories: ["copy"],
    summary: "Outbound copy skill shipped inside the Company OS starter kit.",
  },
  {
    slug: "company-os--linkedin-post-writer",
    name: "linkedin-post-writer",
    repo: company,
    categories: ["linkedin", "copy"],
    summary: "LinkedIn post skill shipped inside the Company OS starter kit.",
  },
  {
    slug: "company-os--discovery-prep",
    name: "discovery-prep",
    repo: company,
    categories: ["context"],
    summary: "Discovery-call prep skill shipped inside the Company OS starter kit.",
  },
];

const tierOrder: Record<Tier, number> = { house: 0, vetted: 1, open: 2 };

export function authorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug);
}

export function repoBySlug(slug: string) {
  return repos.find((repo) => repo.slug === slug);
}

export function skillBySlug(slug: string) {
  return skills.find((skill) => skill.slug === slug);
}

export function skillsInRepo(repoSlug: string) {
  return skills.filter((skill) => skill.repo === repoSlug);
}

const shelfOrder = [
  "agentic-gtm",
  "cold-outbound",
  "gtm-cofounder",
  "coldiq",
  "marketing-skills",
  "autoclay",
  "google-maps",
  "linkedin-writer",
  "company-os",
  "swan",
  "explorium",
  "gtm-toolkit",
  "gtm-strategist",
  "geo-engineer",
];

export function sortedRepos() {
  return [...repos].sort((a, b) => {
    const tier = tierOrder[a.tier] - tierOrder[b.tier];
    if (tier !== 0) return tier;
    const left = shelfOrder.indexOf(a.slug);
    const right = shelfOrder.indexOf(b.slug);
    return (left === -1 ? 99 : left) - (right === -1 ? 99 : right);
  });
}

export function categoryLabel(id: CategoryId) {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function githubUrl(github: string) {
  return `https://github.com/${github}`;
}

export function skillInstall(skill: Skill) {
  const repo = repoBySlug(skill.repo);
  if (!repo) return "";
  const pack = repo.commands.find((command) => command.value.startsWith("npx skills add"));
  if (!pack) return "";
  return `${pack.value} --skill ${skill.name}`;
}

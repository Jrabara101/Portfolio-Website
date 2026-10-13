import type { ReactNode } from 'react'

// Case studies are data, rendered by pages/CaseStudy.tsx through a small set of
// block types. Copy is carried over verbatim from the former static pages
// (legacy/case-study-*.html).

export type Card = { eyebrow?: string; big?: string; title?: ReactNode; body: ReactNode }

export type Block =
  | { type: 'p'; body: ReactNode }
  | { type: 'lead'; body: ReactNode }
  | { type: 'numbered'; items: { title: string; body: ReactNode }[] }
  | { type: 'bullets'; items: ReactNode[] }
  | { type: 'cards'; cols: 1 | 2 | 3; accent?: boolean; items: Card[] }
  | { type: 'callout'; label?: string; title?: string; body: ReactNode }
  | { type: 'palette'; colors: { name: string; hex: string }[] }
  | { type: 'figure'; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: 'gallery'; items: { src: string; alt: string; width: number; height: number; caption: string }[] }
  | { type: 'stack'; layers: { rows: { title: string; detail: string }[]; linkBelow?: string }[] }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'note'; body: ReactNode }

export type Section = { id: string; title: string; blocks: Block[] }

export type CaseStudy = {
  slug: string
  name: string
  eyebrow: string
  title: string
  lede: ReactNode
  /** Short description used on the home-page card. */
  summary: string
  cardTags: string[]
  category: string
  year: string
  cover?: { src: string; alt: string; width: number; height: number; fit?: 'cover' | 'contain'; bg?: string; position?: string }
  meta: { label: string; value: string }[]
  tags: string[]
  links?: { label: string; href: string; primary?: boolean }[]
  sections: Section[]
  cta: { title: string; body: string; secondary: { label: string; href: string } }
}

const C = ({ children }: { children: ReactNode }) => <code>{children}</code>

export const caseStudies: CaseStudy[] = [
  /* ------------------------------------------------------------------ alon */
  {
    slug: 'alon',
    name: 'alon',
    eyebrow: 'Case Study · Concept Project',
    title: 'alon: a sea-inspired skincare brand, from logo to Shopify store',
    lede: (
      <>
        <em>Alon</em> means “wave” in Tagalog. I created alon as a self-initiated brief to show the full job I do for
        small e-commerce brands: a brand identity, the Shopify store that sells it, a launch landing page, the packaging
        customers unbox, and the social posts that bring them in — all as one consistent system.
      </>
    ),
    summary:
      'Brand identity, Shopify store, launch landing page, packaging, and an Instagram kit — one consistent system for a small e-commerce brand.',
    cardTags: ['Brand Identity', 'Shopify', 'Packaging'],
    category: 'Brand + Shopify',
    year: '2026',
    cover: {
      src: '/images/alon/hero-trio.webp',
      alt: 'alon Sea Kelp Serum, Gentle Tide Cleanser, and Coral Glow Toner on a stone plinth',
      width: 1200,
      height: 896,
    },
    meta: [
      { label: 'Role', value: 'Brand & UI Designer' },
      { label: 'Year', value: '2026' },
      { label: 'Industry', value: 'Beauty · E-commerce' },
      { label: 'Type', value: 'Concept brief' },
    ],
    tags: ['Brand Identity', 'Shopify Store', 'Landing Page', 'Packaging', 'Figma', 'Canva'],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'p',
            body: 'Small skincare brands compete for attention with labels that have far bigger budgets. Three things usually hold them back:',
          },
          {
            type: 'numbered',
            items: [
              {
                title: 'They look generic.',
                body: "A stock logo and a default theme don't earn the trust needed to buy something that goes on your skin.",
              },
              {
                title: 'Every touchpoint looks different.',
                body: 'The Instagram feed, the store, and the box arrive looking like three different companies.',
              },
              {
                title: 'Design and build are split.',
                body: "A designer hands over a file, a developer interprets it, and the store that launches isn't the one that was designed.",
              },
            ],
          },
        ],
      },
      {
        id: 'identity',
        title: 'Brand identity',
        blocks: [
          {
            type: 'p',
            body: 'The brand is built around one idea: the calm of the Philippine sea. A circular wave mark sits beside a lowercase serif wordmark, so the logo reads as quiet and premium rather than loud.',
          },
          {
            type: 'palette',
            colors: [
              { name: 'Deep Tide', hex: '#0F3B3A' },
              { name: 'Sea Mist', hex: '#CFE3DD' },
              { name: 'Coral Clay', hex: '#E07A5F' },
              { name: 'Sand', hex: '#F3ECE2' },
              { name: 'Ink', hex: '#1C1C1C' },
            ],
          },
          {
            type: 'callout',
            title: 'Typography',
            body: (
              <>
                <strong>Fraunces</strong> for headlines gives the editorial, premium feel of a magazine.{' '}
                <strong>DM Sans</strong> for body copy stays clean and readable on small product labels and on mobile.
              </>
            ),
          },
        ],
      },
      {
        id: 'range',
        title: 'Product range',
        blocks: [
          {
            type: 'p',
            body: 'Three products, each with its own colour from the palette, so customers can tell them apart at a glance while the range still reads as one family.',
          },
          {
            type: 'gallery',
            items: [
              { src: '/images/alon/serum.webp', alt: 'alon Sea Kelp Serum dropper bottle on sea-mist background', width: 896, height: 1200, caption: 'Sea Kelp Serum' },
              { src: '/images/alon/cleanser.webp', alt: 'alon Gentle Tide Cleanser pump bottle on sand background', width: 896, height: 1200, caption: 'Gentle Tide Cleanser' },
              { src: '/images/alon/toner.webp', alt: 'alon Coral Glow Toner bottle on coral background', width: 896, height: 1200, caption: 'Coral Glow Toner' },
            ],
          },
        ],
      },
      {
        id: 'store',
        title: 'Shopify store & launch page',
        blocks: [
          {
            type: 'p',
            body: 'Beauty shoppers decide in seconds, and most of them are on a phone. The store and landing page were designed around that.',
          },
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'One message above the fold',
                body: 'The homepage leads with a single line — “Calm skin, inspired by the sea.” — and one primary button. Trust badges (dermatologist tested, reef-safe, cruelty-free, made in the Philippines) sit directly underneath, answering the first questions a skincare buyer has before they scroll.',
              },
              {
                title: 'A mobile product page built to convert',
                body: 'Price, size options, and the Add to Cart button stay in reach of the thumb. Ingredients and reviews come after, for the shoppers who want them.',
              },
              {
                title: 'A single-product launch page',
                body: 'For ad traffic, a dedicated Sea Kelp Serum page tells one story in order: hero → proof → three key ingredients → a three-step ritual → reviews → one call to action. No menu of distractions between the visitor and the checkout.',
              },
            ],
          },
          {
            type: 'figure',
            src: '/images/alon/lifestyle-beach.webp',
            alt: 'Hand holding alon Sea Kelp Serum at the beach at sunset',
            width: 1200,
            height: 896,
          },
        ],
      },
      {
        id: 'packaging',
        title: 'Packaging, print & social',
        blocks: [
          {
            type: 'p',
            body: 'For an online brand, the unboxing is the first time a customer holds the product. The system carries through to every physical and social touchpoint:',
          },
          {
            type: 'cards',
            cols: 2,
            accent: true,
            items: [
              { title: 'Serum box & labels', body: 'A deep-tide box with a thin coral wave line, and a label system shared across all three products.' },
              { title: 'Business cards & thank-you insert', body: '“Salamat for choosing calm.” — a card in every order that turns a delivery into a moment worth posting.' },
              { title: 'Stickers', body: 'A round “Reef-Safe · Vegan · Cruelty-Free” seal that doubles as a promise and a packaging detail.' },
              { title: 'Instagram kit', body: 'Six reusable post templates — product, quote, tips, lifestyle, texture — so the feed always matches the store.' },
            ],
          },
          {
            type: 'figure',
            src: '/images/alon/texture.webp',
            alt: 'alon serum texture swirl on sand with dropper bottle',
            width: 1024,
            height: 1024,
          },
        ],
      },
      {
        id: 'outcome',
        title: 'What a client gets from this',
        blocks: [
          {
            type: 'bullets',
            items: [
              'One brand system that works the same on a bottle, a box, a phone screen, and an Instagram grid.',
              'A store and launch page designed around how beauty shoppers actually buy: on mobile, in seconds.',
              'No hand-off gap: I design it in Figma and build it on Shopify myself, so what launches is what was designed.',
            ],
          },
          { type: 'note', body: 'alon is a concept project. Product photography is AI-generated for presentation purposes.' },
        ],
      },
    ],
    cta: {
      title: 'Launching or rebranding a store?',
      body: 'I design and build Shopify stores and brand identities for growing brands — from the logo to the live checkout.',
      secondary: { label: 'See more on Dribbble', href: 'https://dribbble.com/jrabarav2' },
    },
  },

  /* ------------------------------------------------------------------ FLOW */
  {
    slug: 'flow',
    name: 'FLOW',
    eyebrow: 'Case Study · Client Work',
    title: 'Building FLOW: one platform for Finance, Logistics, Operations & Workforce',
    lede: (
      <>
        Most small and mid-sized businesses run on four or five disconnected tools that don't talk to each other — a
        spreadsheet for finance, a separate HR file, a chat thread for logistics. FLOW is the product I build at PRDGM
        Mugen Trading Corp to collapse that into a single platform, and this is how it gets designed, shipped, and kept
        running.
      </>
    ),
    summary:
      'The architecture decisions, deployment pipeline, and client-support loop behind the four-module business platform I build in Laravel and React.',
    cardTags: ['Laravel', 'React', 'Cloudways', 'CI/CD'],
    category: 'Client Work · Design + Build',
    year: '2025 —',
    meta: [
      { label: 'Role', value: 'Full-Stack Developer' },
      { label: 'Timeline', value: 'Aug 2025 – Present' },
      { label: 'Company', value: 'PRDGM Mugen Trading' },
      { label: 'Process', value: 'Agile Scrum' },
    ],
    tags: ['Laravel', 'React', 'MySQL', 'Bootstrap', 'Cloudways', 'GitHub CI/CD'],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'p',
            body: 'Our clients operate across e-commerce, HR, day-to-day operations, and logistics. Before FLOW, each of those functions lived in its own place. That creates three concrete costs:',
          },
          {
            type: 'numbered',
            items: [
              { title: 'Re-keying.', body: 'The same order, employee, or shipment gets typed into two or three systems, and the copies drift apart.' },
              { title: 'No single source of truth.', body: 'When finance and operations disagree on a number, there is no system that settles it.' },
              {
                title: 'Every client is different.',
                body: 'A logistics-heavy client and a retail client need genuinely different workflows, so a rigid off-the-shelf product gets abandoned within weeks.',
              },
            ],
          },
        ],
      },
      {
        id: 'pillars',
        title: 'What FLOW actually is',
        blocks: [
          {
            type: 'p',
            body: 'FLOW is an acronym for the four pillars it covers. Each is a module on a shared data layer, so a record created in one is immediately visible to the others.',
          },
          {
            type: 'cards',
            cols: 2,
            items: [
              { big: 'F', title: 'Finance', body: 'Checkout and order flows, invoicing, and the transaction records that the rest of the platform reconciles against.' },
              { big: 'L', title: 'Logistics', body: 'Inventory and movement of goods — what exists, where it is, and what state it is in.' },
              { big: 'O', title: 'Operations', body: 'The day-to-day workflows that tie the other modules together, plus the dashboards management actually opens each morning.' },
              { big: 'W', title: 'Workforce', body: 'HRIS: employee records, attendance, and the role definitions that drive permissions across every other module.' },
            ],
          },
        ],
      },
      {
        id: 'architecture',
        title: 'Architecture & the decisions behind it',
        blocks: [
          {
            type: 'stack',
            layers: [
              { rows: [{ title: 'React front end', detail: 'role-aware UI per module' }], linkBelow: 'REST (JSON)' },
              {
                rows: [
                  { title: 'Laravel API', detail: 'controllers · services · auth' },
                  { title: 'Eloquent models', detail: 'shared domain layer' },
                ],
                linkBelow: '',
              },
              { rows: [{ title: 'MySQL', detail: 'one schema, four module boundaries' }] },
            ],
          },
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'One database, not four services',
                body: 'The whole point of FLOW is that finance and workforce data agree with each other. Splitting the modules into separate services would have meant syncing them, which reintroduces exactly the drift the product exists to eliminate. A single relational schema with clear module boundaries gives us referential integrity for free. The trade-off is that the modules deploy together — acceptable at our scale, and revisitable later.',
              },
              {
                title: 'Laravel for the domain, React for the surface',
                body: 'Business rules — who may approve what, how a transaction settles — live in Laravel services, never in the client. The React layer stays a rendering and interaction concern talking to a REST API. That split means a rule changes in exactly one place, and it keeps the rules enforceable rather than merely displayed.',
              },
              {
                title: 'Roles as the configuration layer',
                body: 'Because every client needs a slightly different workflow, per-client customisation is expressed through roles and permissions defined in the Workforce module rather than through forked code. One codebase serves clients with genuinely different operating models, which is what makes the product maintainable as the client list grows.',
              },
            ],
          },
        ],
      },
      {
        id: 'shipping',
        title: 'Shipping and keeping it up',
        blocks: [
          {
            type: 'p',
            body: 'I own the platform end to end, which includes everything after the code is written. FLOW runs on a Cloudways enterprise server that I provisioned and maintain.',
          },
          {
            type: 'cards',
            cols: 2,
            accent: true,
            items: [
              {
                title: 'Staging → production',
                body: "Work lands on a staging environment that mirrors production, gets checked against the phase's acceptance criteria, and only then gets promoted. Clients see changes on staging before they are live.",
              },
              {
                title: 'GitHub-triggered builds',
                body: 'Pushes to the main and dev branches trigger deployments via webhooks, so releases are repeatable rather than a manual sequence someone has to remember correctly at 6pm.',
              },
              { title: 'SSL & domains', body: 'Certificate issuance and renewal, DNS, and domain mapping for each client deployment.' },
              {
                title: 'Post-deployment monitoring',
                body: "Watching the live site after each release, because the release is not finished when the build goes green — it is finished when the client's Monday morning works.",
              },
            ],
          },
        ],
      },
      {
        id: 'process',
        title: 'How the work runs',
        blocks: [
          {
            type: 'p',
            body: 'We work in Agile Scrum, shipping enhancements each phase. The part I find most valuable is that I also do the client support for what I build: I run onboarding walkthroughs, take the bug reports directly, and ship the fixes.',
          },
          {
            type: 'callout',
            body: 'That closes a loop most developers never get to close. When you are the person who explains your own interface to the user who has to live in it every day, you find out within a week which of your design decisions were actually good ones. A surprising amount of what I have changed in FLOW came out of a support call rather than a planning session.',
          },
        ],
      },
      {
        id: 'status',
        title: 'Where it stands',
        blocks: [
          {
            type: 'bullets',
            items: [
              'All four modules are live and in daily use, on a single shared schema.',
              'Releases go out each phase through a repeatable staging-to-production pipeline rather than ad-hoc manual deploys.',
              'New client requirements are absorbed through role and permission configuration instead of forking the codebase.',
              'Customer-facing landing pages ship alongside the platform to support client acquisition.',
            ],
          },
        ],
      },
      {
        id: 'lessons',
        title: "What I'd do differently",
        blocks: [
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'Define the module boundaries in writing on day one',
                body: 'A shared schema is only a strength while the boundaries between modules are explicit. We arrived at clear ones, but I would rather have written them down before the first migration than discovered them through a refactor.',
              },
              {
                title: 'Automated tests around the money paths, earlier',
                body: 'Manual QA catches interface problems well. It is a weaker guarantee for the finance logic, where a regression is expensive and silent. That is the first place I would add coverage.',
              },
              {
                title: 'Instrument before you need it',
                body: 'Monitoring added after a problem tells you the problem is happening. Monitoring added beforehand tells you what changed. Worth the setup cost up front.',
              },
            ],
          },
        ],
      },
    ],
    cta: {
      title: 'Want something like this built?',
      body: 'I build full-stack platforms end to end — architecture, implementation, deployment, and the support that keeps them running.',
      secondary: { label: 'See other work', href: '/#work' },
    },
  },

  /* --------------------------------------------------------- Word Scramble */
  {
    slug: 'word-scramble',
    name: 'Word Scramble',
    eyebrow: 'Case Study · Experiment',
    title: 'Word Scramble: putting a game leaderboard on-chain without making players learn crypto',
    lede: (
      <>
        A retro, mid-century-themed word puzzle where solving a scramble writes your score to a Soroban smart contract on
        Stellar, and hitting a milestone mints an achievement badge automatically. The interesting engineering isn't the
        game — it's everything I had to remove so that a player who has never heard of Stellar can still end up with a
        verifiable on-chain score.
      </>
    ),
    summary:
      'A word puzzle with an on-chain leaderboard: two Soroban contracts on Stellar, badges minted by inter-contract call, and fee sponsorship so players never need to hold XLM.',
    cardTags: ['Soroban', 'Rust', 'Stellar'],
    category: 'Experiment · On-chain',
    year: '2026',
    cover: { src: '/images/word-scramble.png', alt: 'Word Scramble game logo', width: 512, height: 512, fit: 'contain', bg: '#6b4423' },
    meta: [
      { label: 'Role', value: 'Solo Developer' },
      { label: 'Timeline', value: 'Jun – Aug 2026' },
      { label: 'Context', value: 'Stellar Builders' },
      { label: 'Contracts', value: '3 on Mainnet' },
    ],
    tags: ['Soroban', 'Rust', 'Stellar SDK', 'Vanilla JS', 'Cloudflare Workers', 'GitHub Actions'],
    links: [
      { label: 'Play the game', href: 'https://word-scramble-v1.surge.sh/', primary: true },
      { label: 'View source', href: 'https://github.com/Jrabara101/Stellar-Paradigm' },
    ],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'p',
            body: "A leaderboard is the oldest feature in games, and normally it's a database table. Putting it on-chain buys one specific thing: the scores are verifiable and nobody — including me — can quietly edit them. That's a real property worth having.",
          },
          {
            type: 'p',
            body: "The cost is brutal, though. To write a score on-chain the traditional way, a player needs a wallet, needs that wallet funded, needs to understand what a transaction fee is, and needs to approve a signing prompt. That's four chances to lose someone before they've played a single round. Most blockchain games quietly accept this and end up with an audience of people who already own crypto.",
          },
          {
            type: 'p',
            body: 'I wanted the on-chain guarantee without the on-chain onboarding. The whole project became an exercise in deleting steps between "I solved a word" and "my score is provably mine."',
          },
        ],
      },
      {
        id: 'contracts',
        title: 'Two contracts that talk to each other',
        blocks: [
          {
            type: 'p',
            body: "The on-chain layer is deliberately split. A leaderboard contract owns scores; a reward contract owns badges. They're separate because they have different authorization rules and different reasons to change.",
          },
          {
            type: 'cards',
            cols: 2,
            items: [
              {
                title: 'LeaderboardContract',
                body: (
                  <>
                    <p>
                      Holds a top-100 table. <C>submit_score</C> only overwrites an entry when you actually beat your
                      previous best, so the contract is naturally idempotent — replaying a transaction can't inflate
                      anyone's score.
                    </p>
                    <p>
                      Every player-facing write calls <C>require_auth()</C> on the player, so you can only ever write your
                      own row.
                    </p>
                  </>
                ),
              },
              {
                title: 'RewardContract',
                body: (
                  <>
                    <p>
                      Mints BRONZE / SILVER / GOLD / LEGEND badges at 100, 300, 500 and 1000 points. Minting is
                      idempotent too — the same badge is never issued twice.
                    </p>
                    <p>
                      Its <C>init</C> authorizes exactly one caller: the leaderboard contract. No player, and no admin,
                      can mint a badge directly.
                    </p>
                  </>
                ),
              },
            ],
          },
          {
            type: 'p',
            body: (
              <>
                The part I like most is that badges cost the player nothing extra. <C>submit_score</C> performs an
                inter-contract call into the reward contract in the same transaction, so a milestone badge appears as a
                side effect of saving your score. There's no second prompt, no second fee, and no way to end up with a
                score saved but the badge missing — if the transaction succeeds, both happened.
              </>
            ),
          },
          {
            type: 'p',
            body: (
              <>
                The frontend is deliberately boring by comparison: vanilla HTML, CSS and JavaScript with no framework and
                no build step, talking to the contracts through a single 575-line <C>stellar.js</C> integration layer. A
                game that lives or dies on load time didn't need a bundler.
              </>
            ),
          },
        ],
      },
      {
        id: 'sponsorship',
        title: 'Removing the wallet-funding barrier',
        blocks: [
          {
            type: 'p',
            body: "On testnet this problem hides: Friendbot funds any new account for free, so I never felt the friction. Mainnet has no Friendbot. A brand-new player would arrive at a game that demanded they go buy XLM before they could save a score — which is where they'd leave.",
          },
          {
            type: 'p',
            body: "So mainnet runs behind a Cloudflare Worker that does two jobs: it sponsors account creation (covering the reserve for players who don't have an activated account), and it fee-bumps the score submission so the player never pays a transaction fee. The player still signs — they keep custody, and the contract still verifies it's their own score — but they never need to hold a balance.",
          },
          {
            type: 'callout',
            label: 'A bug worth remembering',
            body: 'Sponsored accounts initially started with a zero balance, and Freighter refuses to sign a transaction from an account showing nothing. The sponsorship was technically correct and completely unusable. The wallet\'s own safety check was the thing standing between the player and the feature — a reminder that "the transaction is valid" and "the user can actually send it" are different claims.',
          },
        ],
      },
      {
        id: 'security',
        title: 'What the security review caught',
        blocks: [
          {
            type: 'p',
            body: "Before deploying to mainnet I wrote a self-conducted review of all three contracts. It isn't a third-party audit and I don't present it as one, but forcing myself to write down every state-changing entry point and who is allowed to call it found two real access-control gaps that I'd otherwise have shipped.",
          },
          {
            type: 'callout',
            title: 'The one that mattered',
            body: (
              <>
                <C>set_reward_contract</C> — the function that wires the leaderboard to the badge minter — took no
                authorization at all. On testnet that's harmless. On mainnet, anyone could have called it and repointed the
                leaderboard at a contract they controlled. It was found while re-wiring for the mainnet deploy and fixed
                before launch, so the deployed contract ID reflects the corrected version.
              </>
            ),
          },
          {
            type: 'p',
            body: (
              <>
                The workspace also compiles with <C>overflow-checks = true</C> and <C>panic = "abort"</C>, so an
                arithmetic overflow halts the transaction rather than silently wrapping a score. Contract behaviour is
                covered by a unit test suite that runs in CI on every push, alongside a check that every{' '}
                <C>contract.call(...)</C> in the frontend matches a real exported function in the Rust source — a class of
                bug that otherwise only surfaces at runtime, in front of a player.
              </>
            ),
          },
        ],
      },
      {
        id: 'status',
        title: 'Where it stands',
        blocks: [
          {
            type: 'stats',
            items: [
              { value: '3', label: 'Contracts live' },
              { value: '50+', label: 'Testnet users' },
              { value: '100', label: 'Leaderboard cap' },
              { value: '0', label: 'XLM needed' },
            ],
          },
          {
            type: 'p',
            body: "The leaderboard contract was redeployed once, in July 2026, to raise the cap from 10 to 100 entries ahead of scaling past 50 testnet users. Scores already earned on the old contract were carried forward through a one-time, admin-authenticated migration rather than being wiped — people had earned those, and resetting them to make my deploy easier would have been the wrong trade.",
          },
        ],
      },
      {
        id: 'lessons',
        title: "What I'd do differently",
        blocks: [
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'Design for mainnet constraints from day one',
                body: "Friendbot made testnet frictionless and hid the single biggest UX problem in the product. The fee-sponsorship worker — probably the most important feature in the whole build — only got written because mainnet forced it. If I'd developed against mainnet constraints earlier, the architecture would have accounted for sponsorship from the start instead of gaining it late.",
              },
              {
                title: 'Get the leaderboard sizing right before deploying',
                body: "A cap of 10 was fine for a demo and wrong within weeks. On-chain, that mistake isn't a migration script — it's a redeploy, a new contract ID, and a data migration for scores real people earned. Immutability is the feature, which means the cost of a careless default is much higher than it is behind a database.",
              },
              {
                title: 'Write the authorization table first, not last',
                body: "Both access-control gaps were found by tabulating every entry point against who may call it — an exercise that took an afternoon and would have taken minutes if I'd done it while writing the contracts. Enumerating the callers is a design step, not a review step.",
              },
            ],
          },
        ],
      },
    ],
    cta: {
      title: 'Want something like this built?',
      body: "I build full-stack and on-chain products end to end — contracts, frontend, deployment, and the unglamorous work that makes them usable by people who aren't developers.",
      secondary: { label: 'See other work', href: '/#work' },
    },
  },

  /* ----------------------------------------------------------- Spark Match */
  {
    slug: 'spark-match',
    name: 'Spark Match',
    eyebrow: 'Case Study · Experiment',
    title: 'Spark Match: what to build when the budget is five dollars',
    lede: (
      <>
        A challenge to turn $5 into measurable real-world impact. Donated, $5 is $5 of impact exactly once. So I spent it
        on hosting instead and built a tool that removes the thing actually stopping people from volunteering — not money,
        but not knowing what to do, who to contact, or what to say.
      </>
    ),
    summary:
      'Good intentions stall on too many options. A short branching chat reads your skill and your free time, then commits to one concrete good deed — a single answer instead of a list.',
    cardTags: ['Conversational UI', 'Matching Logic', 'Cloudflare Pages'],
    category: 'Experiment · Product',
    year: '2026',
    cover: { src: '/images/spark-match.png', alt: 'Spark Match chat interface', width: 715, height: 482, bg: '#0f2038', position: 'top' },
    meta: [
      { label: 'Role', value: 'Solo Developer' },
      { label: 'Timeline', value: 'Aug 2026' },
      { label: 'Context', value: 'DoGoodie $5 Hack' },
      { label: 'Running cost', value: '$0 / month' },
    ],
    tags: ['React 19', 'TypeScript', 'Vite', 'Cloudflare Pages', 'Design Tokens'],
    links: [
      { label: 'Try it live', href: 'https://spark-match.pages.dev/', primary: true },
      { label: 'View source', href: 'https://github.com/Jrabara101/Spark-Match' },
    ],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'p',
            body: "The brief was a constraint disguised as a budget: turn $5 into measurable impact. The obvious move is to donate it. That's real, and it's also finished the moment it happens.",
          },
          {
            type: 'p',
            body: "The reframe I settled on was that money usually isn't the blocker for volunteering — decision friction is. People are willing. What stops them is a blank page: they don't know what needs doing, who to approach, or how to open the conversation without feeling awkward. Every one of those is a research task, and research tasks are where good intentions go to die.",
          },
          {
            type: 'p',
            body: 'So the $5 went into infrastructure rather than a one-time gift — a free, permanent tool that keeps working long after the money is spent. The measurable-impact bar then applies to the tool, not the donation, which is a much harder standard to meet.',
          },
        ],
      },
      {
        id: 'flow',
        title: 'Three questions, one answer',
        blocks: [
          {
            type: 'p',
            body: 'The interface is a chat thread with tappable chips instead of a form, because a form implies work and a conversation implies being helped. It asks only three things — your skill, your available time, your cause — then commits to a single recommendation.',
          },
          {
            type: 'cards',
            cols: 3,
            items: [
              { eyebrow: 'Step 1', title: 'Your skill', body: 'Writing, design, coding, organizing people, or simply time. Five honest options rather than a taxonomy.' },
              {
                eyebrow: 'Step 2',
                title: 'Your time',
                body: (
                  <>
                    15 minutes, about an hour, or 3+ hours — phrased as what you've <em>actually</em> got this week, not
                    what you wish you had.
                  </>
                ),
              },
              {
                eyebrow: 'Step 3',
                title: 'Your cause',
                body: 'Animals, kids, environment, homelessness, mental health — or "surprise me", for people who want to help but don\'t have a preference.',
              },
            ],
          },
          {
            type: 'p',
            body: 'The output is deliberately singular: one specific action, plus a ready-to-send outreach message you can copy and paste. Returning a list would have recreated the exact problem the tool exists to solve — another set of options to evaluate. Handing over the words to send is the part I think matters most, because "what do I even say?" is where most people stall after they\'ve already decided to help.',
          },
        ],
      },
      {
        id: 'content',
        title: 'The hard part was writing, not code',
        blocks: [
          {
            type: 'p',
            body: "The matching logic is a lookup: 5 skills × 5 causes gives 25 cells, and each cell holds three time-scaled variants plus an outreach message. That's 100 hand-written pieces of content, and writing them was most of the project.",
          },
          {
            type: 'callout',
            body: (
              <>
                <p>
                  The rule I held myself to was that no cell could contain generic filler like "reach out to a local
                  charity." Every entry names a real platform, a real kind of organization, and a concrete first move —
                  writing a bio for a specific adoptable animal on a shelter's Petfinder listing, or drafting project
                  descriptions for teachers at a Title I school.
                </p>
                <p>
                  Several also carry the reason the task matters, because "shelters are overwhelmed and bare-bones bios get
                  far fewer views" is what converts a chore into something worth doing.
                </p>
              </>
            ),
          },
          {
            type: 'p',
            body: "I chose a static lookup table over calling a language model, and I'd make that call again. The table is reviewable, costs nothing to run, can't hallucinate an organization that doesn't exist, and returns instantly. For a tool whose entire value is trustworthy specificity, generation would have added risk in exchange for variety nobody asked for.",
          },
        ],
      },
      {
        id: 'measurement',
        title: "Measuring something you can't observe",
        blocks: [
          {
            type: 'p',
            body: 'The brief demanded measurable impact, which is awkward when the impact happens off-platform. I can see that someone got matched; I cannot see whether they actually emailed the shelter.',
          },
          {
            type: 'p',
            body: 'The compromise is a final call to action — "I did it → tell Spark" — that opens a tracking form pre-filled from the session with the skill, time and cause already selected. Self-reporting is imperfect and I don\'t pretend otherwise, but pre-filling removes nearly all the effort from reporting, and what comes back is structured data rather than anecdotes.',
          },
          {
            type: 'callout',
            label: 'The stack reflects the same constraint',
            body: (
              <>
                React 19 and TypeScript on Cloudflare Pages, hand-written CSS tokens with a <C>prefers-color-scheme</C> dark
                mode, and Google Forms as the entire analytics backend. Everything runs at $0/month, because a tool funded
                with $5 has to survive without anyone paying to keep it alive.
              </>
            ),
          },
        ],
      },
      {
        id: 'lessons',
        title: "What I'd do differently",
        blocks: [
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'Distribution should have started before the build finished',
                body: "This is the honest one. The measurement pipeline is instrumented and running, the tool works, and it's live — but building came first and getting it in front of people came second. For a project whose success metric is real-world actions taken, those two should have overlapped from the start. A matcher nobody has opened has produced exactly zero impact, no matter how good the content is.",
              },
              {
                title: 'Design the measurement into the flow, not onto the end',
                body: "The completion form is bolted to the last screen, which means it only ever hears from people who finish in one sitting. Someone who gets matched, does the deed three days later, and never returns is invisible — and that's probably the most common successful path. A follow-up nudge would likely capture more real impact than anything on the results screen.",
              },
              {
                title: 'Five skills by five causes is a maintenance cliff',
                body: 'The grid is quadratic. Adding a sixth cause means writing 18 new pieces of content by hand, all held to the specificity bar. It was the right call for launch, but the structure makes growth expensive — a sparser model with strong fallbacks would scale better if this ever grew beyond its current shape.',
              },
            ],
          },
        ],
      },
    ],
    cta: {
      title: 'Want something like this built?',
      body: 'I build products end to end — and I care as much about framing the right problem as about shipping the solution.',
      secondary: { label: 'See other work', href: '/#work' },
    },
  },

  /* ------------------------------------------------------------ BlindRoute */
  {
    slug: 'blindroute',
    name: 'BlindRoute',
    eyebrow: 'Case Study · Experiment',
    title: 'BlindRoute: proving a delivery happened without saying what was delivered',
    lede: (
      <>
        A delivery escrow on Midnight where the courier releases the payment by proving, in zero knowledge, that they know
        a secret — without that secret, the buyer's address, or anyone's identity ever touching the ledger. The contract is
        four circuits and a clock; the hard part was deciding exactly which facts the public chain is allowed to learn.
      </>
    ),
    summary:
      "Delivery escrow on Midnight where a courier proves delivery in zero knowledge — the ledger never learns the buyer's address, the order, or anyone's identity.",
    cardTags: ['Midnight', 'Compact', 'ZK Proofs'],
    category: 'Experiment · Zero-knowledge',
    year: '2026',
    cover: { src: '/images/blindroute.png', alt: 'BlindRoute escrow dashboard', width: 996, height: 748, bg: '#0f2038', position: 'top' },
    meta: [
      { label: 'Role', value: 'Solo Developer' },
      { label: 'Timeline', value: 'Jul – Aug 2026' },
      { label: 'Network', value: 'Midnight Preview' },
      { label: 'Tests', value: '25 cases in CI' },
    ],
    tags: ['Midnight', 'Compact', 'Zero-Knowledge Proofs', 'TypeScript', 'Vite', 'Lace Wallet'],
    links: [
      { label: 'View live demo', href: 'https://blindroute-web.surge.sh/', primary: true },
      { label: 'View source', href: 'https://github.com/Jrabara101/BlindRoute' },
    ],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'p',
            body: 'Escrow for a physical delivery needs an answer to one question: did the package arrive? On a public blockchain, the usual answer is to publish the evidence — a tracking number, a delivery hash, a courier receipt. That works, and it leaks.',
          },
          {
            type: 'p',
            body: 'Anyone reading the ledger can now see a buyer\'s purchasing pattern, their delivery cadence, and enough metadata to infer a great deal about them. The centralized alternative isn\'t better: logistics providers cache plaintext addresses, which turns every one of them into a breach waiting to happen. Both approaches treat "verify the delivery" and "reveal the delivery" as the same operation.',
          },
          {
            type: 'p',
            body: "They aren't. That's the whole thesis of this project: verification and visibility are separable, and zero-knowledge proofs are how you separate them.",
          },
        ],
      },
      {
        id: 'privacy',
        title: 'Drawing the line between public and private',
        blocks: [
          {
            type: 'p',
            body: "The design work here wasn't writing circuits — it was deciding, field by field, what the ledger is allowed to know. Too much on-chain and the privacy claim is theatre; too little and neither party can prove the contract behaved correctly.",
          },
          {
            type: 'cards',
            cols: 2,
            accent: true,
            items: [
              {
                title: 'Public on the ledger',
                body: (
                  <>
                    <p>
                      Escrow state (EMPTY / LOCKED / RELEASED), the payment amount, a commitment hash, derived public keys
                      for payer and courier, a shared tick clock, and the refund deadline.
                    </p>
                    <p>
                      <strong>Why:</strong> either party — or an outside observer — must be able to confirm the escrow
                      exists, holds what it claims, and resolved legitimately.
                    </p>
                  </>
                ),
              },
              {
                title: 'Private, never transmitted',
                body: (
                  <>
                    <p>
                      The delivery-proof secret (standing in for a GPS ping, drop-off code, or recipient signature) and
                      each party's identity secret key. Generated in the browser, held in memory for the session only.
                    </p>
                    <p>
                      <strong>Why:</strong> this is precisely the data the contract exists to keep off-chain. It reaches no
                      server, no wallet call, and no DOM node.
                    </p>
                  </>
                ),
              },
            ],
          },
          {
            type: 'p',
            body: 'What an observer sees is an escrow appear with an amount and a hash, then later flip to RELEASED alongside a valid proof. What they cannot recover at any point is the secret behind that hash, or any link between a derived public key and a real person. I enforced the same boundary in the UI as in the contract: the private secret is never assigned to an element or written to a log line — only the public commitment and transaction results are ever rendered.',
          },
        ],
      },
      {
        id: 'circuits',
        title: 'Four circuits and a clock',
        blocks: [
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'lockEscrow — the customer commits',
                body: 'Publishes the amount, a hash commitment of the delivery secret, and a refund deadline expressed in ticks. The secret itself stays in the browser; only its commitment goes on-chain.',
              },
              {
                title: 'releaseEscrow — the zero-knowledge step',
                body: "The courier proves they know a value that hashes to the recorded commitment, without disclosing it. This is the circuit that makes the whole thing work — and it is noticeably slower than the others, because its proving key is roughly 5MB against ~150KB for the lock circuit. Proof generation happens locally, so that cost is paid on the courier's machine, not by a server that would have to be trusted.",
              },
              {
                title: 'refundEscrow — the escape hatch',
                body: "The first version had a real flaw: if the courier simply never released, the customer's funds were locked forever. Adding a refund path meant introducing a shared tick counter as an on-chain clock — once it passes the deadline set at lock time, and only for the original payer, the funds can be reclaimed.",
              },
            ],
          },
          {
            type: 'p',
            body: "Twenty-five test cases cover this: circuit logic, the full state machine including double-lock and double-release rejections, the refund path (too-early rejection, successful refund after the deadline, refusing anyone who isn't the payer, re-locking afterwards), and a privacy test asserting no public circuit call exposes or mutates private state. All of it runs in CI on every push, against a pinned Compact compiler version.",
          },
        ],
      },
      {
        id: 'infrastructure',
        title: 'Working on unfinished infrastructure',
        blocks: [
          { type: 'p', body: 'Building on a young network means the ground moves. Three decisions came directly from that.' },
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'Deployed to Preview, not Preprod',
                body: "Preprod's indexer and dust-sponsor infrastructure proved unstable at submission time. I confirmed the substitution with the organizers rather than shipping something that looked deployed but couldn't be demonstrated.",
              },
              {
                title: 'Let the wallet do the hard parts',
                body: "I wrote a Node CLI first, and its wallet sync hit an SDK bug where progress never advanced past zero while leaking memory. Rather than fight someone else's sync implementation, the browser app delegates sync, balancing, signing and proving to Lace entirely. The CLI stays in the repo, documented as the alternate path, with its limitation stated plainly.",
              },
              {
                title: 'Treat error messages as a feature',
                body: 'Most failures here are environmental, not logical — a popup blocker eating the signing window, a competing wallet extension, dust not yet accumulated. Eleven of the tests cover error handling alone: distinguishing a user dismissing a prompt from a genuine failure, and unwrapping nested error shapes into something a human can act on. On infrastructure this raw, a clear error is worth more than another feature.',
              },
            ],
          },
        ],
      },
      {
        id: 'lessons',
        title: "What I'd do differently",
        blocks: [
          {
            type: 'cards',
            cols: 1,
            items: [
              {
                title: 'Model the failure path before the happy path',
                body: 'I built lock-and-release first and treated "courier never shows up" as an edge case to handle later. It isn\'t an edge case — it\'s the scenario escrow exists for. Retrofitting the refund meant adding a clock to a contract that hadn\'t been designed to need one. The timeout should have been in the state machine from the first sketch.',
              },
              {
                title: 'Check proving cost per circuit early',
                body: "The 30× difference in proving key size between release and lock is a UX fact, not a footnote — it's the difference between an instant action and one that needs a progress indicator and an explanation. I discovered it by feel, late. Measuring each circuit's proving cost as it's written would have shaped the interface sooner.",
              },
              {
                title: 'Write the privacy table on day one',
                body: 'The public/private field table became the most useful artifact in the repo — it\'s what makes the privacy claim auditable instead of aspirational. I wrote it while documenting, but it would have been a better design tool than a summary, because every "should this be on-chain?" question was already answered by it.',
              },
            ],
          },
        ],
      },
    ],
    cta: {
      title: 'Want something like this built?',
      body: "I build full-stack and on-chain products end to end — contracts, frontend, deployment, and the careful thinking about what a system should and shouldn't reveal.",
      secondary: { label: 'See other work', href: '/#work' },
    },
  },
]

export const getCaseStudy = (slug: string | undefined) => caseStudies.find((c) => c.slug === slug)

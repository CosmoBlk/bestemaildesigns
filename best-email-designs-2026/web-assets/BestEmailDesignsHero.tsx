import { useState } from 'preact/hooks';

const NITROSEND_PUBLIC_KEY = 'wpkey_live_fe340a767384c71ec17bc2b880d10b9d';
const LIST_ID = 45;

export default function BestEmailDesignsHero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('https://api.nitrosend.com/v1/public/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NITROSEND_PUBLIC_KEY}`,
        },
        body: JSON.stringify({
          email,
          list_id: LIST_ID,
          source: 'best-email-designs-landing',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Try again.');
      setStatus('error');
    }
  }

  // Preview gallery images - replace these paths with actual screenshot thumbnails
  const previewImages = [
    { brand: 'Apple', src: '/images/best-emails/apple.jpg' },
    { brand: 'Stripe', src: '/images/best-emails/stripe.jpg' },
    { brand: 'Feastables', src: '/images/best-emails/feastables.jpg' },
    { brand: 'Headspace', src: '/images/best-emails/headspace.jpg' },
    { brand: 'Patagonia', src: '/images/best-emails/patagonia.jpg' },
    { brand: 'Chubbies', src: '/images/best-emails/chubbies.jpg' },
  ];

  return (
    <>
      {/* Hero section */}
      <section class="py-20 md:py-28 px-6 md:px-12">
        <div class="max-w-3xl mx-auto">

          {/* Eyebrow */}
          <p class="font-mono text-xs uppercase tracking-widest text-brand-500 mb-6">
            Hand-curated email collection · Free
          </p>

          {/* Title */}
          <h1 class="font-sans text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            57 emails you've probably<br />never seen before.
          </h1>

          {/* Subtitle */}
          <p class="font-sans text-lg md:text-xl text-muted leading-relaxed mb-4 max-w-2xl">
            The best email designs of 2026. Hand-curated with human taste. Not templates. Not algorithmic listicles. The actual emails that make you stop scrolling.
          </p>

          {/* Description */}
          <div class="space-y-4 mb-10 max-w-2xl">
            <p class="font-sans text-base text-muted leading-relaxed">
              57 emails chosen by a human, not an algorithm. Unconventional deep cuts
              and high-converting campaigns from brands doing email differently.
              Steal the layouts. Steal the copy. Steal the strategy. Notes on every single one.
            </p>
            <p class="font-sans text-base text-foreground font-medium leading-relaxed">
              Download it. Give it to your AI. Level up every email you send.
            </p>
          </div>

          {/* Email form */}
          {status === 'success' ? (
            <div class="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 rounded-lg px-6 py-5 max-w-lg">
              <p class="font-sans text-foreground font-medium mb-1">
                Check your email.
              </p>
              <p class="font-sans text-sm text-muted">
                The collection is on its way. Look for an email from George Hartley.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3 max-w-lg mb-10">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                class="flex-1 font-mono text-sm bg-surface-raised border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-faint focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                class="font-mono text-sm font-semibold uppercase tracking-wider bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-2"
              >
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60" />
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                {status === 'loading' ? 'Sending...' : 'Steal the collection'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p class="font-sans text-sm text-red-500 mt-2">{errorMsg}</p>
          )}
        </div>
      </section>

      {/* Preview gallery */}
      <section class="py-16 px-6 md:px-12 bg-surface-sunken">
        <div class="max-w-5xl mx-auto">
          <p class="font-mono text-xs uppercase tracking-widest text-muted mb-8 text-center">
            A few from the collection
          </p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewImages.map((img) => (
              <div key={img.brand} class="relative aspect-[3/4] bg-surface-raised border border-border rounded-lg overflow-hidden group">
                <img
                  src={img.src}
                  alt={`${img.brand} email design`}
                  class="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={(e) => {
                    // Hide broken images, show placeholder
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                  }}
                />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p class="font-mono text-xs text-white/80 uppercase tracking-wider">{img.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video embed */}
      <section class="py-16 px-6 md:px-12">
        <div class="max-w-3xl mx-auto">
          <div class="aspect-video bg-surface-raised border border-border rounded-xl overflow-hidden">
            {/* Replace VIDEO_ID with actual YouTube/Loom video ID */}
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="57 Best Email Designs of 2026"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              class="w-full h-full"
            />
          </div>
          <p class="font-sans text-sm text-muted mt-4 text-center">
            A rapid-fire walkthrough of the collection
          </p>
        </div>
      </section>

      {/* Bottom CTA + credibility */}
      <section class="py-20 px-6 md:px-12">
        <div class="max-w-3xl mx-auto">

          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10 max-w-2xl" />

          {/* Credibility */}
          <div class="max-w-2xl">
            <p class="font-sans text-sm text-muted leading-relaxed mb-2">
              <span class="text-foreground font-medium">Curated by George Hartley</span>
            </p>
            <p class="font-sans text-sm text-muted leading-relaxed mb-4">
              Creator of the Email Marketing Bible (908 sources, 44 experts).
              Previously: SmartrMail (12K customers, 6B emails, acquired 2022).
            </p>

            {/* Nitrosend branding */}
            <div class="flex items-center gap-2 mt-8">
              <span class="relative flex h-2 w-2">
                <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              <span class="font-mono text-xs text-subtle">
                Powered by{' '}
                <a href="https://nitrosend.com" class="text-muted hover:text-foreground transition-colors no-underline">
                  nitrosend
                </a>
                {' '}· Faster email for builders
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

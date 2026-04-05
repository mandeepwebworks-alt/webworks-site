import { useMemo, useState } from 'react';

const projectTypes = [
  'New Website',
  'Website Redesign',
  'E-commerce',
  'Monthly Subscription Plan',
  'Hosting & Email',
  'Other',
];

const featureOptions = [
  'Contact Form',
  'Photo Gallery',
  'Blog',
  'Online Booking',
  'E-commerce',
  'Social Media Integration',
  'SEO',
  'Other',
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  business: '',
  project_type: '',
  pages: 'Not sure',
  existing_url: '',
  budget: 'Not sure yet',
  timeline: 'Just exploring',
  additional: '',
};

export default function QuoteForm() {
  const ideaParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('idea') : null;
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({
    ...initialState,
    additional: ideaParam || '',
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const progress = useMemo(() => [1, 2, 3, 4], []);

  const updateField = (name: string, value: string) => {
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
  };

  const goNext = () => setStep((current) => Math.min(4, current + 1));
  const goBack = () => setStep((current) => Math.max(1, current - 1));

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    try {
      const formData = new FormData(event.currentTarget);
      formData.set('features', features.join(', '));
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="glass rounded-[2rem] p-10 text-center">
        <span className="mb-6 block text-5xl">🎉</span>
        <h2 className="text-2xl font-heading font-bold text-muted-100">Quote Request Sent!</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-200">
          We&apos;ll review your project details and get back to you within 24 hours.
        </p>
        <a href="/" className="btn-secondary mx-auto mt-8">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="glass rounded-[2rem] p-6 md:p-10">
      <div className="mb-10 flex items-center gap-2" id="progress-bar">
        {progress.map((item, index) => (
          <div className="flex flex-1 items-center" key={item}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-heading font-bold transition-all ${
                item <= step ? 'bg-neon-cyan text-space-900' : 'bg-space-600 text-muted-300'
              }`}
            >
              {item}
            </div>
            {index < progress.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${item < step ? 'bg-neon-cyan' : 'bg-space-600'}`}></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={submitForm} className="space-y-8">
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
        <input type="hidden" name="subject" value="New Quote Request from SiteGenius" />

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Your <span className="gradient-text">Details</span></h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Name *">
                <input required name="name" value={formState.name} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Email *">
                <input required type="email" name="email" value={formState.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Phone">
                <input name="phone" value={formState.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Business Name">
                <input name="business" value={formState.business} onChange={(e) => updateField('business', e.target.value)} className={inputClass} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Project <span className="gradient-text">Type</span></h2>
            <div className="grid gap-4 md:grid-cols-2">
              {projectTypes.map((option) => (
                <label key={option} className="glass-hover flex cursor-pointer items-center gap-3 rounded-xl p-5 has-[:checked]:border-neon-cyan/30 has-[:checked]:shadow-glow">
                  <input
                    type="radio"
                    name="project_type"
                    value={option}
                    checked={formState.project_type === option}
                    onChange={(e) => updateField('project_type', e.target.value)}
                    className="h-4 w-4 accent-cyan-400"
                  />
                  <span className="font-medium text-muted-100">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Your <span className="gradient-text">Requirements</span></h2>
            <Field label="How many pages?">
              <select name="pages" value={formState.pages} onChange={(e) => updateField('pages', e.target.value)} className={inputClass}>
                <option>1</option>
                <option>2-4</option>
                <option>5-7</option>
                <option>8+</option>
                <option>Not sure</option>
              </select>
            </Field>
            <Field label="Features needed">
              <div className="grid gap-3 sm:grid-cols-2">
                {featureOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 rounded-lg border border-white/5 bg-space-700/30 px-4 py-3 text-sm text-muted-200">
                    <input
                      type="checkbox"
                      checked={features.includes(option)}
                      onChange={() => toggleFeature(option)}
                      className="h-4 w-4 rounded accent-cyan-400"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Do you have an existing website?">
              <input
                type="url"
                name="existing_url"
                placeholder="https://"
                value={formState.existing_url}
                onChange={(e) => updateField('existing_url', e.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Budget range">
                <select name="budget" value={formState.budget} onChange={(e) => updateField('budget', e.target.value)} className={inputClass}>
                  <option>Under $500</option>
                  <option>$500-$1,500</option>
                  <option>$1,500-$3,000</option>
                  <option>$3,000+</option>
                  <option>Monthly subscription preferred</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field label="Timeline">
                <select name="timeline" value={formState.timeline} onChange={(e) => updateField('timeline', e.target.value)} className={inputClass}>
                  <option>ASAP</option>
                  <option>2-4 weeks</option>
                  <option>1-2 months</option>
                  <option>No rush</option>
                  <option>Just exploring</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Anything <span className="gradient-text">Else?</span></h2>
            <Field label="Tell us anything else about your project">
              <textarea
                rows={6}
                name="additional"
                value={formState.additional}
                onChange={(e) => updateField('additional', e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Any inspiration, ideas, or specific requirements..."
              />
            </Field>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            Something went wrong. Please try again.
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={goBack} className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}>
            ← Back
          </button>
          {step < 4 ? (
            <button type="button" onClick={goNext} className="btn-primary ml-auto">
              Next →
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="btn-primary ml-auto">
              {submitting ? 'Sending...' : 'Submit Quote Request'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-muted-200">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-space-700/50 px-4 py-3 text-muted-100 outline-none transition focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50';

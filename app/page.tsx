'use client';


import error from 'next/error';
import { useState } from 'react';

const content = { // Translation content
  sr: {
    title: 'Saznaj gde tvoj novac curi — i koliko zaista zarađuješ.',
    subtitle:
      'Jednostavan online alat za male preduzetnike, zanatlije i paušalce. Unesi prihode i troškove, vidi profit za par minuta — bez komplikovanog knjigovodstva.',
    cta: 'Isprobaj besplatno',
    problemTitle: 'Problem :',
    problemPoints: [
      'ne znaš tačno da li si u plusu ili minusu',
      'pare ulaze, ali nekako brzo nestaju',
      'Excel ti je naporan, a knjigovođa se javlja jednom mesečno',
    ],
    strongP: ' Novac često curi tamo gde to i ne vidiš ',
    solutionTitle: 'Rešenje',
    solutionText:
      'Ovaj alat ti daje jasnu sliku poslovanja: gde zarađuješ, gde gubiš i koliko ti realno ostaje.',
    featuresTitle: 'Šta dobijaš',
    features: [
      'Jednostavan unos prihoda i troškova',
      'Automatski obračun profita',
      'Pregled po mesecima',
      'Jasan uvid gde novac “curi”',
      'PDF izveštaj',
    ],
    footerCta:
      'Ne moraš biti knjigovođa da bi znao kako ti ide posao',
  },
  en: {
    title: 'See where your money is leaking — and how much you really earn.',
    subtitle:
      'A simple online tool for small business owners, freelancers, and tradespeople. Enter income and expenses and get instant profit clarity.',
    cta: 'Try it free',
    problemTitle: 'The problem :',
    problemPoints: [
      'you are not sure if you are profitable',
      'money comes in but disappears quickly',
      'spreadsheets are confusing',
    ],
    strongP: ' Money often leaks where you don’t even see it ',
    solutionTitle: 'The solution',
    solutionText:
      'This tool gives you instant clarity on where you earn, where you lose, and your real profit.',
    featuresTitle: 'What you get',
    features: [
      'Simple income and expense tracking',
      'Automatic profit calculation',
      'Monthly overview',
      'Clear insight into money leaks',
      'Downloadable PDF report',
    ],
    footerCta:
      'You don’t need to be an accountant to understand your business',
  },
};



export default function LandingPage() {
  const [lang, setLang] = useState<'sr' | 'en'>('sr'); // Language state
  const t = content[lang]; // Current translations

  const [email, setEmail] = useState(''); // Email state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'); // Submission status


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="absolute top-4 right-4">
  <button
    onClick={() => setLang(lang === 'sr' ? 'en' : 'sr')}
    className="bg-amber-900 text-white border px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
  >
    {lang === 'sr' ? 'EN' : 'SR'}
  </button>
</div>

       {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
            {t.title}
        </h1>
        <p className="text-lg mb-6">
          {t.subtitle}
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          {t.cta}
         </button>

         {/* Form for Email capture */}
         <div className="mt-6 max-w-md mx-auto">
  <p className="mb-3 text-sm text-gray-600">
    {lang === 'sr'
      ? 'Ostavi email i javićemo ti čim alat bude spreman.'
      : 'Leave your email and get notified when the tool is ready.'}
  </p>

  <div className="flex gap-2">
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="flex-1 border rounded-lg px-4 py-2"
    />
    <button
      onClick={async () => {
        setStatus('loading');
        try {
          const res = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          if (!res.ok) throw new Error(); // Handle non-200 responses

          if(window.plausible) {
            window.plausible('EmailSignup '); // Plausible event
          }


          setStatus('success');
          setEmail('');
        } catch {
          setStatus('error');
        }
      }}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      {status === 'loading'
        ? '...'
        : lang === 'sr'
        ? 'Obavesti me'
        : 'Notify me'}
    </button>
  </div>

  {status === 'success' && (
    <p className="text-green-600 mt-2 text-sm">
      {lang === 'sr'
        ? 'Hvala! Javićemo ti se uskoro.'
        : 'Thanks! We will contact you soon.'}
    </p>
  )}

  {status === 'error' && (
    <p className="text-red-600 mt-2 text-sm">
      {lang === 'sr'
        ? 'Došlo je do greške. Pokušaj ponovo.'
        : 'Something went wrong. Try again.'}
    </p>
  )}
</div>

        
      </section>
      {/* Problem/solution section */}
      <section className="text-center mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">{t.problemTitle}</h2>
        
          <ul className="list-disc list-inside mt-2">
            {t.problemPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))} 
          </ul>
          <strong> {t.strongP} </strong>
        

        <h2 className="text-2xl font-semibold mb-4">{t.solutionTitle}</h2>
        <p>
          {t.solutionText}
        </p>
      </section>
      {/* Features */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">{t.featuresTitle}</h2>
        <ul className="list-disc list-inside space-y-2">
          {t.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))} 
        </ul>
      </section>
      {/* Final CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t.footerCta}</h2>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          {t.cta}
         </button>

      </section>

    </main>
  );
}

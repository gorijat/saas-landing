'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const content = {
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
    strongP: 'Novac često curi tamo gde to i ne vidiš',
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
    strongP: 'Money often leaks where you don’t even see it',
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
  const [lang, setLang] = useState<'sr' | 'en'>('sr');
  const t = content[lang];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submitHandler = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();

      if (window.plausible) window.plausible('EmailSignup');

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 px-4 py-12">
      {/* Language toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLang(lang === 'sr' ? 'en' : 'sr')}
          className="bg-amber-900 text-white border px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
        >
          {lang === 'sr' ? 'EN' : 'SR'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">{t.subtitle}</p>
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-shadow shadow-md mb-6"
          onClick={submitHandler}
        >
          {t.cta}
        </button>

        {/* Email form */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={submitHandler}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          >
            {status === 'loading' ? '...' : lang === 'sr' ? 'Obavesti me' : 'Notify me'}
          </button>
        </div>

        {status === 'success' && (
          <p className="text-green-600 mt-2 text-sm">
            {lang === 'sr' ? 'Hvala! Javićemo ti se uskoro.' : 'Thanks! We will contact you soon.'}
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-2 text-sm">
            {lang === 'sr' ? 'Došlo je do greške. Pokušaj ponovo.' : 'Something went wrong. Try again.'}
          </p>
        )}
      </section>

      {/* Problem/solution */}
      <section className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl font-semibold mb-6">{t.problemTitle}</h2>
        <ul className="list-disc list-inside text-left sm:text-center space-y-2 mb-4">
          {t.problemPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <strong className="block mt-4">{t.strongP}</strong>

        <h2 className="text-3xl font-semibold mt-8 mb-4">{t.solutionTitle}</h2>
        <p className="text-gray-700">{t.solutionText}</p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold mb-6">{t.featuresTitle}</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          {t.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Footer CTA */}
      <section className="text-center mb-12 px-4">
        <h2 className="text-3xl font-semibold mb-6">{t.footerCta}</h2>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-shadow shadow-md">
          {t.cta}
        </button>
      </section>
    </main>
  );
}

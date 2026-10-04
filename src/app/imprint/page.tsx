import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal notice for gtmskills.cc, operated by EGM Ventures GmbH.",
};

export default function ImprintPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Imprint</h1>
      <p className="mt-4 text-sm leading-6 text-muted">
        gtmskills.cc is operated by the same company as GTM Adviser.
      </p>

      <section className="mt-10 space-y-3 text-[15px] leading-7">
        <h2 className="text-2xl font-medium tracking-tight">Impressum</h2>
        <p>Angaben gemäß § 5 TMG</p>
        <p>
          EGM Ventures GmbH
          <br />
          Kammerweg 5
          <br />
          86480 Aletshausen
          <br />
          Deutschland
        </p>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE 433066865</p>
        <p>Handelsregister: Amtsgericht Memmingen, HRB 20913</p>
        <p>Vertreten durch den Geschäftsführer: Emanuel Morhard</p>
        <p>
          Email:{" "}
          <a className="text-accent hover:underline" href="mailto:egm.ventures@icloud.com">
            egm.ventures@icloud.com
          </a>
        </p>
        <p>
          Verantwortlich für journalistisch-redaktionelle Inhalte (§ 18 Abs. 2 MStV): Emanuel
          Morhard, Kammerweg 5, 86480 Aletshausen, Deutschland
        </p>
      </section>

      <section className="mt-8 space-y-3 text-[15px] leading-7 text-muted">
        <h2 className="text-lg font-medium tracking-tight text-ink">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß §§ 7 ff. TMG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach §§ 8–10 TMG bleiben hiervon unberührt.
        </p>
        <h2 className="text-lg font-medium tracking-tight text-ink">Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr. Bei Bekanntwerden
          von Rechtsverletzungen entfernen wir derartige Links umgehend.
        </p>
        <h2 className="text-lg font-medium tracking-tight text-ink">Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors.
        </p>
      </section>

      <section className="mt-12 space-y-3 border-t border-line pt-8 text-[15px] leading-7">
        <h2 className="text-2xl font-medium tracking-tight">Legal notice</h2>
        <p>Information pursuant to Section 5 of the German Telemedia Act (TMG)</p>
        <p>
          EGM Ventures GmbH
          <br />
          Kammerweg 5
          <br />
          86480 Aletshausen
          <br />
          Germany
        </p>
        <p>VAT identification number pursuant to § 27a of the German VAT Act: DE 433066865</p>
        <p>Commercial register: Local Court (Amtsgericht) Memmingen, HRB 20913</p>
        <p>Represented by the managing director: Emanuel Morhard</p>
        <p>
          Email:{" "}
          <a className="text-accent hover:underline" href="mailto:egm.ventures@icloud.com">
            egm.ventures@icloud.com
          </a>
        </p>
        <p>
          Responsible for journalistic-editorial content (§ 18 (2) MStV): Emanuel Morhard,
          Kammerweg 5, 86480 Aletshausen, Germany
        </p>
      </section>

      <section className="mt-8 space-y-3 text-[15px] leading-7 text-muted">
        <h2 className="text-lg font-medium tracking-tight text-ink">Liability for content</h2>
        <p>
          As a service provider we are responsible for our own content on these pages under the
          general laws. Obligations to remove or block the use of information under the general
          laws remain unaffected.
        </p>
        <h2 className="text-lg font-medium tracking-tight text-ink">Liability for links</h2>
        <p>
          This site contains links to external third-party websites. We have no influence over
          that content and assume no responsibility for it. We remove such links as soon as we
          become aware of a legal infringement.
        </p>
        <h2 className="text-lg font-medium tracking-tight text-ink">Copyright</h2>
        <p>
          Content created by the site operator is subject to German copyright law. Reproduction,
          editing, distribution, or any use outside the limits of copyright requires the prior
          written consent of the respective author.
        </p>
        <p>© 2026 EGM Ventures GmbH</p>
      </section>
    </main>
  );
}

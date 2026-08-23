export default function About() {
  return (
    <>
      <section className="bg-forest-900 px-4 py-16 text-center sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-lime-300 uppercase">Our Story</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight text-paper sm:text-5xl">
          We Started This Because We Were Already Doing the Work
        </h1>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
          <p>
            SBI Network started with one chapter, EBSBI, built on a simple idea: small businesses deserve real
            branding, real websites, and real marketing, the kind usually reserved for companies that can afford
            agency prices. So a group of students decided to just do that work themselves, for free.
          </p>
          <p>
            That group was really just two of us, Da'El Kim and James Yu, building sites and shooting promo videos
            for local businesses whenever we had free time. Word got around fast, and pretty soon we were spending
            every free hour on it, figuring out branding for businesses that shouldn't have to settle for a bad
            website just because they couldn't afford an agency.
          </p>
          <p>
            We also noticed something else. We were learning more doing this than we ever did in a classroom. Real
            clients, real deadlines, real feedback. So we asked ourselves why this had to stay one chapter. If two
            students could do this for one town, a hundred students could do it for a hundred towns.
          </p>
          <p>
            That's the whole idea behind SBI Network. Every chapter is students doing what we did in their own town:
            building real skills by doing real work for the businesses down the street, for free. No corporate
            backing, no catch. Just people who'd rather build something than just talk about it.
          </p>
          <p className="font-display text-xl font-medium text-forest-900">
            We're still doing the same thing we started with. There's just a lot more of us now.
          </p>
        </div>
      </section>
    </>
  )
}

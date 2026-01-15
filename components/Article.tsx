import { Container, Heading, Text } from '@radix-ui/themes'


const Article = () => {
  return (
    <Container className="my-16 px-4">

      <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-14 border border-white/60 shadow-2xl relative overflow-hidden">

        {/* Decor element pentru fundal */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <Heading
            size={{ initial: '7', md: '9' }}
            className="text-slate-800 mb-4 tracking-tight"
          >
            Welcome to <span className="text-brand-orange">Vintage Flavour</span>
          </Heading>
          <p className="text-2xl mt-4 text-slate-600 font-medium italic great-vibes-regular">
            A Journey Through Flavors
          </p>
          <div className="w-32 h-1.5 bg-linear-to-r from-brand-orange to-brand-green mx-auto mt-6 rounded-full shadow-sm"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative z-10">

          {/* Card 1 - Cine suntem */}
          <div className="group bg-white/80 rounded-3xl p-8 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl border border-white/80">
            <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <Text as="p" size="3" className="text-slate-600 leading-relaxed italic">
              &quot;Have you ever tasted something so delicious it instantly transported you to a cherished memory?&quot;
              <br /><br />
              Welcome to <span className="text-brand-orange font-bold">Vintage Flavour</span>, a cozy corner where we share dishes that bring people together.
            </Text>
          </div>

          {/* Card 2 - Povestea noastră */}
          <div className="group bg-white/80 rounded-3xl p-8 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl border border-white/80">
            <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Why This Blog?</h3>
            <Text as="p" size="3" className="text-slate-600 leading-relaxed">
              Born out of a love for storytelling and spices. Every recipe here is a blend of ingredients and personal anecdotes, from childhood favorites to family heirlooms.
            </Text>
          </div>

          {/* Card 3 - Comunitate */}
          <div className="group bg-white/80 rounded-3xl p-8 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl border border-white/80">
            <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Join the Kitchen</h3>
            <Text as="p" size="3" className="text-slate-600 leading-relaxed">
              This is a space to connect. Leave comments, share your experiences, or request your favorite dishes. So, grab your apron, and let&apos;s get cooking!
            </Text>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/50 px-6 py-2 rounded-full border border-white/60 text-slate-500 text-sm font-medium">
            <svg className="w-5 h-5 text-brand-green animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>Made with love for great food</span>
          </div>
        </div>

      </div>
    </Container>
  )
}

export default Article
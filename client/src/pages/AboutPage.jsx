const AboutPage = () => {
  return (
    <div>
      <section className="bg-navy-800 text-white py-16">
        <div className="container-x text-center">
          <p className="text-accent-500 font-semibold tracking-[0.3em] uppercase text-sm">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">About ShopHub</h1>
        </div>
      </section>

      <section className="container-x py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
          alt="About"
          className="rounded-lg shadow-card"
        />
        <div>
          <h2 className="text-3xl font-bold text-navy-800">Fashion That Speaks</h2>
          <div className="w-16 h-1 bg-accent-500 mt-4 rounded-full" />
          <p className="text-gray-600 mt-6 leading-relaxed">
            ShopHub was born from a simple belief: clothing should tell your story. We curate
            collections from designers around the world, focusing on quality fabrics, timeless
            silhouettes, and the kind of pieces you'll reach for again and again.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            From everyday essentials to standout statement pieces, every product is selected with
            care. We believe great style shouldn't break the bank — and we work hard to deliver
            premium fashion at prices you'll love.
          </p>
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="container-x grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { num: '10K+', label: 'Happy Customers' },
            { num: '500+', label: 'Products' },
            { num: '50+', label: 'Brands' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold text-accent-500">{stat.num}</p>
              <p className="text-navy-800 font-medium mt-2 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

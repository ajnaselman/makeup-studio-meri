import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    date: '',
    time: ''
  });
  const [success, setSuccess] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const fakeReviews = [
    { id: 1, name: "Ana K.", text: "Fenomenalno iskustvo! Moj make-up nikad nije izgledao bolje.", rating: 5 },
    { id: 2, name: "Lejla S.", text: "Meri je stvarno čarobna, sve preporuke!", rating: 5 },
    { id: 3, name: "Sara D.", text: "Topla preporuka! Divna atmosfera i savršen rezultat.", rating: 5 },
    { id: 4, name: "Maja T.", text: "Osjećala sam se posebno i samouvjerena, hvala!", rating: 5 }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => setReviews(fakeReviews)); // fallback ako backend nije dostupan
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => setSuccess('Vaša poruka je poslata!'))
      .catch(() => setSuccess('Greška pri slanju poruke.'));
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '.')), 0).toFixed(2);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo2.jpg" alt="Logo" className="nav-logo" />
        <div className="cart" onClick={() => setShowCart(!showCart)}>
          <img src="/cart.jpg" alt="Kosarica" className="cart-icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </nav>

      {/* Kosarica popup */}
      {showCart && (
        <div className="cart-popup">
          <h3>Vaša košarica</h3>
          {cart.length === 0 ? (
            <p>Košarica je prazna.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name} - {item.price} KM</li>
              ))}
            </ul>
          )}
          <p><strong>Ukupno: {totalPrice} KM</strong></p>
          <button onClick={() => setShowCart(false)}>Zatvori</button>
        </div>
      )}

      {/* Hero */}
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/video1.mp4" type="video/mp4" />
          Tvoj browser ne podržava video tag.
        </video>
        <div className="hero-content">
          <h1>Makeup Studio Meri</h1>
          <a href="#contact" className="cta-button">Rezerviši termin</a>
        </div>
      </section>

      {/* O meni */}
      <section className="about" id="about">
        <h2>O meni</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Ja sam <strong>Mersiha Beganović</strong>, vlasnica i vizažistica Makeup studija Meri u Travniku.
              Svakom tretmanu pristupam s pažnjom i strastvenom posvećenošću, bilo da se radi o profesionalnom šminkanju, puder obrvama, trajnom ružu ili henna obrvama.
              Moj cilj je da svaka klijentica izađe iz studija samouvjerena i predivna.
            </p>
          </div>
          <img src="/meri.jpg" alt="Meri" className="about-img" />
        </div>
      </section>

      {/* Usluge */}
      <section className="services" id="services">
        <h2>Naše usluge</h2>
        <div className="videos-container">
          <div className="video-card">
            <video autoPlay loop muted playsInline>
              <source src="/makeup1.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"><h3>Profesionalno šminkanje</h3></div>
          </div>
          <div className="video-card">
            <video autoPlay loop muted playsInline>
              <source src="/makeup2.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"><h3>Puder obrve</h3></div>
          </div>
          <div className="video-card">
            <video autoPlay loop muted playsInline>
              <source src="/makeup3.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"><h3>Trajni ruž</h3></div>
          </div>
        </div>
      </section>

      {/* Galerija */}
      <section className="gallery">
        <h2>Galerija radova</h2>
        <div className="gallery-grid">
          <img src="/gal1.jpg" alt="Rad 1" />
          <img src="/gal2.jpg" alt="Rad 2" />
          <img src="/gal3.jpg" alt="Rad 3" />
        </div>
        <div className="gallery-btn"><button>Pogledaj više</button></div>
      </section>

      {/* Proizvodi */}
      <section className="products">
        <h2>Naši proizvodi</h2>
        <div className="products-container">
          <div className="product-video">
            <video autoPlay loop muted playsInline>
              <source src="/lioness.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="product-cards">
            <div className="product-card">
              <h3>🌟 Lioness – gel sa šljokicama</h3>
              <p>✨ Dodaj sjaj svakom izlasku! Lako se nanosi, brzo suši i traje satima.</p>
              <p>💛 Cijena: 40,00 KM</p>
              <button className="product-btn" onClick={() => addToCart({name: 'Lioness', price: '40'})}>
                Dodaj u košaricu
              </button>
            </div>
            <div className="product-card">
              <h3>🌟 Venera – tečni bronzer / highlighter</h3>
              <p>🌞 Za kožu koja sija! Netoksičan i nježan za kožu, visok sjaj i hidratantni efekat.</p>
              <p>🧡 Cijena: 45,00 KM</p>
              <button className="product-btn" onClick={() => addToCart({name: 'Venera', price: '45'})}>
                Dodaj u košaricu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recenzije */}
      <section className="reviews">
        <h2>Recenzije</h2>
        <div className="reviews-grid">
          {fakeReviews.map(r => (
            <div className="review" key={r.id}>
              <p>{r.text}</p>
              <span>{'★'.repeat(r.rating)}</span>
              <strong>{r.name}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <section id="contact" className="contact">
        <h2>Kontakt</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Ime i prezime" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <select name="service" onChange={handleChange} required>
            <option value="">Odaberite uslugu</option>
            <option value="Profesionalno šminkanje">Profesionalno šminkanje</option>
            <option value="Puder obrve">Puder obrve</option>
            <option value="Trajni ruž">Trajni ruž</option>
          </select>
          <input type="date" name="date" onChange={handleChange} required />
          <input type="time" name="time" onChange={handleChange} required />
          <textarea name="message" placeholder="Poruka" onChange={handleChange}></textarea>
          <button type="submit">Pošalji</button>
          {success && <p className="success">{success}</p>}
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <img src="/logo2.jpg" alt="Logo" className="footer-logo" />
            <h3>Makeup Studio Meri</h3>
            <p className="footer-phone">+387 610 939 99</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src="/facebook.png" alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com/makeupstudiomeri" target="_blank" rel="noopener noreferrer">
                <img src="/instagram.jpg" alt="Instagram" className="social-icon" />
              </a>
            </div>
          </div>
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.813233!2d17.657555!3d44.229853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47589b0e2c89707f%3A0x0!2zNDTCsDEzJzI2LjIiTiAxN8KwMzknMDcuMyJF!5e0!3m2!1sen!2sba!4v1692220000000!5m2!1sen!2sba"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '10px', marginTop: '20px' }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa lokacije"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;




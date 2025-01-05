function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto ">
      <div className="container">
        <p className="mb-3">Śledź nas na:</p>
        <div className="d-flex justify-content-center gap-3">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <i className="bi bi-facebook fs-3"></i>
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <i className="bi bi-twitter fs-3"></i>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <i className="bi bi-instagram fs-3"></i>
          </a>
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <i className="bi bi-linkedin fs-3"></i>
          </a>
        </div>
        <p className="mt-3">
          &copy; {new Date().getFullYear()} Generator Ligi. Wszelkie prawa
          zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <img
              src="/querit-logo.svg"
              alt="Querit logo"
              className="h-10 w-10 md:h-12 md:w-12"
              loading="lazy"
            />
            <div className="flex flex-col items-center md:items-start gap-0">
              <span className="text-lg font-bold text-foreground">Querit Oy</span>
              <span className="text-sm font-semibold text-foreground">3594237-2</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Querit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

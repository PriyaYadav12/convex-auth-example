import { ReactNode } from "react";

export function Layout({
  menu,
  children,
}: {
  menu?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-teal-100">
      <header className="sticky top-0 z-10 flex min-h-24 border-b-4 border-solid border-primary bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 backdrop-blur">
        <nav className="container w-full justify-between flex flex-row items-center gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <a href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
              <img 
                src="/lallifafa_logo1jpg.jpg" 
                alt="Lalli Fafa" 
                className="h-12 w-auto rounded-full shadow-lg border-2 border-primary" 
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold kid-text-primary">Lalli Fafa</h1>
                <p className="text-sm kid-text-secondary font-bold">Stories for Giggle & Grow</p>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-2">
            {menu}
          </div>
        </nav>
      </header>
      <main className="flex grow flex-col relative">
        {/* Decorative stars */}
        <div className="absolute top-4 right-8 text-2xl animate-pulse">⭐</div>
        <div className="absolute top-12 right-16 text-xl animate-pulse delay-1000">✨</div>
        <div className="absolute top-8 left-8 text-lg animate-pulse delay-500">🌟</div>
        {children}
      </main>
      <footer className="border-t-4 border-solid border-primary kid-bg-gradient">
        <div className="container py-2 text-center">
          <p className="text-lg font-bold kid-text-primary">
            Made with ❤️ for little storytellers
          </p>
          <p className="text-sm kid-text-secondary font-bold mt-2">
            Lalli Fafa - Where stories come to life! 📚✨
          </p>
        </div>
      </footer>
    </div>
  );
}



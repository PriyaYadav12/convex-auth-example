export function ChatHeader() {
  return (
    <div className="flex items-start justify-between border-b-4 border-solid border-primary py-6 kid-bg-gradient">
      <div className="container flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold kid-text-primary">📚 Story Time!</h1>
          <div className="text-2xl animate-bounce">🌟</div>
        </div>
        <p className="text-lg kid-text-secondary font-bold">
          Welcome to Lalli Fafa! Let's create amazing stories together! 
        </p>
        <p className="text-sm kid-text-accent font-bold">
          Share your ideas and watch them come to life with friends! ✨
        </p>
        <div className="flex gap-2 mt-2">
          <span className="text-2xl animate-pulse">🎨</span>
          <span className="text-2xl animate-pulse delay-300">🎭</span>
          <span className="text-2xl animate-pulse delay-700">🎪</span>
          <span className="text-2xl animate-pulse delay-1000">🎈</span>
        </div>
      </div>
    </div>
  );
}

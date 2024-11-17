export default function AdminDashboard({isMenuOpen}: {isMenuOpen: boolean}) {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden pt-16">
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
            isMenuOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="container mx-auto">
          </div>
        </main>
      </div>
    </div>
  )
}

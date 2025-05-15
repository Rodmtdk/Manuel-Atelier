export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>
        <p className="text-center text-gray-600 mb-6">Créez votre compte</p>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Nom complet
            </label>
            <input id="name" type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Jean Dupont" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="votre@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <input id="password" type="password" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirmer le mot de passe
            </label>
            <input id="confirmPassword" type="password" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            S&apos;inscrire
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <a href="/login" className="text-blue-600 hover:underline">
            Déjà un compte? Se connecter
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Connexion</h1>
        <p className="text-center text-gray-600 mb-6">Connectez-vous à votre compte</p>

        <form className="space-y-4">
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

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <a href="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </a>
        </div>
      </div>
    </div>
  )
}

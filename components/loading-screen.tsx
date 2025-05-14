export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-primary"></div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Chargement</h3>
          <p className="text-sm text-muted-foreground">Préparation de votre environnement...</p>
        </div>
      </div>
    </div>
  )
}

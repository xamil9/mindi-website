const ProtectedFilmmakerRoute = ({ children, filmId }) => {
    const { currentUser, isFilmmaker, userFilms } = useUser();
    
    if (!currentUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Sign In Required</h2>
                    <p className="text-gray-600">Please sign in to continue</p>
                </div>
            </div>
        );
    }
    
    if (!isFilmmaker) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Filmmaker Access Only</h2>
                    <p className="text-gray-600">This area is restricted to filmmakers</p>
                </div>
            </div>
        );
    }
    
    if (filmId && !userFilms.includes(filmId)) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                    <p className="text-gray-600">You don't have permission to manage this film</p>
                </div>
            </div>
        );
    }
    
    return children;
};
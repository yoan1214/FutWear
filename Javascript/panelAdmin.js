function checkAuth() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) {
      
        window.location.href = './login.html';
        return false;
    }
    // Redirigir a la página de inicio si no es administrador
    if (isAdmin !== "1") {
        window.location.href = './index.html';
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        location.reload(); // Forzar la recarga completa
    } else {
        checkAuth();
    }
});

window.addEventListener('load', function() {
    checkAuth();
});

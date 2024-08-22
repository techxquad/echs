// Hide spinner after the page is loaded
window.addEventListener('load', function () {
    document.getElementById('loadingSpinner').classList.add('hidden');
});

// Sidebar toggle for mobile screens
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebarMenu');
    sidebar.classList.toggle('active');
});


// script.js
document.getElementById('shortener-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const urlInput = document.getElementById('urlInput').value.trim();
    if (urlInput) {
        const shortenedUrl = generateShortUrl(urlInput);

        // Store the mapping in localStorage
        localStorage.setItem(shortenedUrl, urlInput);

        document.getElementById('shortened-url-container').style.display = 'block';
        const shortenedUrlElement = document.getElementById('shortened-url');
        shortenedUrlElement.href = `${window.location.origin}?url=${shortenedUrl}`;
        shortenedUrlElement.textContent = `${shortenedUrl}`;
    }
});

function generateShortUrl(url) {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        const char = url.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return `http://shrt.ak/${Math.abs(hash).toString(36)}`;
}

// Redirect to the original URL if a shortened URL is provided in the query string
window.addEventListener('load', function () {
    const params = new URLSearchParams(window.location.search);
    const shortenedUrl = params.get('url');
    if (shortenedUrl) {
        const originalUrl = localStorage.getItem(shortenedUrl);
        if (originalUrl) {
            window.location.href = originalUrl;
        } else {
            alert('Invalid shortened URL.');
        }
    }
});

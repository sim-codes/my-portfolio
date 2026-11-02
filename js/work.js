document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('projectModal');
    const modalMediaContainer = document.getElementById('modalMediaContainer');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalProjectStack = document.getElementById('modalProjectStack');
    const modalProjectLink = document.getElementById('modalProjectLink');
    const modalProjectTitle = document.getElementById('projectModalLabel');

    const getYouTubeId = (url) => {
        if (url.includes('shorts/')) {
            return url.split('shorts/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
            return url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            return url.split('youtu.be/')[1].split('?')[0];
        }
        return null;
    };

    const showMedia = (card, name) => {
        const { mediaType, mediaUrl, mediaWidth, mediaHeight } = card.dataset;
        modalMediaContainer.innerHTML = '';

        if (mediaType === 'video') {
            if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
                const videoId = getYouTubeId(mediaUrl);
                if (videoId) {
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${videoId}`;
                    iframe.title = name;
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                    iframe.allowFullscreen = true;
                    iframe.classList.add('img-fluid');
                    iframe.style.height = '400px';
                    modalMediaContainer.appendChild(iframe);
                } else {
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = 'Could not load YouTube video.';
                    modalMediaContainer.appendChild(errorMsg);
                }
            } else {
                const video = document.createElement('video');
                video.src = mediaUrl;
                video.controls = true;
                video.classList.add('img-fluid');
                video.style.maxHeight = '400px';
                modalMediaContainer.appendChild(video);
            }
        } else if (mediaUrl) {
            const image = document.createElement('img');
            image.src = mediaUrl;
            image.alt = `Screenshot of ${name}`;
            image.width = mediaWidth;
            image.height = mediaHeight;
            image.classList.add('img-fluid');
            image.style.maxHeight = '400px';
            modalMediaContainer.appendChild(image);
        }
    };

    document.querySelectorAll('.project-card a').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const name = card.querySelector('h3, span:not(.stack-item)').textContent;

            modalProjectTitle.textContent = name;
            showMedia(card, name);
            modalProjectDescription.textContent = card.dataset.description;
            modalProjectStack.innerHTML = '';
            card.querySelectorAll('.stack-item').forEach(item => modalProjectStack.appendChild(item.cloneNode(true)));
            modalProjectLink.href = card.href;

            bootstrap.Modal.getOrCreateInstance(modalElement).show();
        });
    });
});

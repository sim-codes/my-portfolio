document.addEventListener('DOMContentLoaded', () => {
    const mobileProjectsContainer = document.getElementById('mobile-projects');
    const webProjectsContainer = document.getElementById('web-projects');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalMediaContainer = document.getElementById('modalMediaContainer');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalProjectStack = document.getElementById('modalProjectStack');
    const modalProjectLink = document.getElementById('modalProjectLink');
    const modalProjectTitle = document.getElementById('projectModalLabel');

    const createStackSpans = (stackArray) => {
        return stackArray.map(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            span.classList.add('stack-item'); // Class for styling
            return span;
        });
    };

    const displayProjects = (projects, container, isWeb) => {
        projects.filter(project => !project.hidden).forEach(project => {
            const projectElement = document.createElement(isWeb ? 'div' : 'li');
            projectElement.classList.add(...(isWeb ? ['col-sm-4', 'col-md-6', 'col-lg-3', 'project-card'] : ['mx-2', 'project-card']));

            const link = document.createElement('a');
            link.href = "#";
            if (!isWeb) {
                link.classList.add('text-decoration-none', 'text-black');
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modalProjectTitle.textContent = project.name;

                modalMediaContainer.innerHTML = ''; // Clear previous media

                if (project.mediaType === 'video') {
                    if (project.mediaUrl.includes('youtube.com') || project.mediaUrl.includes('youtu.be')) {
                        let videoId;
                        if (project.mediaUrl.includes('shorts/')) {
                            videoId = project.mediaUrl.split('shorts/')[1].split('?')[0];
                        } else if (project.mediaUrl.includes('watch?v=')) {
                            videoId = project.mediaUrl.split('watch?v=')[1].split('&')[0];
                        } else if (project.mediaUrl.includes('youtu.be/')) {
                            videoId = project.mediaUrl.split('youtu.be/')[1].split('?')[0];
                        }

                        if (videoId) {
                            const iframe = document.createElement('iframe');
                            iframe.src = `https://www.youtube.com/embed/${videoId}`;
                            iframe.title = project.name;
                            iframe.frameBorder = "0";
                            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                            iframe.allowFullscreen = true;
                            iframe.classList.add('img-fluid'); // For responsive width
                            iframe.style.height = '400px'; // Maintain a decent height
                            modalMediaContainer.appendChild(iframe);
                        } else {
                            // Fallback or error for unparsable YouTube URL
                            const errorMsg = document.createElement('p');
                            errorMsg.textContent = 'Could not load YouTube video.';
                            modalMediaContainer.appendChild(errorMsg);
                        }
                    } else {
                        // Standard HTML5 video player for other video URLs
                        const video = document.createElement('video');
                        video.src = project.mediaUrl;
                        video.controls = true;
                        video.classList.add('img-fluid');
                        video.style.maxHeight = '400px';
                        modalMediaContainer.appendChild(video);
                    }
                } else if (project.mediaUrl) {
                    const image = document.createElement('img');
                    image.src = project.mediaUrl; // Use mediaUrl for images too
                    image.alt = `Screenshot of ${project.name}`;
                    image.width = project.mediaWidth;
                    image.height = project.mediaHeight;
                    image.classList.add('img-fluid');
                    image.style.maxHeight = '400px';
                    modalMediaContainer.appendChild(image);
                }

                modalProjectDescription.textContent = project.description;

                modalProjectStack.innerHTML = '';
                const stackSpans = createStackSpans(project.stack);
                stackSpans.forEach(span => modalProjectStack.appendChild(span));

                modalProjectLink.href = project.link;
                projectModal.show();
            });

            // Create card content (image/placeholder, name, stack)
            if (isWeb) { // Only add image for web projects
                const cardImage = document.createElement('img');
                cardImage.src = (project.mediaType === 'image' && project.mediaUrl) ? project.mediaUrl : (project.image || 'https://via.placeholder.com/300x200.png?text=' + encodeURIComponent(project.name));
                cardImage.alt = `Screenshot of ${project.name}`;
                cardImage.width = project.mediaWidth;
                cardImage.height = project.mediaHeight;
                cardImage.loading = "lazy";
                cardImage.classList.add('img-thumbnail');
                link.appendChild(cardImage);
            }

            const projectName = document.createElement(isWeb ? 'h3' : 'span');
            projectName.textContent = project.name;
            projectName.classList.add('mt-2');
            if (isWeb) {
                projectName.classList.add('h5');
            }
            link.appendChild(projectName);

            const stackP = document.createElement('div');
            stackP.classList.add('stack-display', 'mt-1');
            const stackSpans = createStackSpans(project.stack);
            stackSpans.forEach(span => stackP.appendChild(span));
            link.appendChild(stackP);

            projectElement.appendChild(link);
            container.appendChild(projectElement);
        });
    };

    displayProjects(mobileProjects, mobileProjectsContainer, false);
    displayProjects(webProjects, webProjectsContainer, true);
});

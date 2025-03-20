const searchInput = document.getElementById("search");

let allVideos = [];

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    allVideos.forEach(video => {
        console.log(video.title);
        const isVisible = video.title.includes(value) || video.channelName.includes(value);
        video.element.classList.toggle("hide", !isVisible);
    });
});


async function getVideos() {
    const videoCards = document.getElementById("video-cards");
    const videoResponse = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos");
    const videoResponseData = await videoResponse.json();
    const videos = videoResponseData.data.data;

    allVideos = videos.map(item => {
        const videoDetails = item.items.snippet;
        const videoTitle = videoDetails.title;
        const videoChannelName = videoDetails.channelTitle;
        const videoThumbnails = videoDetails.thumbnails;
        const id = item.items.id;
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const anchorTag = document.createElement("a");
        anchorTag.classList.add("anchor");
        anchorTag.href = `https://www.youtube.com/watch?v=${id}`;

        const imageDiv = document.createElement("div");
        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = videoThumbnails.high.url;
        thumbnailImage.alt = videoTitle;
        thumbnailImage.classList.add("thumbnail-image");

        const h2Title = document.createElement("h2");
        h2Title.innerHTML = videoTitle;

        const pChannelName = document.createElement("p");
        pChannelName.innerHTML = videoChannelName;

        imageDiv.appendChild(thumbnailImage);

        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(h2Title);
        cardDiv.appendChild(pChannelName);

        anchorTag.appendChild(cardDiv);

        videoCards.appendChild(anchorTag);

        return {
            title: h2Title.innerHTML,
            channelName: pChannelName.innerHTML,
            element: cardDiv,
        };
    });
}

getVideos();
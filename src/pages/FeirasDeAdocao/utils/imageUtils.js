export function randomImage() {
    const images = [
        "/img-card1.png",
        "/img-card2.png",
        "/img-card3.png",
        "/img-card4.png",
        "/img-card5.png",
        "/img-card6.png",
        "/img-card7.png",
    ];
    return images[Math.floor(Math.random() * images.length)];
}

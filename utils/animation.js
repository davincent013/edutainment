export function playAnimation(type) {
    const sound = new Audio(`./sounds/${type}.mp3`);
    sound.play();
    // Add animation logic here
}

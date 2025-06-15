export function updateHPBar(character, hp) {
    const hpBar = document.getElementById(`${character}-hp-bar`);
    hpBar.style.width = `${(hp / 15) * 100}%`;
}

export function renderSprite(character, hp) {
    const sprite = document.getElementById(`${character}-sprite`);
    if (hp <= 0) {
        sprite.src = `./assets/${character}/dead.png`;
    } else if (hp <= 4) {
        sprite.src = `./assets/${character}/critical.png`;
    } else if (hp <= 7) {
        sprite.src = `./assets/${character}/weakened.png`;
    } else {
        sprite.src = `./assets/${character}/normal.png`;
    }
}

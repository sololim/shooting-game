input.onButtonPressed(Button.A, function () {
    item.change(LedSpriteProperty.Y, 1)
})
input.onButtonPressed(Button.AB, function () {
    bullet = game.createSprite(0, item.get(LedSpriteProperty.Y))
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.X, 1)
        basic.pause(100)
    }
})
input.onButtonPressed(Button.B, function () {
    item.change(LedSpriteProperty.Y, -1)
})
let enemy_bullet: game.LedSprite = null
let position = 0
let bullet: game.LedSprite = null
let item: game.LedSprite = null
basic.showString("Starting in")
basic.pause(100)
basic.showLeds(`
    . # # # .
    . . . # .
    . # # # .
    . . . # .
    . # # # .
    `)
basic.pause(500)
basic.showLeds(`
    . # # . .
    . . . # .
    . . # . .
    . # . . .
    . # # # .
    `)
basic.pause(500)
basic.showLeds(`
    . . # . .
    . # # . .
    . . # . .
    . . # . .
    . # # # .
    `)
basic.pause(500)
basic.clearScreen()
basic.showString("Go!")
game.setScore(0)
item = game.createSprite(0, 2)
let enemy = game.createSprite(4, 2)
basic.forever(function () {
    position = randint(0, 4)
    enemy.set(LedSpriteProperty.Y, position)
    basic.pause(1000)
    if (bullet) {
        if (bullet.isTouching(enemy)) {
            game.addScore(1)
            enemy_bullet.delete()
        }
    }
    enemy_bullet = game.createSprite(4, enemy.get(LedSpriteProperty.Y))
    for (let index = 0; index < 4; index++) {
        enemy_bullet.change(LedSpriteProperty.X, -1)
        basic.pause(100)
    }
    if (bullet) {
        if (bullet.isTouchingEdge()) {
            bullet.delete()
        }
    }
    if (enemy_bullet.isTouchingEdge()) {
        enemy_bullet.delete()
    }
    if (game.score() == 5) {
        game.gameOver()
    }
})
basic.forever(function () {
    if (enemy_bullet) {
        if (enemy_bullet.isTouching(item)) {
            game.gameOver()
        }
    }
})

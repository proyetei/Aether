export function calculateLevels(points: number): number{
    let currentLevel = 0
    if (points > 25){
        currentLevel = 2
    } else if (points <= 50 && points > 25){
        currentLevel = 3
    } else if (points <= 100 && points > 50){
        currentLevel = 4
    } else if (points > 100){
        currentLevel = 5
    } else {
        currentLevel = 1
    }
    return currentLevel
}
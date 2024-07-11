export function calculateLevels(points: number): [number, number] {
    let currentLevel = 0
    let percentage = 0
    if (points <= 25 && points > 1){
        currentLevel = 1
        percentage = (points / 25) * 100
    } else if (points <= 50 && points > 25){
        currentLevel = 2
        percentage = (points / 50) * 100
    } else if (points <= 100 && points > 50){
        currentLevel = 3
        percentage = (points / 100) * 100
    } else if (points <= 150 && points > 100){
        currentLevel = 4
        percentage = (points / 150) * 100
    } else if (points > 150){
        currentLevel = 5
        percentage = 100
    } else {
        currentLevel = 0
    }
    return [currentLevel, percentage]
}
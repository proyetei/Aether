import { text } from "stream/consumers"

export function calculateLevels(points: number): [number, number, boolean, boolean] {
    let currentLevel = 0
    let percentage = 0
    let textAnalysis = false
    let imageAnalysis = false
    if (points < 9 && points > 1){
        currentLevel = 1
        percentage = (points / 9) * 100
        textAnalysis = false
        imageAnalysis = false
    } else if (points < 27 && points > 9){
        currentLevel = 2
        percentage = (points / 27) * 100
        textAnalysis = true
        imageAnalysis = false
    } else if (points < 50 && points > 27){
        currentLevel = 3
        percentage = (points / 50) * 100
        textAnalysis = true
        imageAnalysis = true
    } else if (points < 100 && points > 50){
        currentLevel = 4
        percentage = (points / 100) * 100
        textAnalysis = true
        imageAnalysis = true
    } else if (points > 100){
        currentLevel = 5
        percentage = 100
        textAnalysis = true
        imageAnalysis = true
    } else {
        currentLevel = 0
    }
    return [currentLevel, percentage, textAnalysis, imageAnalysis]
}
import { text } from "stream/consumers"

export function calculateLevels(points: number): [number, number, boolean, boolean, number, number] {
    let currentLevel = 0
    let percentage = 0
    let textAnalysis = false
    let imageAnalysis = false
    let textAnalysisLimit = 1
    let imageAnalysisLimit = 1
    if (points < 9 && points > 1){
        currentLevel = 1
        percentage = (points / 9) * 100
        textAnalysis = false
        imageAnalysis = false
    } else if (points < 27 && points >= 9){
        currentLevel = 2
        percentage = (points / 27) * 100
        textAnalysis = true
        imageAnalysis = false
        textAnalysisLimit = 10
    } else if (points < 50 && points >= 27){
        currentLevel = 3
        percentage = (points / 50) * 100
        textAnalysis = true
        imageAnalysis = true // should be changed to false later
        textAnalysisLimit = 20
    } else if (points < 100 && points >= 50){
        currentLevel = 4
        percentage = (points / 100) * 100
        textAnalysis = true
        imageAnalysis = true
        textAnalysisLimit = 30
        imageAnalysisLimit = 10
    } else if (points >= 100){
        currentLevel = 5
        percentage = 100
        textAnalysis = true
        imageAnalysis = true
        textAnalysisLimit = 50
        imageAnalysisLimit = 25

    } else {
        currentLevel = 0
    }
    return [currentLevel, percentage, textAnalysis, imageAnalysis, textAnalysisLimit, imageAnalysisLimit]
}
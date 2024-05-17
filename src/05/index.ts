import { DOUBLE_NEWLINE, NEWLINE } from '../libs/global'

import { RuleNames, Rule, Rules } from './types'

export function challenge1(input: string): number {
    const [seedsString, ...rulesArray] = input.split(DOUBLE_NEWLINE)

    const rules: {[k in RuleNames]: Rules } = {
        [RuleNames.SeedToSoil]: null,
        [RuleNames.SpoilToFertilizer]: null,
        [RuleNames.FertilizerToWater]: null,
        [RuleNames.WaterToLight]: null,
        [RuleNames.LightToTemperature]: null,
        [RuleNames.TemperatureToHumidity]: null,
        [RuleNames.HumidityToLocation]: null,
    }

    const seeds = getSeedsNumbersChall1(seedsString)

    rulesArray.forEach(r => {
        const [ruleName, rule] = r.split(' map:\n') as [RuleNames, string]
        rules[ruleName] = rule
            .split(NEWLINE)
            .map(convertRuleStringToRules)
            .sort((a, b) => a.sourceStart - b.sourceStart)
    })

    return seeds
        .map(seed => processSeed(rules, seed))
        .min()
}

function convertRuleStringToRules(ruleString: string): Rule {
    const [destinationRange, sourceStart, length] = ruleString.splitToNumbers(' ') as [number, number, number]
    return {
        destinationRange,
        sourceStart,
        sourceEnd: sourceStart + length - 1,
    }
}

const processOrder: RuleNames[] = [
    RuleNames.SeedToSoil,
    RuleNames.SpoilToFertilizer,
    RuleNames.FertilizerToWater,
    RuleNames.WaterToLight,
    RuleNames.LightToTemperature,
    RuleNames.TemperatureToHumidity,
    RuleNames.HumidityToLocation,
]

function processSeed(rules: {[k in RuleNames]: Rules }, seed: number): number {
    let value = seed
    for (const process of processOrder) {
        const rule = rules[process]
        const rulePart = rule?.find(r => r.sourceStart <= value && r.sourceEnd >= value)
        if (rulePart) {
            value = rulePart.destinationRange + (value - rulePart.sourceStart)
            continue
        }
    }

    return value
}

function getSeedsNumbersChall1(input: string): number[] {
    return input.split(':')[1].splitToNumbers(' ', { allowEmpty: false }) as number[]
}

function getSeedsNumbersChall2(input: string, rules: {[k in RuleNames]: Rules }): number {
    let seedAndIncrementList = input
        .split(':')[1]
        .splitToNumbers(' ', { allowEmpty: false }) as number[] 

    let seeds = seedAndIncrementList
        .chunk(2) as number[][]

    let seedList = seeds
        .map(([start, iteration]) => {
            let min = processSeed(rules, start)

            for (let i = 0; i < iteration; i++) {
                let value  = processSeed(rules, start + i)
                if (value < min) {
                    min = value
                }
            }
            return min
        })

    return seedList.min()
}

export function challenge2(input: string): number { // VERY SLOW -> NEED TO OPTIMIZE
    const [seedsString, ...rulesArray] = input.split(DOUBLE_NEWLINE)

    const rules: {[k in RuleNames]: Rules } = {
        [RuleNames.SeedToSoil]: null,
        [RuleNames.SpoilToFertilizer]: null,
        [RuleNames.FertilizerToWater]: null,
        [RuleNames.WaterToLight]: null,
        [RuleNames.LightToTemperature]: null,
        [RuleNames.TemperatureToHumidity]: null,
        [RuleNames.HumidityToLocation]: null,
    }

    
    rulesArray.forEach(r => {
        const [ruleName, rule] = r.split(' map:\n') as [RuleNames, string]
        rules[ruleName] = rule
        .split(NEWLINE)
        .map(convertRuleStringToRules)
        .sort((a, b) => a.sourceStart - b.sourceStart)
    })

    const seeds = getSeedsNumbersChall2(seedsString, rules)

    return seeds + 10
}
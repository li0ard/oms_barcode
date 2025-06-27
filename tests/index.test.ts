import { test, expect } from "bun:test"
import { parse } from "../src"
import { Genders, PolicyTypes } from "../src/types"
import { format } from "date-fns/format"

test("Type 01", () => {
    let string = "010016E959AF0F3A6C53E684D37771CEEF39DF38711DE4FCD27685DF35419C03000000000000000000000000000000000000000271D3000000EF4A04BDB800F618017DDE3F6B9C4B4592FB28EB75EF1E0D2274BD0F57377284F02469698A8CAC4A912FE74D773AF6FC0C8D71515CB88176EC04A414B179AD00AC548295033972DC82"
    let parsed = parse(Buffer.from(string, "hex"))
    
    expect(parsed.type).toBe(PolicyTypes.FULL)
    expect(parsed.number).toBe("6449020886006380")
    expect(parsed.last).toBe("ПАРФЕНОВА")
    expect(parsed.first).toBe("ЕКАТЕРИНА")
    expect(parsed.middle).toBe("ДМИТРИЕВНА")
    expect(format(parsed.dob, "yyyy-MM-dd")).toBe("1979-10-13")
    expect(format(parsed.exp, "yyyy-MM-dd")).toBe("1900-01-01")
    expect(parsed.gender).toBe(Genders.FEMALE)
    expect(parsed.ogrn).toBe("1027739008440")
    expect(parsed.okato).toBe("63000")
    expect(Buffer.from(parsed.signature).toString("hex")).toBe("017dde3f6b9c4b4592fb28eb75ef1e0d2274bd0f57377284f02469698a8cac4a912fe74d773af6fc0c8d71515cb88176ec04a414b179ad00ac548295033972dc82")
    expect(parsed.checksumValid).toBeTrue()
})

test("Type 02", () => {
    let string = "020016E959AF0F3A6C9DB3A17503BF84E869B9C3BF39C3A175AA5341C3800000000000000000000000000000000000000000000000000000000000000283EB0000015CEA680D9CDDEF0209E9F91FFEA628328CD157144B634204BAC30F573FF2E1021BDC2A28B2DD50A2761E4CF75FFCDBFBA71EAFC548AD07D38DC82A7D674BD09A"
    let parsed = parse(Buffer.from(string, "hex"))
    
    expect(parsed.type).toBe(PolicyTypes.SHORT)
    expect(parsed.number).toBe("6449020886006380")
    expect(parsed.last).toBe("ШМАТОВА")
    expect(parsed.first).toBe("ТАТЬЯНА")
    expect(parsed.middle).toBe("АНАТОЛЬЕВНА")
    expect(format(parsed.dob, "yyyy-MM-dd")).toBe("1992-06-18")
    expect(format(parsed.exp, "yyyy-MM-dd")).toBe("1900-01-01")
    expect(parsed.gender).toBe(Genders.FEMALE)
    expect(Buffer.from(parsed.signature).toString("hex")).toBe("015cea680d9cddef0209e9f91ffea628328cd157144b634204bac30f573ff2e1021bdc2a28b2dd50a2761e4cf75ffcdbfba71eafc548ad07d38dc82a7d674bd09a")
    expect(parsed.checksumValid).toBeTrue()
})
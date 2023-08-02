
export const ATTRIBUTES = {
	1: "Wood",
	2: 'Water',
	3: 'Fire',
	4: 'Dark',
	5: "Light"
}

export const RACES = {
	1: "Human",
	2: 'Elf',
	3: 'Orc',
	4: 'Dragon',
	5: "God"
}

export function getRace(race: number) {
	if(race) return RACES[race]
	return null
}

export function getAttribute(attr: number)  {
	if(attr) return ATTRIBUTES[attr]
	return null
}
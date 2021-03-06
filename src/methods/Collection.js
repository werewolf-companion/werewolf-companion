const random = require('weighted-random');

module.exports = class Collection {
    constructor() {
        this.collectables = {
            legendary: ['Corruptor', 'Sect Leader', 'Zombie'],
            epic: [
                'Wolf Seer',
                'Seer',
                'Gunner',
                'Arsonist',
                'Bandit',
                'Bomber',
                'Cannibal',
                'Illusionist'
            ],
            rare: [
                'Junior Werewolf',
                'Nightmare Werewolf',
                'Werewolf Berserk',
                'Shadow Wolf',
                'Aura Seer',
                'Spirit Seer',
                'Detective',
                'Doctor',
                'Medium',
                'Serial Killer'
            ],
            uncommon: [
                'Wolf Shaman', 'Guardian Wolf',
                'Kitten Wolf', 'Seer Apprentice',
                'Jailer', 'Sheriff',
                'Forger', 'Witch',
                'Beast Hunter', 'Flower Child',
                'Avenger', 'Fool',
                'Headhunter'
            ],
            common: [
                'Alpha Werewolf', 'Wolf Pacifist',
                'Werewolf', 'Sorcerer',
                'Villager', 'Bodyguard',
                'Tough Guy', 'Red Lady',
                'Fortune Teller', 'Loudmouth',
                'Priest', 'Marksman',
                'Mayor', 'Pacifist',
                'Grumpy Grandma', 'Cupid',
                'President', 'Cursed'
            ]
        }

        this.randomRole = (user, rarityOdds, unique) => {
            if (unique) return { collectable: this.getUnique(user, rarityOdds), unique: true };
            else return { collectable: this.generateRole(rarityOdds), unique: undefined }
        }
    }

    generateRole(rarityOdds) {
        let tiers = [
            { rarity: 'legendary', roles: this.collectables.legendary, weight: rarityOdds[0] },
            { rarity: 'epic', roles: this.collectables.epic, weight: rarityOdds[1] },
            { rarity: 'rare', roles: this.collectables.rare, weight: rarityOdds[2] },
            { rarity: 'uncommon', roles: this.collectables.uncommon, weight: rarityOdds[3] },
            { rarity: 'common', roles: this.collectables.common, weight: rarityOdds[4] }
        ],
            { roles, rarity } = tiers[random(tiers.map(x => x.weight))],
            role = roles[Math.floor(Math.random() * roles.length)];
        return { role, rarity };
    }

    getUnique(user, rarityOdds) {
        let collectables = user.collectables,
            unique = false,
            attempts = 0,
            randomRole;

        while (!unique) {
            if (attempts < 25) {
                let { role, rarity } = this.generateRole(rarityOdds);
                if (!collectables[rarity].includes(role))
                    unique = true, randomRole = { role, rarity };
            } else randomRole = { role: null, rarity: null }, unique = true;
        }

        return randomRole;
    }
}

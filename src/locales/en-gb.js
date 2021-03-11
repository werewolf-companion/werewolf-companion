function emote(name, { a = false, d = false, id = false } = {}) {
    let value = Object.find(this.client.constants.emotes, name);
    if (!value) return `:${name}:`;
    else if ([17, 18, 19].includes(value.length))
        return id ? value : `<${a ? 'a' : ''}:${d ? 'e' : name.toCamelCase()}:${value}>`;
    else return value;
}

const DOMAIN = process.env.WEBSITE_DOMAIN;

const LOCALE = {
    _: {
        code: 'en-gb',
        name: 'English (United Kingdom)',
        authors: ['394469731085844502']
    }
}

const GLOBAL = {
    gold: 'Gold',
    rose: 'Rose',
    roses: 'Roses',
    gem: 'Gem',
    gems: 'Gems',
    token: 'Token',
    tokens: 'Tokens',

    loading: 'Loading...'
}

const ERRORS = {
    tipNotFound: 'No tip was found for what was inputted.',
    roleNotFound: 'No role was found for what was inputted.',
    userNotFound: 'No user was found for what was inputted.',
    guildNotFound: 'No guild was found for what was inputted.',

    timedOut: 'Timed Out',

    noReactionsInTime: 'No reactions in time.'
}

const COMMON = {
    team: 'Team',
    village: 'Village',
    villager: 'Villager',
    villagers: 'Villagers',
    villageNotConvertedWerewolvesConverted: 'Village (Not Converted) Werewolves (Converted)',

    couple: 'Couple',
    coupled: 'Coupled',
    lover: 'Lover',
    lovers: 'Lovers',

    werewolf: 'Werewolf',
    werewolves: 'Werewolves',
    bandits: 'Bandits',

    solo: 'Solo',
    soloVoting: 'Solo (Voting)',
    soloKilling: 'Solo (Killing)',
    soloTargetAliveVillageTargetDead: 'Solo (Voting) (Target Alive) Village (Target Dead)',

    aura: 'Aura',
    good: 'Good',
    evil: 'Evil',
    unknown: 'Unknown',
    goodNotConvertedEvilConverted: 'Good (Not Converted) Evil (Converted)',

    type: {
        protectingRole: 'Protecting Role',
        protectingRoles: 'Protecting Roles'
    }
}

const ROLES = {
    /* VILLAGE */
    villager: { name: 'Villager', team: COMMON.village, aura: COMMON.good, description: 'Has no abilities.', abbreviations: 'forkman, "best role"' },
    santaClaus: { name: 'Santa Claus', team: COMMON.village, aura: COMMON.good, description: 'Able to send a "HO HO HO" to all players or a Santa foreground item to a dead but online player. May only use "HO HO HO" twice per game and gift 4 times per game.', abbreviations: 'santa, claus' },
    doctor: { name: 'Doctor', team: COMMON.village, aura: COMMON.good, description: "Able to heal a person each night. If target is attacked, target doesn't die.", abbreviations: 'doc' },
    bodyguard: { name: 'Bodyguard', team: COMMON.village, aura: COMMON.good, description: 'Able to guard someone each night. If Bodyguard or target is attacked, neither die. Next attack will kill the Bodyguard.', abbreviations: 'bg' },
    toughGuy: { name: 'Tough Guy', team: COMMON.village, aura: COMMON.good, description: "Able to guard someone each night. If Tough guy or target is attacked, neither die and the weakest werewolf and Tough guy see eachother's roles. Next night the Tough guy dies.", abbreviations: 'tg' },
    gunner: { name: 'Gunner', team: COMMON.village, aura: COMMON.unknown, description: 'Able to shoot someone during the day. Has 2 bullets.', abbreviations: 'gun' },
    jailer: { name: 'Jailer', team: COMMON.village, aura: COMMON.unknown, description: "Jails someone for the night to talk with them. Jailed player can't use their abilities for the night. If found suspicious, Jailer can execute the jailed player during the night. May only execute one player per game.", abbreviations: 'jailer' },
    redLady: { name: 'Red Lady', team: COMMON.village, aura: COMMON.good, description: 'Able to visit someone each night. If target is evil or attacked, Red lady dies.', abbreviations: 'rl' },
    priest: { name: 'Priest', team: COMMON.village, aura: COMMON.good, description: 'Able to water someone during the day. If target is a werewolf, target dies. Otherwise, Priest dies. May only water once per game.', abbreviations: '-' },
    marksman: { name: 'Marksman', team: COMMON.village, aura: COMMON.unknown, description: 'Able to mark a target during the night. Next night he can either shoot the marked target or change mark. If he shoots a villager, he dies instead. May only shoot twice per game.', abbreviations: 'mm, markman' },
    seer: { name: 'Seer', team: COMMON.village, aura: COMMON.good, description: 'Able to see the role of a player each night.', abbreviations: 'seer' },
    auraSeer: { name: 'Aura Seer', team: COMMON.village, aura: COMMON.good, description: 'Able to see the aura of a player each night.', abbreviations: 'aura' },
    spiritSeer: { name: 'Spirit Seer', team: COMMON.village, aura: COMMON.good, description: 'Able to select 2 players during the night. Next day he will see if they killed last night.', abbreviations: 'ss, spirit' },
    seerApprentice: { name: 'Seer Apprentice', team: COMMON.village, aura: COMMON.good, description: 'Has no abilities until the Seer dies. Once Seer is dead, you become the new Seer.', abbreviations: 'seer app' },
    detective: { name: 'Detective', team: COMMON.village, aura: COMMON.good, description: 'Able to select 2 players during the night and determine if they are on the same or different teams.', abbreviations: 'det' },
    sheriff: { name: 'Sheriff', team: COMMON.village, aura: COMMON.good, description: 'Able to select someone during the night. If target dies, the Sheriff receives info about 2 players. One of those players killed the target.', abbreviations: 'sher' },
    medium: { name: 'Medium', team: COMMON.village, aura: COMMON.unknown, description: 'Able to speak to the dead each night and revive a player once per game.', abbreviations: 'med' },
    mayor: { name: 'Mayor', team: COMMON.village, aura: COMMON.good, description: 'Able to reveal his role during the day, which makes his vote count as 2 for the rest of the game.', abbreviations: 'mayor' },
    witch: { name: 'Witch', team: COMMON.village, aura: COMMON.unknown, description: "Has 2 potions which she can use during the night. One is for healing and one is for killing. Using the healing potion on a target that wasn't attacked won't consume the potion.", abbreviations: '-' },
    avenger: { name: 'Avenger', team: COMMON.village, aura: COMMON.good, description: 'Able to select a player. If the Avenger dies, so does the selected player.', abbreviations: 'av, avenge' },
    beastHunter: { name: 'Beast Hunter', team: COMMON.village, aura: COMMON.unknown, description: 'Able to set a trap during the night. Trap takes 1 night to build. Werewolves walking into the trap will kill the weakest werewolf and waste the trap. Trap may be on himself. He can also change the position of his trap, but it will need another night to build itself.', abbreviations: 'bh, bhunter' },
    pacifist: { name: 'Pacifist', team: COMMON.village, aura: COMMON.good, description: 'Able to reveal the role of someone during the day, which cancels voting for the day. May only use once per game.', abbreviations: 'paci' },
    flowerChild: { name: 'Flower Child', team: COMMON.village, aura: COMMON.good, description: "Able to protect a player during the day from being lynched. That player can also be himself. If target wasn't gonna get lynched, it isn't consumed. May only use once per game.", abbreviations: 'fc, flower, child' },
    fortuneTeller: { name: 'Fortune Teller', team: COMMON.village, aura: COMMON.unknown, description: 'Able to give up to 2 cards to players each night. Players may then use the cards to prove their role during the day. Fortune teller only has 2 cards per game.', abbreviations: 'ft, fortune teller' },
    grumpyGrandma: { name: 'Grumpy Grandma', team: COMMON.village, aura: COMMON.good, description: `Able to mute someone for the next day during the night. This action cannot be used in the first night. Muted players may only send messages as "..." and they can't vote. Muted players are announced at the start of the day.`, abbreviations: 'gg, grumpy' },
    cupid: { name: 'Cupid', team: `${COMMON.village}/${COMMON.couple}`, aura: COMMON.good, description: "Able to select 2 players on the first night. Those players will, the next day, know each other's role. If one of them dies, so does the other. They win if they are the last players alive (excluding Cupid), but they don't lose their own role win conditions.", abbreviations: 'cupid' },
    president: { name: 'President', team: COMMON.village, aura: COMMON.good, description: 'Everyone knows who you are once the game starts. If you die, the village loses.', abbreviations: 'pres' },
    cursed: { name: 'Cursed', team: COMMON.villageNotConvertedWerewolvesConverted, aura: COMMON.goodNotConvertedEvilConverted, description: 'A regular villager until he gets attacked by the werewolves, which turns him into a Werewolf.', abbreviations: 'cursed' },
    forger: { name: 'Forger', team: COMMON.village, aura: COMMON.unknown, description: 'Can forge two shields and then a sword. Forging tajes one day and each new item must be given to another player before forging the next one. Each shield will save a player once from being attacked at night. The sword can be used to kill another player.', abbreviations: 'Forge, Forger' },
    loudmouth: { name: 'Loudmouth', team: COMMON.village, aura: COMMON.good, description: 'Can select a player whose role will be revealed when loudmouth die.', abbreviations: 'Lm' },

    /* WEREWOLVES */
    werewolf: { name: 'Werewolf', team: COMMON.werewolves, aura: COMMON.evil, description: 'Able to speak with other werewolves and vote with them during the night.', abbreviations: 'ww, wolf' },
    alphaWerewolf: { name: 'Alpha Werewolf', team: COMMON.werewolves, aura: COMMON.unknown, description: 'Able to speak with other werewolves and vote with them during the night. His vote counts as double.', abbreviations: 'alpha, aww' },
    wolfPacifist: { name: 'Wolf Pacifist', team: COMMON.werewolves, aura: COMMON.evil, description: 'Once per game you can reveal the role of a player to everybody and prevent anybody from voting during that day.', abbreviations: 'wpaci,wp' },
    wolfShaman: { name: 'Wolf Shaman', team: COMMON.werewolves, aura: COMMON.evil, description: "Able to enchant a player during the day, which makes them be seen as Wolf shaman for Seers and Evil for Aura seers. If he's the last werewolf alive, he may not enchant anymore. Able to speak with other werewolves and vote with them during the night.", abbreviations: 'shaman, wshaman, wwshaman' },
    wolfSeer: { name: 'Wolf Seer', team: COMMON.werewolves, aura: COMMON.evil, description: "Able to see a player's role each night. Able to speak with other werewolves during the night. Once he's the last werewolf alive or he resigns, he loses his vision ability but can now vote with other werewolves at night.", abbreviations: 'wws' },
    juniorWerewolf: { name: 'Junior Werewolf', team: COMMON.werewolves, aura: COMMON.evil, description: 'Able to select a player. If the Junior werewolf dies, so does the selected player. Able to speak and vote with other werewolves during the night.', abbreviations: 'jww, junior' },
    nightmareWerewolf: { name: 'Nightmare Werewolf', team: COMMON.werewolves, aura: COMMON.evil, description: 'Able to send someone to sleep during the day. The next night, that player cannot use their night abilities. May only use once per day and twice per game. Able to speak and vote with other werewolves during the night.', abbreviations: 'nww, nightmare' },
    werewolfBerserk: { name: 'Werewolf Berserk', team: COMMON.werewolves, aura: COMMON.evil, description: 'Able to activate frenzy during the day. The next night, werewolves ignore any protection and kill both their target and all players that protected said target. May only use once per game. Able to speak and vote with other werewolves during the night.', abbreviations: 'bww, wwb, berserk, bers' },
    kittenWolf: { name: 'Kitten Wolf', team: COMMON.werewolves, aura: COMMON.evil, description: "Able to turn a villager into a werewolf. If that player isn't a villager, nothing happens. May only use once per game. Able to speak and vote with other werewolves during the night.", abbreviations: 'kitten, kww' },
    guardianWolf: { name: 'Guardian Wolf', team: COMMON.werewolves, aura: COMMON.evil, description: "Able to protect a player during the day from being lynched. That player can also be himself. If target wasn't gonna get lynched, it isn't consumed. May only use once per game. Able to speak and vote with other werewolves during the night.", abbreviations: 'gww, guardian' },
    sorcerer: { name: 'Sorcerer', team: COMMON.werewolves, aura: COMMON.evil, description: "Able to see a player's role each night. Unlike other werewolves, he cannot speak or vote with other werewolves during the night. If he's the last werewolf alive, the village wins.", abbreviations: 'sorc' },

    /* SOLO VOTING */
    fool: { name: 'Fool', team: COMMON.soloVoting, aura: COMMON.unknown, description: 'Has no abilities. If he manages to get lynched, he wins.', abbreviations: 'fool' },
    headhunter: { name: 'Headhunter', team: COMMON.soloTargetAliveVillageTargetDead, aura: COMMON.unknown, description: 'Has no abilities. If he manages to get his target lynched, he wins. Target is always a village-sided role in normal games. If his target dies but not via lynching, he wins with the Village.', abbreviations: 'hh' },

    /* SOLO KILLING */
    serialKiller: { name: 'Serial Killer', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to kill a player each night. Cannot be killed by werewolves.', abbreviations: 'sk' },
    arsonist: { name: 'Arsonist', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to either douse 2 players or ignite all doused players each night. Cannot be killed by werewolves.', abbreviations: 'arso' },
    bomber: { name: 'Bomber', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to plant a bomb on up to 3 players each night (horizontal, vertical, diagonal). The next night the bomb will kill all 3 players during the night. Bomber can then place a new bomb the next night. Cannot be killed by werewolves.', abbreviations: 'bomb, bb' },
    sectLeader: { name: 'Sect Leader', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to convert a player each night. The converted player will see who you are. If Sect leader dies, all sect members die aswell. Some roles may not be converted.', abbreviations: 'sl, sect' },
    zombie: { name: 'Zombie', team: COMMON.soloKilling, aura: COMMON.unknown, description: "Able to bite a player each night. That bite takes effect after a night and the bitten becomes a Zombie. Zombies see eachother's roles. Each Zombie can bite a different player. Some roles may not be bitten. Able to speak with other zombies during the night. Zombies also see who's bitten/getting bit.", abbreviations: 'zomb, zb' },
    corruptor: { name: 'Corruptor', team: COMMON.soloKilling, aura: COMMON.unknown, description: `Able to "glitch" a player each night. That player cannot talk, vote or use their abilities the next day. At the end of the day, the "glitched" player dies and their role isn't revealed. Unrevealed roles may not be revived by a Medium. Cannot be killed by werewolves.`, abbreviations: 'cor' },
    illusionist: { name: 'Illusionist', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to disguise as a player each night. That player will be seen as an Illusionist by Seers. The Illusionist is able to kill all disguised players during the day. Cannot be killed by werewolves.', abbreviations: 'ill, illus' },
    cannibal: { name: 'Cannibal', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to either eat a player or save up hunger each night. Saving up hunger will allow you to eat more people on the same night. Each night you do not eat a player, a hunger point is added. You may have up to 5 hunger points. Cannot be killed by werewolves.', abbreviations: 'canni' },
    bandit: { name: 'Bandit', team: COMMON.soloKilling, aura: COMMON.unknown, description: 'Able to find an accomplice by converting a villager at night. With your accomplice, you can kill one player each night. If your accomplice dies you can select a new one. You cannot convert werewolves or headhunter target. You cannot be killed by werewolves.', abbreviations: 'Bandit' },
    accomplice: { name: 'Accomplice', team: COMMON.bandits, aura: COMMON.unknown, description: 'Able to kill player at night with bandit. If the vote is draw, your vote wins. You win if all alive players belong to your team. Second accomplice cannot kill without bandit. You can be killed by werewolves.', abbreviations: 'acco, acc' },
}

const TIPS = [
    { role: [ROLES.auraSeer.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: 'Always pay attention to the remaining Unknown roles left in the game. Do not ignore this and lynch good unknowns or potential fools.' },
    { role: [ROLES.bodyguard.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: 'Known for following the seer around, the bodyguard defends against werewolves twice before dying. In a zombie game, bodyguards usually recoil out of fear so that they can be bitten, but because you only die on your second attack I am pretty sure you can still keep the seer alive. In quick games, be on either the seer or the doctor if he revealed his role. The doctor should not reveal his role but there is a chance that players will.' },
    { role: [ROLES.beastHunter.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: "Changing your trap during the game is not a good move. My highest recomendation is either set it on yourself or in a very powerful role like gunner (with bullets), seer, jailer... This way you may save somene's live and get a werewolf kill, or make a random killer not kill." },
    { role: [COMMON.coupled], team: COMMON.village, credit: 'By Washi_Green#9514 on Discord', content: "Don't ever make it obvious that you are coupled, and protect the Cupid if you can. As an informer, you can trick everyone else that your lover is good (if they are bad). Protect your lover at all costs, you will die with your lover too!" },
    { role: [ROLES.cupid.name], team: COMMON.village, credit: 'By Zoiezoie07#6199 on Discord', content: 'Help your couple in your first place. However, if your couple is surely going to lose, try to help the village. Do not forget that you can also win with the village.' },
    { role: [ROLES.detective.name], team: COMMON.village, credit: 'By MashiWashi#4909 on Discord', content: "Pay attention to who claims and who doesn't during the day. Check two people who haven't claimed anything yet. This forces them to claim something and moves the game along smoother." },
    { role: [ROLES.fortuneTeller.name], team: COMMON.village, credit: 'By Kachikawawa#5130 on Discord', content: "Don't give both of your cards out on the first night. Instead, give one card to a random player on the first night, and save the second card for giving it to someone who is suspicious or haven't claimed anything yet. This avoids strong villagers being killed due to being forced to reveal and can also help village to find out evil or solo roles." },
    { role: [ROLES.priest.name, ROLES.marksman.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: "your job can be either to kill or to comfirm good players. For example: if there are two players who are counter claiming, watering or shooting one of them could be the best option. In the worst case, you will die but will find an enemy, so it's worth it." },
    { role: [ROLES.doctor.name, ROLES.bodyguard.name, ROLES.redLady.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: "Try to guess who is a seer/an aura seer so that you can protect them. But be careful, sometimes you will meet the wolf seer pretending they are one of the types of seers. If it's hard and you don't have enough information, just protect other useful roles (Gunner, Medium etc.)." },
    { role: [ROLES.flowerChild.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: 'You have to protect the people from all of those random voters. You can save a victory from fool or Headhunter with your ability, and that is very useful.' },
    { role: [ROLES.grumpyGrandma.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: "Don't always mute someone. You are useful if you mute a werewolf, a fool, a random killer.... but useless if you mute a villager. Sometimes, not muting is the best option." },
    { role: [ROLES.gunner.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: "Put down that gun. It is dangerous. No, do not go to that village and shoot random people. Shooting random people might cause the seer's death. In fact, it is reportable if villagers are the victims. When someone shouts that they are bad, do not trust them, nor shoot them as they are highly likely the fool. It does not really work the same way someone claims fool, but if the village starts lynching him you can shoot to find out if you suspect him of being the fool. Finally, before the werewolves howl, get the jailer to jail you for protection." },
    { role: [ROLES.jailer.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: "One of the best roles that can't really kill werewolves, but can protect anyone except himself. Like a doctor, just that he role blocks and kills as well. At the start of the game, if you do survive each night, jail the gunner until he uses his second bullet. After his second bullet, start jailing suspicious people. If the junior werewolf is confirmed, jail the junior werewolf and only kill it when it is the last werewolf. Remember to reveal yourself to the gunner so that he can vouch for you if you are getting lynched. If it is a cursed game, you can jail the cursed as well so that he will not become a werewolf, although there is a chance he is already a werewolf. You can stop jailing him when there is one werewolf (besides him) remaining, unless there are only 3 villagers (including him) remaining." },
    { role: [ROLES.loudmouth.name, ROLES.avenger.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: "You are only useful when dying, so feel free to make werewolves or random killers kill you. Or even villagers. But NEVER ask village to lynch you. They may accuse you of being fool, or you could be Headhunter objective. And as Avenger, you don't always have to kill when dying. You may kill a villager." },
    { role: [ROLES.mayor.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: "As a mayor, your double votes are important late into the game. The whole thing turns into a mind game of revealing or not. If you don't reveal the village might lynch you, yet if you reveal you might get killed late game and lose. Most of the time revealing early is the best option, and remember to use your double votes to create ties if you suspect they are the fool or turn the tide against the werewolves." },
    { role: [ROLES.medium.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: 'Pay attention to the roles left in the game while reviving. Sometimes, reviving the gunner might be smart, sometimes reviving the seer might be the best, but not always. If the protecting roles are all dead, revive one of them unless they are offline.' },
    { role: [ROLES.redLady.name], team: COMMON.village, credit: "1: Don't visit day 1, as you may die and you won't be able to tell info unless medium is alive", content: 'There are two lessons:' },
    { role: [ROLES.sheriff.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: "Sheriff is a good role. I don't know why people says the contrary. As sheriff, try to predict who may die. Gunner and secondary informers, as well as jailer, are common objectives among werewolves. PRO content: Sheriff counters the vast majory of solos, but especially bomber, as there are a lot of players who will die for it." },
    { role: [ROLES.seer.name], team: COMMON.village, credit: 'By u/Akakill on Reddit', content: "Check people who don't talk much (or not at all) and who are not revealed. They often (not always, of course) are werewolves (or the solo role) who don't dare to talk much. But when you find someone who is good, do not reveal their role (med, jailer, gunner, mayor etc.) Werewolves might target them." },
    { role: [ROLES.toughGuy.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: 'Avoid protecting night one and claim day one. This way you avoid a possible counterclaim of the player who attacked you. And do not be afraid of dying, its your job after all.' },
    { role: [ROLES.witch.name], team: COMMON.village, credit: '1: She only can kill and save once, so use the potions wisely.', content: 'Witch is a role with an amazing potential of adding pressure to the werewolves, as she can avoid a whole attack as well as killing someone. However, there are 2 things to have in mind:' },
    { role: [ROLES.villager.name], team: COMMON.village, credit: 'By Aljninja#5731 on Discord', content: 'When you get the Villager role as a Random Regular Villager, you can claim as Beast Hunter, or another Regular Villager role. The werewolves might be scared of attacking you. If they do attack you, they would have wasted an attack.' },
    { role: [ROLES.alphaWerewolf.name], team: COMMON.werewolves, credit: 'By the WWO Tips & Tricks Discord Server', content: 'As Alpha Werewolf your vote counts double at night. Try to make the right decisions by voting for the most important roles.Also be aware that they might be protected of course.If someone is asking your role, claim a role that fits your unknown aura.' },
    { role: [ROLES.guardianWolf.name], team: COMMON.werewolves, credit: 'By Aljninja#5731 on Discord', content: 'The standart is save a werewolf. However, you can use your ability to save a random killer or even a villager. The random killer, to give him time to kill villagers. The villager, to make villager suspect him.' },
    { role: [ROLES.juniorWerewolf.name], team: COMMON.werewolves, credit: 'By MashiWashi#4909 on Discord', content: "Don't be afraid to die as this role. This role's main goal is to damage the village in a bigger way than any other wolf. To achieve this you could fake something that completely causes chaos. Like a spirit seer saying two unprovable villagers are red. This ends in your death eventually but like said before, don't be scared to die." },
    { role: [ROLES.kittenWolf.name], team: COMMON.werewolves, credit: undefined, content: "Always convert someone before dying. Even if it's random. If you have a Kitten werewolf on your team and he gets found without converting, protect it at all cost. Even if Kitten dies, they will have another infiltrated wolf between them." },
    { role: [ROLES.nightmareWerewolf.name], team: COMMON.werewolves, credit: 'By MashiWashi#4909 on Discord', content: 'Nightmaring the informers is not the only way to go. You can effectively nightmare any role with a night ability. Medium, jailer, marksman, all of these could possibly deal more damage than nightmaring the seer. In late game you can even nightmare the solo killer to get an upperhand.' },
    { role: [ROLES.sorcerer.name], team: COMMON.werewolves, credit: 'By Aljninja#5731 on Discord', content: "Try faking seer. It's very effective in the majory of cases, because you are unconfirmable except if another seer checks you. Also have in mind that Priest's watering can't kill you, and that's all you need. The only con is that if you are the last werewolf, village automatically wins." },
    { role: [ROLES.wolfSeer.name], team: COMMON.werewolves, credit: 'By the WWO Tips & Tricks Discord Server', content: "If your wolf seer happens to check the serial killer in an early game, don't get him killed yet. He is needed to take out the villagers and stabilize the number of people that's still alive. This is also to ensure that the village does not have sufficient time to find you and your teammates, thus increasing your chances of winning." },
    { role: [ROLES.wolfShaman.name], team: COMMON.werewolves, credit: 'By Aljninja#5731 on Discord', content: "Do not forget to shaman unconfirmed players. The investigators are very likely to check them. If your target is checked, and they die eventually, others will start to suspect the investigator. Your job is done at that time. Last but not least, be aware of Fools and Headhunters' targets. If you shaman them, and unfortunately they are checked, it might lead to a failure!" },
    { role: [ROLES.werewolf.name], team: COMMON.werewolves, credit: 'By the WWO Tips & Tricks Discord Server', content: "If there are very few people left, try your best to achieve a tie in the number of villagers to werewolves. Then try to kill the easiest target, not the one who is the more 'powerful one' - trying the latter just gets you killed." },
    { role: [ROLES.arsonist.name], team: ROLES.arsonist.team, credit: 'By the WWO Tips & Tricks Discord Server', content: "Douse 2 players per night. Same as for the serial killer. Try to find the most important roles. You can either choose to burn people after every 2 nights, or douse as many people as you can and burn them at the end, at the risk that you may be killed before that.You choose your strategy.It's not easy to win with the arsonist, but you may have luck sometimes." },
    { role: [ROLES.bomber.name], team: ROLES.bomber.team, credit: 'By the WWO Tips & Tricks Discord Server', content: "Same as the arsonist. You can either place bombs on a lot of players and explode them at the end(with the risk that you can die before) or place a bomb on someone and then explode him. It's your decision." },
    { role: [ROLES.fool.name], team: ROLES.fool.team, credit: 'By the WWO Tips & Tricks Discord Server', content: "Try to stay silent(don't tell anything, just vote) in the first 3-4 days, maybe more. The village suspects the silent people that are online pretty much every time. Sometimes it may not work, sometimes it may give you a win. Another strategy is to play like a normal villager, like you are in their team, until someone asks you your role. Then, you just say a claimed role or a role that didn't die, and this will probably result in your death and your win." },
    { role: [ROLES.headhunter.name], team: ROLES.headhunter.team, credit: 'By Aljninja#5731 on Discord', content: 'Have patience. Your target can be lynched any moment of the game. Just wait until there is being a role call, wait for your objective to claim, counter claim and... BOOM! Lynch. Or you can ask its role and counter claim, equally valid.' },
    { role: [ROLES.sectLeader.name], team: ROLES.sectLeader.team, credit: 'By the WWO Tips & Tricks Discord Server', content: "It is very important to put in the sect the seer and aura seer. If they find you as sect leader while they are still in the village team, it will be a fail for you.If you find and put them in the sect, it would be a lot easier for you to win.If you don't have any info about seer/aura seer, just put in the sect the people that are a danger for you (gunner, jailer etc.). If you don't have info about anyone, just put in the sect a random person.If your sect is big, it will be easier for your team to win." },
    { role: [ROLES.serialKiller.name], team: ROLES.serialKiller.team, credit: 'By the WWO Tips & Tricks Discord Server', content: "You have 2 choices. Either stay silent and try to see who is the seer, aura seer, gunner etc. (important roles), or be an actor and play like a normal villager, so that the village won't suspect you. In daytime, try to find the most important roles, so you can kill them at night. If you don't find anything, just kill a random person.Try to keep the village busy trying to find the werewolves, so that they won't even notice there is a serial killer in the game." },
    { role: [ROLES.zombie.name], team: ROLES.zombie.team, credit: 'By the WWO Tips & Tricks Discord Server', content: 'It is pretty easy to win with the zombie. Just bite a random player on the first night and wait until they become a zombie.Then, you can just bite the most important roles that may affect you(seer, gunner etc.) until the number of zombies is higher than the number of villagers.If you arrive here, your team will likely win.' }
]

const COMMANDS = {
    /* STAFF */
    embed: {
        title: 'Embed Generator',
        description: 'Sends a nice looking embed based on inputs. To use one of the options below type it, then use back ticks to define what to set that option to.\nMake sure you use back ticks. All options are optional.\nExample: ```,embed -t \`This Is The Embed Title\` -d \`A nice description, yes.\` -f \`A nice short footer.\` -c \`YELLOW\` -r \`false\` -w \`true\` -j `true` ```',
        options: {
            title: 'Options',
            t: 'The title which appears at the very top of the embed.', d: 'The main text; descript of the embed.', f: 'The footer which appears to the left of the timestamp at the very bottom of the embed.',
            c: 'The colour of the left edge of the embed.', r: 'Whether or not to delete the original message you sent. Defaults to `true`.', e: 'Whether or not to ping everyone when sending the embed. Defaults to `false`.',
            j: 'Whether or not to send the raw MessageEmbed object along with the embed. Deaults to `false`.', w: 'Whether or not to use a webhook that looks like you to send the message. Defaults to `false`.'
        },
        limits: { title: 'Limits', t: 'Title - 250 Characters', d: 'Description - 2000 Characters', f: 'Footer - 2000 Characters' },
        limitReached: 'One of the options inputs is greater in length than its limit.'
    },

    /* WOLVESVILLE */
    abbreviations: 'Abbreviations',

    role: {
        s: 'Roles',
        roleInformation: role => `**Description**: ${role.description}\n**Aura**: ${role.aura}\n**Abbreviations**: ${role.abbreviations}`
    },

    tip: {
        tip: 'Tip',
        sAndTricks: 'Tips And Tricks',
        reactBelow: `React below to select a category.\n${emote('villager')} : Village\n${emote('werewolf')} : Werewolves\n${emote('headhunter')} : Solo`
    },

    media: {
        title: 'Wolvesville Links',
        links: [
            { title: 'Discord', value: `Chat with other Wolvesville players in the Discord commuinty.\n[**JOIN**](${DOMAIN}/wolvesville/discord)` },
            { title: 'Subreddit', value: `The subreddit for Wolvesville. Exclusive news, leaks and giveaways aswell as a place to share anything Wolvesville related.\n[**FOLLOW**](${DOMAIN}/wolvesville/subreddit)` },
            { title: 'Instagram', value: `The official Instagram page for Wolvesville with updates, giveaways and posts made by the Wolvesville community!\n[**FOLLOW**](${DOMAIN}/wolvesville/instagram)` },
            { title: 'Twitter', value: `Official Twitter account for Wolvesville, giveaways are hosted here.\n[**FOLLOW**](${DOMAIN}/wolvesville/twitter)` },
            { title: 'Facebook', value: `Official Facebook page for Wolvesville, giveaways are hosted here.\n[**LIKE**](${DOMAIN}/wolvesville/facebook)` }
        ]
    }
}

module.exports = class ENGBLocale {
    constructor() {
        Object.assign(
            this, LOCALE, GLOBAL,
            COMMON, { roles: ROLES },
            { tips: TIPS }, COMMANDS,
            ERRORS
        )
    }
}

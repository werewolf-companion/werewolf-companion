exports.developer = {
    id: '394469731085844502',
    level: 5
}

exports.staff = [
    module.exports.developer,
    {
        id: '584311318207660042', // zoie
        level: 4 // admin
    },
    {
        id: '699869076368916511', // wixen
        level: 3 // moderator
    }
]

exports.events = {
    work: {
        gold: 1,
        rose: 1
    },
    daily: {
        gold: 1,
        rose: 1
    }
}

exports.links = {
    companion: {
        site: 'https://wolvesville.apteryx.xyz',
        api: 'https://wolvesville.apteryx.xyz/api',
        bot: 'https://wolvesville.apteryx.xyz/bot/invite',
        server: 'https://wolvesville.apteryx.xyz/discord/invite',
        app: 'https://wolvesville.apteryx.xyz/app/android'
    },

    wolvesville: {
        discord: 'https://discord.gg/wolvesville',
        subreddit: 'https://reddit.com/r/wolvesville',
        instagram: 'https://instagram.com/werewolf.online',
        twitter: 'https://twitter.com/werewolf_app',
        facebook: 'https://facebook.com/werewolf.apps'
    }
}

exports.api = {
    define: word => 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word,
    urban: word => 'http://api.urbandictionary.com/v0/define?term=' + word
}

exports.ids = {
    guilds: {
        support: '454178517802942464'
    },
    channels: {
        events: '711869217254670397'
    },
    roles: {
        events: '707440620683132969'
    }
}

exports.pink = [251, 69, 132];
exports.permissions = 1812458561;

exports.emotes = {
    true: '803931910639321098',
    false: '803931890556862475',

    info: 'ℹ️',
    error: '⚠️',
    warning: '⚠️',
    forbidden: '⛔',
    missing: '🎟️',
    clock: '🕓',
    hammer: '🔨',
    boot: '👢',
    mega: '📣',
    question: '❓',
    level: '🎚️',

    corruptor: '709003788014583858',
    sectLeader: '709003789499236392',
    zombie: '709005269425979392',
    wolfSeer: '709004057909526599',
    seer: '709003790065598574',
    gunner: '709003784759803907',
    arsonist: '709003779806199908',
    bandit: '709004057796280381',
    bomber: '709003784659009617',
    cannibal: '709003789654425680',
    juniorWerewolf: '709003789054771260',
    werewolfBerserk: '709004058677084221',
    shadowWolf: '709004058567901264',
    auraSeer: '709003779118334014',
    spiritSeer: '709003789713014824',
    detective: '709003781534253107',
    doctor: '709003780754112522',
    medium: '709003788001869874',
    serialKiller: '709003789373276161',
    wolfShaman: '709004058693992458',
    guardianWolf: '709004058228293682',
    kittenWolf: '709003788949651527',
    seerApprentice: '709003789776060476',
    jailer: '709003784432386058',
    sheriff: '709004058198802503',
    forger: '709004058001801298',
    witch: '709004058127761460',
    beastHunter: '709003778824601711',
    flowerChild: '709005303471144970',
    avenger: '709003779156082761',
    fool: '709003785120251997',
    headhunter: '709003789088325722',
    alphaWerewolf: '709003779554541608',
    wolfPacifist: '709004058744193034',
    werewolf: '705737242962034698',
    sorcerer: '709003789579059310',
    villager: '709003789125943307',
    bodyguard: '709003779491627058',
    toughGuy: '709003788379226123',
    redLady: '709003790421983283',
    fortuneTeller: '709010989135298582',
    loudmouth: '709004058714832927',
    priest: '709003789943701525',
    marksman: '709003789625196554',
    mayor: '709003785111994389',
    pacifist: '709003790044627014',
    grumpyGrandma: '709003788329156690',
    cupid: '709003781055971378',
    president: '709003789671071794',
    cursed: '709003790237564978',
    santaClaus: '803918389285879808',
    nightmareWerewolf: '803918174772264971',
    illusionist: '803918173279092767',
    accomplice: '803918173237411890',

    gold: '705737242080968815',
    rose: '705743050248290355',
    gem: '705737279238438953',
    token: '804552593878810656',

    talisman: '821884624069853184',

    lootbox: {
        gold: '804548891877441546',
        rose: '804548936517943397',
        gem: '804548981098676255',
        token: '804548959816384553'
    }
}

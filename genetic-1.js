// FUNÇÕES AUXILIARES
const shuffle = arr => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};

const randomInt = (n=20) => Math.floor(Math.random() * n);

const removeDups = (arr) => arr.map(cur => JSON.stringify(cur))
  .filter(function(curr, index, self) {
    return self.indexOf(curr) == index;
  })
  .map(cur => JSON.parse(cur));

// CALCULO DE  DISTANCIA
const distances = {
  "SE": {"SE": 0, "PA": 2029, "MG": 1604, "RR": 5410, "DF": 1642, "MS": 2571, "MT": 2702, "PR": 2566, "SC": 2846, "CE": 1102, "GO": 1843, "PB": 613, "AP": 1967, "AL": 271, "AM": 4662, "RN": 784, "TO": 1644, "RS": 3282, "RO": 4155, "PE": 500, "AC": 4660, "RJ": 1827, "BA": 320, "MA": 1709, "SP": 2158, "PI": 1120, "ES": 1366},
  "PA": {"SE": 2025, "PA": 0, "MG": 2697, "RR": 3809, "DF": 1968, "MS": 2848, "MT": 2356, "PR": 3302, "SC": 3582, "CE": 1531, "GO": 1985, "PB": 2111, "AP": 329, "AL": 2099, "AM": 3061, "RN": 1963, "TO": 1224, "RS": 4018, "RO": 2569, "PE": 2034, "AC": 3077, "RJ": 3124, "BA": 2059, "MA": 576, "SP": 2909, "PI": 909, "ES": 3201},
  "MG": {"SE": 1598, "PA": 2760, "MG": 0, "RR": 4666, "DF": 734, "MS": 1261, "MT": 1570, "PR": 991, "SC": 1271, "CE": 2316, "GO": 887, "PB": 2194, "AP": 2349, "AL": 1852, "AM": 3918, "RN": 2365, "TO": 1540, "RS": 1706, "RO": 3030, "PE": 2081, "AC": 3535, "RJ": 442, "BA": 1405, "MA": 2862, "SP": 583, "PI": 2019, "ES": 514},
  "RR": {"SE": 5407, "PA": 3810, "MG": 4676, "RR": 0, "DF": 4142, "MS": 3801, "MT": 3095, "PR": 4769, "SC": 5073, "CE": 4938, "GO": 3982, "PB": 5457, "AP": 1110, "AL": 5493, "AM": 748, "RN": 5465, "TO": 4139, "RS": 5227, "RO": 1636, "PE": 5428, "AC": 2144, "RJ": 5030, "BA": 5581, "MA": 4343, "SP": 4629, "PI": 4320, "ES": 5180},
  "DF": {"SE": 1642, "PA": 1983, "MG": 739, "RR": 4158, "DF": 0, "MS": 1046, "MT": 1069, "PR": 1400, "SC": 1680, "CE": 1966, "GO": 207, "PB": 2237, "AP": 1791, "AL": 1895, "AM": 3410, "RN": 2409, "TO": 843, "RS": 2115, "RO": 2522, "PE": 2124, "AC": 3027, "RJ": 1166, "BA": 1448, "MA": 2084, "SP": 1007, "PI": 1683, "ES": 1243},
  "MS": {"SE": 2681, "PA": 2850, "MG": 1269, "RR": 3799, "DF": 1046, "MS": 0, "MT": 704, "PR": 979, "SC": 1282, "CE": 3006, "GO": 839, "PB": 3277, "AP": 2309, "AL": 2935, "AM": 3051, "RN": 3448, "TO": 1689, "RS": 1428, "RO": 2164, "PE": 3164, "AC": 2669, "RJ": 1413, "BA": 2487, "MA": 2951, "SP": 987, "PI": 2722, "ES": 1927},
  "MT": {"SE": 2691, "PA": 2357, "MG": 1583, "RR": 3095, "DF": 1057, "MS": 707, "MT": 0, "PR": 1675, "SC": 1979, "CE": 3015, "GO": 898, "PB": 3286, "AP": 1822, "AL": 2944, "AM": 2347, "RN": 3458, "TO": 1509, "RS": 2133, "RO": 1459, "PE": 3173, "AC": 1964, "RJ": 1936, "BA": 2497, "MA": 2771, "SP": 1535, "PI": 2554, "ES": 2087},
  "PR": {"SE": 2573, "PA": 3291, "MG": 1005, "RR": 4766, "DF": 1392, "MS": 975, "MT": 1670, "PR": 0, "SC": 307, "CE": 3324, "GO": 1286, "PB": 3168, "AP": 2836, "AL": 2826, "AM": 4018, "RN": 3340, "TO": 2198, "RS": 742, "RO": 3130, "PE": 3055, "AC": 3635, "RJ": 847, "BA": 2379, "MA": 3392, "SP": 407, "PI": 3040, "ES": 1361},
  "SC": {"SE": 2859, "PA": 3578, "MG": 1291, "RR": 5070, "DF": 1678, "MS": 1280, "MT": 1975, "PR": 305, "SC": 0, "CE": 3610, "GO": 1572, "PB": 3455, "AP": 3082, "AL": 3113, "AM": 4322, "RN": 3626, "TO": 2485, "RS": 462, "RO": 3435, "PE": 3341, "AC": 3940, "RJ": 1134, "BA": 2665, "MA": 3679, "SP": 694, "PI": 3327, "ES": 1647},
  "CE": {"SE": 1101, "PA": 1530, "MG": 2322, "RR": 4941, "DF": 1969, "MS": 3009, "MT": 3028, "PR": 3335, "SC": 3615, "CE": 0, "GO": 2170, "PB": 673, "AP": 1451, "AL": 949, "AM": 4193, "RN": 525, "TO": 1728, "RS": 4051, "RO": 3702, "PE": 778, "AC": 4210, "RJ": 2582, "BA": 1183, "MA": 1176, "SP": 2942, "PI": 624, "ES": 2155},
  "GO": {"SE": 1842, "PA": 1983, "MG": 892, "RR": 3977, "DF": 207, "MS": 840, "MT": 888, "PR": 1296, "SC": 1576, "CE": 2167, "GO": 0, "PB": 2438, "AP": 1868, "AL": 2096, "AM": 3229, "RN": 2609, "TO": 823, "RS": 2012, "RO": 2342, "PE": 2325, "AC": 2847, "RJ": 1305, "BA": 1649, "MA": 2084, "SP": 903, "PI": 1884, "ES": 1396},
  "PB": {"SE": 613, "PA": 2103, "MG": 2198, "RR": 5459, "DF": 2236, "MS": 3165, "MT": 3296, "PR": 3161, "SC": 3441, "CE": 672, "GO": 2438, "PB": 0, "AP": 1964, "AL": 370, "AM": 4711, "RN": 181, "TO": 2041, "RS": 3876, "RO": 4219, "PE": 115, "AC": 4727, "RJ": 2422, "BA": 920, "MA": 1846, "SP": 2752, "PI": 1196, "ES": 1960},
  "AP": {"SE": 1967, "PA": 329, "MG": 2349, "RR": 1110, "DF": 1791, "MS": 2309, "MT": 1822, "PR": 2836, "SC": 3082, "CE": 1451, "GO": 1868, "PB": 1964, "AP": 0, "AL": 2009, "AM": 1054, "RN": 1874, "TO": 1177, "RS": 3341, "RO": 1724, "PE": 2005, "AC": 2159, "RJ": 2687, "BA": 2000, "MA": 803, "SP": 2664, "PI": 1079, "ES": 2545},
  "AL": {"SE": 273, "PA": 2099, "MG": 1858, "RR": 5493, "DF": 1896, "MS": 2824, "MT": 2955, "PR": 2820, "SC": 3100, "CE": 947, "GO": 2097, "PB": 370, "AP": 2009, "AL": 0, "AM": 4745, "RN": 541, "TO": 1898, "RS": 3536, "RO": 4409, "PE": 257, "AC": 4914, "RJ": 2081, "BA": 579, "MA": 1780, "SP": 2412, "PI": 1191, "ES": 1620},
  "AM": {"SE": 4660, "PA": 3063, "MG": 3929, "RR": 748, "DF": 3395, "MS": 3054, "MT": 2348, "PR": 4022, "SC": 4326, "CE": 4191, "GO": 3235, "PB": 4710, "AP": 1054, "AL": 4746, "AM": 0, "RN": 4718, "TO": 3392, "RS": 4480, "RO": 889, "PE": 4681, "AC": 1397, "RJ": 4283, "BA": 4834, "MA": 3596, "SP": 3882, "PI": 3573, "ES": 4433},
  "RN": {"SE": 784, "PA": 1954, "MG": 2370, "RR": 5466, "DF": 2408, "MS": 3336, "MT": 3467, "PR": 3332, "SC": 3612, "CE": 523, "GO": 2609, "PB": 181, "AP": 1874, "AL": 541, "AM": 4718, "RN": 0, "TO": 2048, "RS": 4047, "RO": 4227, "PE": 287, "AC": 4735, "RJ": 2593, "BA": 1091, "MA": 1697, "SP": 2924, "PI": 1047, "ES": 2131},
  "TO": {"SE": 1642, "PA": 1225, "MG": 1546, "RR": 4142, "DF": 843, "MS": 1686, "MT": 1500, "PR": 2207, "SC": 2487, "CE": 1730, "GO": 823, "PB": 2042, "AP": 1177, "AL": 1896, "AM": 3394, "RN": 2049, "TO": 0, "RS": 2922, "RO": 2953, "PE": 2012, "AC": 3458, "RJ": 1973, "BA": 1448, "MA": 1327, "SP": 1813, "PI": 1109, "ES": 2049},
  "RS": {"SE": 3295, "PA": 4014, "MG": 1727, "RR": 5221, "DF": 2114, "MS": 1424, "MT": 2125, "PR": 741, "SC": 462, "CE": 4046, "GO": 2008, "PB": 3891, "AP": 3341, "AL": 3549, "AM": 4473, "RN": 4062, "TO": 2921, "RS": 0, "RO": 3585, "PE": 3777, "AC": 4090, "RJ": 1570, "BA": 3101, "MA": 4115, "SP": 1130, "PI": 3763, "ES": 2083},
  "RO": {"SE": 4139, "PA": 2571, "MG": 3041, "RR": 1637, "DF": 2506, "MS": 2165, "MT": 1459, "PR": 3133, "SC": 3437, "CE": 3699, "GO": 2346, "PB": 4219, "AP": 1724, "AL": 4393, "AM": 889, "RN": 4226, "TO": 2958, "RS": 3592, "RO": 0, "PE": 4189, "AC": 510, "RJ": 3395, "BA": 3946, "MA": 3104, "SP": 2993, "PI": 3081, "ES": 3545},
  "PE": {"SE": 500, "PA": 2033, "MG": 2086, "RR": 5427, "DF": 2124, "MS": 3052, "MT": 3183, "PR": 3048, "SC": 3328, "CE": 778, "GO": 2325, "PB": 117, "AP": 2005, "AL": 257, "AM": 4679, "RN": 288, "TO": 2009, "RS": 3763, "RO": 4188, "PE": 0, "AC": 4695, "RJ": 2309, "BA": 807, "MA": 1714, "SP": 2640, "PI": 1125, "ES": 1847},
  "AC": {"SE": 4645, "PA": 3078, "MG": 3546, "RR": 2143, "DF": 3011, "MS": 2671, "MT": 1965, "PR": 3639, "SC": 3942, "CE": 4206, "GO": 2852, "PB": 4725, "AP": 2159, "AL": 4899, "AM": 1395, "RN": 4733, "TO": 3463, "RS": 4097, "RO": 509, "PE": 4696, "AC": 0, "RJ": 3900, "BA": 4451, "MA": 3611, "SP": 3498, "PI": 3587, "ES": 4050},
  "RJ": {"SE": 1826, "PA": 3192, "MG": 441, "RR": 5022, "DF": 1166, "MS": 1410, "MT": 1926, "PR": 855, "SC": 1135, "CE": 2581, "GO": 1300, "PB": 2421, "AP": 2687, "AL": 2080, "AM": 4274, "RN": 2593, "TO": 1972, "RS": 1571, "RO": 3386, "PE": 2308, "AC": 3891, "RJ": 0, "BA": 1632, "MA": 3294, "SP": 433, "PI": 2451, "ES": 527},
  "BA": {"SE": 323, "PA": 2058, "MG": 1410, "RR": 5596, "DF": 1448, "MS": 2376, "MT": 2507, "PR": 2372, "SC": 2652, "CE": 1180, "GO": 1649, "PB": 919, "AP": 2000, "AL": 577, "AM": 4848, "RN": 1090, "TO": 1450, "RS": 3087, "RO": 3960, "PE": 806, "AC": 4466, "RJ": 1633, "BA": 0, "MA": 1739, "SP": 1964, "PI": 1150, "ES": 1172},
  "MA": {"SE": 1552, "PA": 575, "MG": 2511, "RR": 4288, "DF": 1993, "MS": 2873, "MT": 2687, "PR": 3327, "SC": 3607, "CE": 903, "GO": 2010, "PB": 1572, "AP": 803, "AL": 1626, "AM": 3540, "RN": 1423, "TO": 1249, "RS": 4043, "RO": 3048, "PE": 1677, "AC": 3556, "RJ": 2938, "BA": 1586, "MA": 0, "SP": 2934, "PI": 436, "ES": 2559},
  "SP": {"SE": 2160, "PA": 2906, "MG": 592, "RR": 4622, "DF": 1006, "MS": 982, "MT": 1526, "PR": 416, "SC": 696, "CE": 2939, "GO": 900, "PB": 2756, "AP": 2664, "AL": 2414, "AM": 3874, "RN": 2927, "TO": 1813, "RS": 1132, "RO": 2986, "PE": 2643, "AC": 3491, "RJ": 435, "BA": 1966, "MA": 3007, "SP": 0, "PI": 2655, "ES": 949},
  "PI": {"SE": 1117, "PA": 908, "MG": 2026, "RR": 4320, "DF": 1683, "MS": 2724, "MT": 2545, "PR": 3050, "SC": 3330, "CE": 622, "GO": 1885, "PB": 1203, "AP": 1079, "AL": 1192, "AM": 3572, "RN": 1054, "TO": 1107, "RS": 3766, "RO": 3081, "PE": 1126, "AC": 3589, "RJ": 2454, "BA": 1152, "MA": 588, "SP": 2657, "PI": 0, "ES": 2125},
  "ES": {"SE": 1366, "PA": 3269, "MG": 515, "RR": 5177, "DF": 1242, "MS": 1912, "MT": 2081, "PR": 1357, "SC": 1637, "CE": 2161, "GO": 1395, "PB": 1962, "AP": 2545, "AL": 1620, "AM": 4429, "RN": 2133, "TO": 2048, "RS": 2073, "RO": 3542, "PE": 1849, "AC": 4047, "RJ": 518, "BA": 1173, "MA": 2719, "SP": 935, "PI": 2131, "ES": 0},
}

distances["MG"]["SP"];

// DISTANCIA EM UMA ROTA
function routeDistance(cities, acc = 0) {
  if(cities.length < 2) return 0;

  return distances[cities[0]][cities[1]] + routeDistance(cities.slice(1));
}

routeDistance(["RS","SC","PR","SP","RJ","MG","ES","BA","SE","AL","PB","RN","CE","PI","MA","PA","AP","AM","RR","AC","RO","MT","MS","GO","DF","TO"]);
routeDistance(["DF","PR","RJ","MG","SP","AM","AC","PA"]);


// GERANDO SOLUÇÕES ALEATORIAS
function generateSolutions(n=1){
  return Array(n).fill().map(() =>shuffle(Object.keys(distances)));
}

let solutions = generateSolutions(20);

solutions;
solutions.map((solution) => routeDistance(solution));

// ACHANDO A MELHOR SOLUÇÃO
function getBest(solutions) {
  let bestIndex = 0;
  let bestDistance = routeDistance(solutions[0]);

  solutions.forEach((currentSolution, currentIndex) => {
    const currentDistance = routeDistance(currentSolution);
    if(currentDistance < bestDistance) {
      bestIndex = currentIndex;
      bestDistance = currentDistance;
    };
  });

  return [bestDistance, solutions[bestIndex]];
}

// DISPUTA ENTRE DUAS SOLUÇÕES
function challenge(solutionA, solutionB) {
  if(routeDistance(solutionA) <= routeDistance(solutionB))
    return [solutionA, solutionB];
  return [solutionB, solutionA];
}

const [winner, loser] = challenge(solutions[0], solutions[1]);

// DISPUTA ENTRE TODAS AS SOLUÇÕES
function generationChallenge(solutions) {
  let challengers = shuffle(solutions);
  let winners = [];
  let losers = [];

  while(challengers.length > 0) {
    const [winner, loser] = challenge(challengers.shift(), challengers.shift());
    winners.push(winner);
    losers.push(loser);
  }

  return [winners, losers];
}

const [winners, losers] = generationChallenge(solutions);
solutions;
winners;
losers;

// NOVA GERAÇÃO
let newSolutions = [...winners];

// ACASALAMENTO
function crossover(solutionA, solutionB) {
  return [...new Set(solutionA.slice(0, 8).concat(solutionB.slice(8)).concat(solutionA))];
}

crossoverd = crossover(solutions[0],solutions[1]);

// MUTAÇÃO
function mutate(solution, m=2) {
  let newSolution = [...solution];

  for(let i = 0; i < m; i++) {
    const x = randomInt(27);
    const y = randomInt(27);

    const valueX = newSolution[x];
    const valueY = newSolution[y];

    newSolution[x] = valueY;
    newSolution[y] = valueX;
  }

  return newSolution;
}

mutated = mutate(solutions[0]);

// JUNTANDO TUDO
solutions = generateSolutions(40);

const [nextSolutions, _losers] = generationChallenge(solutions);
while(nextSolutions.length < 30) {
  nextSolutions.push(_losers[randomInt(_losers.length)]);
}
while(nextSolutions.length < 36) {
  nextSolutions.push(crossover(solutions[randomInt(nextSolutions.length)], solutions[randomInt(nextSolutions.length)]));
}
while(nextSolutions.length < 39) {
  nextSolutions.push(mutate(solutions[randomInt(nextSolutions.length)]));
}
while(nextSolutions.length < 40) {
  nextSolutions.push(generateSolutions(1)[0]);
}
solutions = [...nextSolutions];
getBest(solutions);

// AUTOMATIZANDO
let generation = 0;
population = generateSolutions(20);
while(generation < 500000) {
  const [_bestScore, bestSolution] = getBest(population); 

  while(population.length < 32) {
    population.push(crossover(population[randomInt(population.length)], population[randomInt(population.length)]));
  }

  while(population.length < 38) {
    population.push(mutate(population[randomInt(population.length)], 3));
  }
  
  population = removeDups(population);

  while(population.length < 40) {
    population.push(generateSolutions(1)[0]);
  }
  
  const [winners, losers] = generationChallenge(population);

  // LOG
  if(generation < 10 || generation < 100 && generation % 10 == 0 || generation < 1000 && generation % 100 == 0 || generation < 50000 && generation % 1000 == 0 || generation % 10000 == 0) {
    const winnersAvg = winners.map(a =>routeDistance(a)).reduce((a,b)  => a+b)/winners.length;
    const popAvg = population.map(a =>routeDistance(a)).reduce((a,b)  => a+b)/population.length;
    console.log(`GEN ${generation}\tBEST: ${getBest(population)[0]}\tWAVG: ${winnersAvg}\tAVG: ${popAvg}\tBEST_GEN: ${getBest(population)[1]}`);
  }

  population = [...winners];
  generation++;
};

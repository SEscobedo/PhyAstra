module.exports.GetPlanetPosition =  GetPlanetPosition;

const defaultParams = {
    a0 : 1.00000261,
    adot : 0.00000562,
    b : -0.00012452,
    c :  0.06064060,
    s : -0.35635438,
    f : 38.35125000,
    L0 :  34.33479152,
    Ldot : 3034.90371757,
    p : 0,
    W : 0,
    i : 0,
    e : 0
}

function GetPlanetPosition(OrbitalParameters = defaultParams, JulianDate = 0){
    // month is zero-indexed, so 0 is January
    var tMillisFromJ2000 = Date.now() - Date.UTC(2000, 0, 1, 12, 0, 0);
    var tCenturiesFromJ2000 = tMillisFromJ2000 / (1000 * 60 * 60 * 24 * 365.25 * 100);

     a0 = OrbitalParameters.a0;
     adot = OrbitalParameters.adot;
    var a = a0 + adot * tCenturiesFromJ2000;

     L0 = 34.33479152; Ldot = 3034.90371757
     b = OrbitalParameters.b;         
     c = OrbitalParameters.c;
     s = OrbitalParameters.s;
     f = OrbitalParameters.f;

    var L = L0 + Ldot * tCenturiesFromJ2000
    + b * Math.pow(tCenturiesFromJ2000, 2)
    + c * Math.cos(f * tCenturiesFromJ2000)
    + s * Math.sin(f * tCenturiesFromJ2000);

    const p = OrbitalParameters.p;
    const W = OrbitalParameters.W;
    const i = OrbitalParameters.i;
    const e = OrbitalParameters.e;

    var M = L - p // p is the longitude of periapsis
    var w = p - W // W is the longitude of the ascending node

    E = M;
    while(true) {
    var dE = (E - e * Math.sin(E) - M)/(1 - e * Math.cos(E));
    E -= dE;
    if( Math.abs(dE) < 1e-6 ) break;
    }

    var P = a * (Math.cos(E) - e);
    var Q = a * Math.sin(E) * Math.sqrt(1 - Math.pow(e, 2));

    // rotate by argument of periapsis
    var x = Math.cos(w) * P - Math.sin(w) * Q;
    var y = Math.sin(w) * P + Math.cos(w) * Q;
    // rotate by inclination
    var z = Math.sin(i) * y;
        y = Math.cos(i) * y;
    // rotate by longitude of ascending node
    var xtemp = x;
    x = Math.cos(W) * xtemp - Math.sin(W) * y;
    y = Math.sin(W) * xtemp + Math.cos(W) * y;

    //var vP = - a * Math.sin(E) * Ldot / (1 - e * Math.cos(E));
    //var vQ = a * Math.cos(E) * Math.sqrt(1 - e*e) * Ldot / (1 - e * Math.cos(E));

    return [x,z,y];
}


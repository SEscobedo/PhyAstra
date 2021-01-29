# PhyAstra
Physics library for Astra Solaris Project

# Installation
`npm i phyastra`

# Usage

```
import * as PA from 'phyastra';

```

# Available methods

* `GetPlanetPosition(OrbitalParameters, t)`

Gives the position array `[x, y, z]` of the planet in universal space from keplerian orbital elements.

Argument | Description 
------------------|----------------------
OrbitalParameters | JSON object with keplerian elements of the orbit.
t | Julian date and time
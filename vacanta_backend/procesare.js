function procesare (bagaje , durata , pers ) {
    let result = [];
    for(let i = 0 ; i < bagaje.length ; i++){
        let necesar = 0;
        if(bagaje[i].durata_folosire === 365){
            necesar = pers;
        } else {
            necesar = Math.ceil(durata/bagaje[i].durata_folosire) * bagaje[i].nr_buc_necesare * pers;
        }
        let bagaj = {
            "denumire": bagaje[i].denumire,
            "nrBuc" : necesar
        }
        result.push(bagaj)
    }
    return result;
}

module.exports = {procesare};
d = new Date();
p = new Date(d.getTime() + ((3600 * 24) * 1000) * 2);
let b = p.getMonth() + 1 > 11 ? 0 : p.getMonth() + 1;
monthA = "январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь".split(",");
document.getElementById('date').textContent = monthA[d.getMonth()] + " " + "and " + monthA[b];
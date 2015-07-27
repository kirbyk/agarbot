/**
 * Created by kirbykohlmorgen on 7/26/15.
 */
var botOutX;
var botOutY;
var mind;
var botName = "pebbswagyolo";

var oput = {};

var gotoCenter = false;

function dist(a, b){
    return Math.sqrt( (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) );
}

function distSize(a, b) {
    return dist(a, b) - a.size * 1.25 - b.size * 1.25;
}

function botImpl(flowers, enemies, bot) {
    //move toward closest flower
    flowers.sort(function(a, b) {
        return dist(a, bot) - dist(b, bot);
    });

    var nextFlower = flowers[0];

    var dx = 0;
    var dy = 0;

    if (nextFlower) {
        dx = bot.x - nextFlower.x;
        dy = bot.y - nextFlower.y;
    }

    if (bot.x < -5000 || bot.y < -5000 || bot.x > 5000 || bot.y > 5000) {
        gotoCenter = true;
    }

    if (bot.x > -3000 && bot.y > -3000 && bot.x < 3000 && bot.y < 3000) {
        gotoCenter = false;
    }

    if (gotoCenter) {
        dx = bot.x;
        dy = bot.y;
    }

    enemies.sort(function(a, b) {
        return distSize(a, bot) - distSize(b, bot);
    });

    oput.mX = bot.x;
    oput.mY = bot.y;
    oput.mSize = bot.size;

    if (enemies[0]) {
        oput.dist = distSize(enemies[0], bot);
        oput.ex = enemies[0].x;
        oput.ey = enemies[0].y;
        oput.esize = enemies[0].size;
    }

    if (enemies[0] && ((enemies[0].size > bot.size * 2 && distSize(enemies[0], bot) < 1000) || (enemies[0].size > bot.size && distSize(enemies[0], bot) < 600))) {
        var dx = enemies[0].x - bot.x;
        var dy = enemies[0].y - bot.y;
    }

    if (enemies[1] && (enemies[0].size > bot.size && distSize(enemies[0], bot) < 1000) && (enemies[1].size > bot.size && distSize(enemies[1], bot) < 1000)) {
        var dx = (enemies[0].x + enemies[1].x) / 2 - bot.x;
        var dy = (enemies[0].y + enemies[1].y) / 2 - bot.y;
    }

    var theta = Math.atan2(dy, dx);

    botOutX = -Math.cos(theta);
    botOutY = -Math.sin(theta);
}


function bot_parse(state) {
    var flowers = [];
    var enemies = [];
    var bot = {};

    state.forEach(function(obj){
        if (obj.size <= 11) {
            flowers.push({
                x: obj.x,
                y: obj.y
            });
        } else {
            if (obj.name == botName) {
                bot.x = obj.x;
                bot.y = obj.y;
                bot.size = obj.size;
            } else {
                enemies.push({
                    x:obj.x,
                    y:obj.y,
                    size:obj.size,
                    color:obj.color,
                    name:obj.name
                });
            }
        }
    });

    botImpl(flowers, enemies, bot);
}

t.onmessage = function(a) {
    bot_parse(x);
    set_outs();
    Ea();
    Mb(a);
};

function set_outs() {
    ja = mind * botOutX;
    ka = mind * botOutY;
}

J = document.getElementById("canvas");
f = J.getContext("2d");
mind = (J.width < J.height) ? J.width : J.height;

J.onmousedown = function(a) {
    console.log(oput);
};

J.onmousemove = function(a) {

};
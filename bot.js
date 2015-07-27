/**
 * Created by Kirby Kohlmorgen & Gus Kristiansen.
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

// This function should return the distance between the closest points 
// on the outside of the circles a and b. 
function distSize(a, b) {
    var ret = dist(a, b) - a.size * 1.75 - b.size * 1.75;
    ret = (ret < 1) ? 1 : ret;
    return ret;
}

// This is the main function for the bot. The inputs to
// the bot are the three parameters to this function. Store your
// outputs in botOutX and botOutY. Outputs are -1 to +1. 

// The current bot implementation overrides dx and dy when there's a greater priority,
// (ie low priority at the top of function)
function botImpl(flowers, enemies, bot) {
    //move toward closest flower
    flowers.sort(function(a, b) {
        return dist(a, bot) - dist(b, bot);
    });

    var nextFlower = flowers[0];

    var dx = 0;
    var dy = 0;

    if (nextFlower) {
        dx = bot.x - (nextFlower.x-5);
        dy = bot.y - (nextFlower.y-5);
    }


    // This keeps the bot away from the wall
    if (bot.x < -4000 || bot.y < -4000 || bot.x > 4000 || bot.y > 4000) {
        gotoCenter = true;
    }

    if (bot.x > -2000 && bot.y > -2000 && bot.x < 2000 && bot.y < 2000) {
        gotoCenter = false;
    }

    if (gotoCenter) {
        dx = bot.x;
        dy = bot.y;
    }

    enemies.sort(function(a, b) {
        return distSize(a, bot) - distSize(b, bot);
    });

    // oput is a debugging object
    oput.mX = bot.x;
    oput.mY = bot.y;
    oput.mSize = bot.size;

    if (enemies[0]) {
        oput.dist = distSize(enemies[0], bot);
        oput.ex = enemies[0].x;
        oput.ey = enemies[0].y;
        oput.esize = enemies[0].size;
    }

  

    // If closest enemy is too close (if he can split and eat (2x size?) you the distance is farther)
    if (enemies[0] && ((enemies[0].size > bot.size * 2.2 && distSize(enemies[0], bot) < 1000) || (enemies[0].size > bot.size*1.1 && distSize(enemies[0], bot) < 600))) {
        dx = enemies[0].x - bot.x;
        dy = enemies[0].y - bot.y;
        console.log('far');

    }

   // If there are two enemies move away from both
    if (enemies[1] && enemies[0] && (enemies[0].size > bot.size*1.1 && distSize(enemies[0], bot) < 1500) && (enemies[1].size > bot.size*1.1 && distSize(enemies[1], bot) < 1500)) {
        var moveSlope = -(enemies[1].x - enemies[0].x) / (enemies[1].y - enemies[0].y + .00001);
        dx = 1;
        dy = moveSlope;
        var theta1 = Math.atan2(dy, dx);
        var next_pos = {};
        next_pos.x = bot.x-Math.cos(theta1);
        next_pos.y = bot.y-Math.sin(theta1);

        if(dist(bot, enemies[0])>dist(next_pos, enemies[0])){
            dx *= -1;
            dy *= -1;
        }
        console.log('Double!');
    }

    // If closest enemy is too close (if he can split and eat (2x size?) you the distance is farther)
    if (enemies[0] && enemies[0].size > bot.size*1.1 && distSize(enemies[0], bot) < 200) {
        dx = enemies[0].x - bot.x;
        dy = enemies[0].y - bot.y;
        console.log('close');
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
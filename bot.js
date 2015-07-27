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







// output angle with best score chosen

// Resolution (possible moves)
var outputAngles = 32;

// Array of threats
var threats = [];

/**** Threat:

score: function(x, y, dir),
x: int,
y: int,
size: uint,

****/

function enemy_threat(a){
    var threat = {};
    threat.x = a.x;
    threat.y = a.y;
    threat.size = a.size;
    threat.score = function(bot, dir){
        botOutX = -Math.cos(dir);
        botOutY = -Math.sin(dir);
        var next_pos = {};
        next_pos.x = bot.x+botOutX;
        next_pos.y= bot.y+botOutY;
        next_pos.size = bot.size;
        var dist_diff = distSize(bot, this) - distSize(next_pos, this);
        var threat_dist = -dist_diff * (this.size - bot.size) / 10;
        return threat_dist;
    };
    return threat;
}

function flower_threat(a){
    var threat = {};
    threat.x = a.x;
    threat.y = a.y;
    threat.size = a.size;
    threat.score = function(bot, dir){
        botOutX = -Math.cos(dir);
        botOutY = -Math.sin(dir);
        var m_bot = botOutY/botOutX+.000001;
        var perp_m = -1/(m_bot+.000001);
        var int_pos = {};
        int_pos.x =  (a.y -  bot.y - perp_m*a.x + m_bot*bot.x)/(m_bot-perp_m); 
        int_pos.y = m_bot * (x - bot.x) + bot.y;
        int_pos.size = 1;
        //var next_pos = {};
        // next_pos.x = bot.x+botOutX;
        // next_pos.y= bot.y+botOutY;
        // next_pos.size = bot.size;
        var dist_diff = dist(bot, this);
        if(distSize(this, int_pos) < 5){
            return dist_diff;
        }else{
            return 0;
        }

    };
    return threat;
}

function wall_threat(){
    var threat = {};
    threat.x = 0;
    threat.y = 0;
    threat.size = 0;
    threat.score = function(bot, dir){
        botOutX = -Math.cos(dir);
        botOutY = -Math.sin(dir);
        var next_pos = {};
        next_pos.x = bot.x+botOutX;
        next_pos.y= bot.y+botOutY;
        // next_pos.size = bot.size;
        var dist_diff = dist(bot, 0) - dist(next_pos, 0);
        var threat_dist = dist_diff / 10;
        return threat_dist;
    };
    return threat;
}

function eval_dir(bot, dir){
    var score = 0;
    for(var j = 0; j < threats.length; j++){
        score += threats[j].score(bot, dir);
    }
    console.log('score: ' + score);
    return score;
}

function eval_all(bot){
    var high_dir = 0.0;
    var high_score = eval_dir(bot, 0.0);
    for(var j = Math.PI*2/outputAngles; j < Math.PI*2; j += Math.PI*2/outputAngles){
        var score = eval_dir(bot, j);
        if(score > high_score){
            high_dir = j;
            high_score = score;
        }
    }
    return high_dir;
}










// This is the main function for the bot. The inputs to
// the bot are the three parameters to this function. Store your
// outputs in botOutX and botOutY. Outputs are -1 to +1. 

// The current bot implementation overrides dx and dy when there's a greater priority,
// (ie low priority at the top of function)
function botImpl(flowers, enemies, bot) {
    for(var j = 0; j < flowers.length; j++){
        threats.push(flower_threat(flowers[j]));
    }
    for(var j = 0; j < enemies.length; j++){
      //  threats.push(enemy_threat(enemies[j]));
    }
    //threats.push(wall_threat());
    var dir = eval_all(bot);
    botOutX = -Math.cos(dir);
    botOutY = -Math.sin(dir);
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
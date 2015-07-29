/**
 * Created by Kirby Kohlmorgen & Gus Kristiansen.
 */
var botOutX;
var botOutY;
var screen_width;
var screen_height;
var botName = "pebbswagyolo";

var oput = {};


// Array of threats
var threats = [];


/**** THREAT PARAMS ******/
var outputAngles = 64;
var flower_distance = 300;
var max_flower_score = 100;
var enemy_distance = 500;
var max_enemy_score = 1000;
var max_wall_score = 500;

// var debug_logs = false;

var speed = 3;

var busy = false;
    


var j1 = 0;
var j2 = 0;

function dist(a, b){
    return Math.sqrt( (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) );
}

// This function should return the distance between the closest points 
// on the outside of the circles a and b. 
function distSize(a, b) {
    //return dist(a,b);
    var ret = dist(a, b) - a.size * 1.25 - b.size * 1.25;
    ret = (ret < 1) ? 1 : ret;
    return ret;
}







// output angle with best score chosen

// Resolution (possible moves)


/**** Threat:

score: function(x, y, dir),
x: int,
y: int,
size: uint,

****/


// 11*pi/16 approx = pi/2
// 

function enemy_threat(a){
    var threat = {};
    threat.x = a.x;
    threat.y = a.y;
    threat.size = a.size;
    threat.score = function(bot, dir){
        var b_x = Math.cos(dir)*speed;
        var b_y = Math.sin(dir)*speed;
        var next_pos = {};
        next_pos.x = bot.x+b_x;
        next_pos.y= bot.y+b_y;
        next_pos.size = bot.size;
        var current_dist = distSize(bot, this);
        var dist_diff = current_dist - distSize(next_pos, this);
        // dist_diff = dist_diff < 0 ? -1 : 1;
        var rev_dist = enemy_distance - current_dist;
        rev_dist = rev_dist < 1 ? 1 : rev_dist;
        var size_mult;
        var size_diff = (this.size - bot.size);
        var size_ratio = (size_diff>0) ? this.size/bot.size : -bot.size/this.size;
        if(size_ratio < 1.1 && size_ratio > -1.1){
            size_mult = 0;
        }else if(size_ratio < 3 && size_ratio > -3){
            size_mult = 1;
        }else{
            size_mult = 2;
        }
        size_diff = size_diff < 0 ? -1 : 1;
        var threat_dist = -dist_diff * size_diff  * size_mult * max_enemy_score * rev_dist / enemy_distance;
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
        var bx = Math.cos(dir)*speed;
        var by = Math.sin(dir)*speed;
        var m_bot = by/bx+.000001;
        var perp_m = -1/(m_bot+.000001);
        var int_pos = {};
        int_pos.x =  (a.y -  bot.y - perp_m*a.x + m_bot*bot.x)/(m_bot-perp_m); 
        int_pos.y = m_bot * (int_pos.x - bot.x) + bot.y;
        int_pos.size = 10;
        //var next_pos = {};
        // next_pos.x = bot.x+botOutX;
        // next_pos.y= bot.y+botOutY;
        // next_pos.size = bot.size;
        var dist_diff = dist(bot, this);
        if(distSize(this, int_pos) < 20){
            var score = max_flower_score*(flower_distance - dist_diff)/flower_distance;
            score = (score > 0) ? score : 0;
            return score;
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
        //console.log('this: ' + JSON.stringify(this));
        var bx = Math.cos(dir)*speed;
        var by = Math.sin(dir)*speed;
        var next_pos = {};
        next_pos.x = bot.x+bx;
        next_pos.y = bot.y+by;
        // next_pos.size = bot.size;
        var current_dist = dist(bot, this);
        if(current_dist < 2000){
            return 0;
        }
        var dist_diff = current_dist - dist(next_pos, this);
        //dist_diff = dist_diff < 0 ? -1 : 1;
        var threat_dist = dist_diff * current_dist * max_wall_score / 10000;
        return threat_dist;
    };
    return threat;
}

function eval_dir(bot, dir){
    var score = 0;
    for(var j = 0; j < threats.length; j++){
        if(dir===0.0){
            if(j === j1){
                // console.log('flowers: ' + score);
            }else if(j === j1+j2-1){
                // console.log('enemies: ' + score);
            }
        }
        score += threats[j].score(bot, dir);
    }
    if(dir===0.0){
        // console.log('after: ' + score);
    }
    //console.log('score: ' + score);
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
    // console.log('highscore: ' + high_score);
    return high_dir;
}


// This is the main function for the bot. The inputs to
// the bot are the three parameters to this function. Store your
// outputs in botOutX and botOutY. Outputs are -1 to +1. 

function botImpl(flowers, enemies, bot) {
    // console.log('dist_to_origin: ' + dist(bot, {x:0,y:0}));
    j1 = flowers.length;
    j2 = enemies.length;
    if(bot){
        threats.length = 0; //clear the list
        flowers.sort(function(a, b){return dist(a, bot)-dist(b, bot);});
        for(var j = 0; j < flowers.length; j++){ // LIMITED
          threats.push(flower_threat(flowers[j]));
        }
        enemies.sort(function(a, b){return dist(a, bot)-dist(b, bot);});
        //console.log('dist: ' + dist(bot, enemies[0]) + ' bot.size: ' + bot.size + ' enemies[0].size: '+ enemies[0].size);
        for(var j = 0; j < enemies.length; j++){
         threats.push(enemy_threat(enemies[j])); // LIMITED FOR TESTING
        }
        threats.push(wall_threat());
        var dir = eval_all(bot);
        // var dir = Math.PI/2;
        var tbotOutX = Math.cos(dir);
        var tbotOutY = Math.sin(dir);
        botOutX = tbotOutX;
        botOutY = tbotOutY;

    }else{
        console.log('skipped');
    }
    
}


function bot_parse(state) {

    var flowers = [];
    var enemies = [];
    var bot = {};

    for(var j = 0; j < state.length; j++){
        var obj = state[j];
        if (obj.size <= 11) {
            flowers.push({
                x: obj.x,
                y: obj.y,
                size: 10
            });
        } else {
            if (obj.name == botName) {
                bot.x = obj.x;
                bot.y = obj.y;
                bot.size = obj.size;
            } else {
                enemies.push({
                    x:obj.x,
                    y:obj.y+10,
                    size:obj.size,
                    color:obj.color,
                    name:obj.name
                });
            }
        }
    }

    botImpl(flowers, enemies, bot);

    busy = false;
    
}

t.onmessage = function(a) {
   if(!busy){
        busy = true;
        bot_parse(x);
        set_outs();
    }else{
        console.log('busymofo');
    }
    Ea();
    Mb(a);
};

 
function set_outs() {
    ja = screen_width * (botOutX+1) / 2;
    ka = screen_height * (botOutY+1) / 2;
}

J = document.getElementById("canvas");
f = J.getContext("2d");
screen_height = J.height;
screen_width = J.width;


J.onmousedown = function(a) {
    console.log(oput);
};

J.onmousemove = function(a) {

};